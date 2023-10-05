import { StyleSheet, FlatList } from 'react-native';
import { ElementView } from '../../components/Themed';
import PortfolioCoinComponent, { PortfolioCoinProps } from '../../components/molecules/PortfolioCoin';
import PageHeader from '../../components/molecules/PageHeader';
import { PreciseMoney } from '../../components/FormattedTextElements';
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Coin, ListCoinsQuery, PortfolioCoin, PortfolioCoinsByUserIDQuery } from '../../../src/API';
import { useAuthContext } from '../../utils/AuthContext';
import { listCoins, portfolioCoinsByUserID } from '../../../src/graphql/queries';
import { AmplifyGraphQLResult } from '../../types';

export default function TabTwoScreen() {

  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioCoinProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const fetchAssets = async (): Promise<void> => {
    if (!user) return;
    setIsLoading(true);
    try {
      const coinsResponse = await API.graphql<AmplifyGraphQLResult<typeof listCoins>>(
        graphqlOperation(
          listCoins,
        ),
      ) as { data: ListCoinsQuery };

      if (coinsResponse.data.listCoins) {
        let allCoinsResponse: Coin[] = coinsResponse.data.listCoins.items.filter(
          (item): item is Coin => item != null
        );

        const response = await API.graphql<AmplifyGraphQLResult<typeof portfolioCoinsByUserID>>(
          graphqlOperation(
            portfolioCoinsByUserID,
            { userID: user.id },
          ),
        ) as { data: PortfolioCoinsByUserIDQuery };
  
        if (response.data.portfolioCoinsByUserID) {
          let portfolioCoinsResponse: PortfolioCoin[] = response.data.portfolioCoinsByUserID.items.filter(
            (item): item is PortfolioCoin => item != null
          );
          let pCoins: PortfolioCoinProps[] = [];
  
          for (let i = 0; i < portfolioCoinsResponse.length; i++) {
            let checkedCoin: Coin | undefined = allCoinsResponse.find(x => x.id === portfolioCoinsResponse[i].coinId);
            if (checkedCoin) {
              let obj: PortfolioCoinProps = {
                portfolioCoin: {
                  coin: checkedCoin,
                  amount: portfolioCoinsResponse[i].amount,
                }
              }
              pCoins.push(obj);
            }
          }
          setPortfolioCoins(pCoins);
        }
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
