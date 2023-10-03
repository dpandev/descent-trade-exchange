import { StyleSheet, FlatList } from 'react-native';
import { ElementView } from '../../components/Themed';
import PortfolioCoinComponent, { PortfolioCoinProps } from '../../components/molecules/PortfolioCoin';
import PageHeader from '../../components/molecules/PageHeader';
import { PreciseMoney } from '../../components/FormattedTextElements';
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { Coin, PortfolioCoin } from '../../../src/API';
import { useAuthContext } from '../../utils/AuthContext';
import { listCoins, portfolioCoinsByUserID } from '../../../src/graphql/queries';

export default function TabTwoScreen() {

  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioCoinProps[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser } = useAuthContext();

  const fetchAssets = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const coinsResponse = await API.graphql(
        graphqlOperation(
          listCoins,
        ),
      );
      if (coinsResponse.data.listCoins) {
        setCoins(coinsResponse.data.listCoins.items);
      }

      const response = await API.graphql(
        graphqlOperation(
          portfolioCoinsByUserID,
          { userID: user.id },
        ),
      );

      if (response.data.portfolioCoinsByUserID) {
        let portfolioCoinsResponse: PortfolioCoin[] = response.data.portfolioCoinsByUserID.items;
        let allCoinsResponse: Coin[] = [...coinsResponse.data.listCoins.items];
        let pCoins: PortfolioCoinProps[] = [];
        for (let i = 0; i < portfolioCoinsResponse.length; i++) {
          let obj: PortfolioCoinProps = {
            portfolioCoin: {
            coin: allCoinsResponse.find(x => x.id === portfolioCoinsResponse[i].coinId)!,
            amount: portfolioCoinsResponse[i].amount,
            }
          }
          pCoins.push(obj);
        }
        setPortfolioCoins(pCoins);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <ElementView style={styles.root}>
      <PageHeader title={"Assets"} />
      <ElementView style={styles.balanceContainer}>
        <PreciseMoney value={user?.networth || 0} style={styles.balance} />
      </ElementView>
      <FlatList
        style={{width: '100%'}}
        data={portfolioCoins}
        // keyExtractor={(item, index) => item.id}
        onRefresh={fetchAssets}
        refreshing={isLoading}
        renderItem={({item}) => <PortfolioCoinComponent portfolioCoin={item.portfolioCoin} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
      />
    </ElementView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  balanceContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {},
  balance: {
    fontSize: 28,
    fontWeight: 'bold',
    width: '85%',
    textAlign: 'center',
    color: '#6338F1',
  },
});
