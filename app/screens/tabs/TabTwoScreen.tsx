import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { ElementView } from '../../components/Themed';
import PortfolioCoinComponent, { PortfolioCoinProps } from '../../components/molecules/PortfolioCoin';
import PageHeader from '../../components/molecules/PageHeader';
import { PreciseMoney } from '../../components/FormattedTextElements';
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Coin, GetUserQuery, ListCoinsQuery, PortfolioCoin, PortfolioCoinsByUserIDQuery, User } from '../../../src/API';
import { useAuthContext } from '../../utils/AuthContext';
import { getUser, listCoins, portfolioCoinsByUserID } from '../../../src/graphql/queries';
import { AmplifyGraphQLResult } from '../../types';

export default function TabTwoScreen() {

  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioCoinProps[]>([]);
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const fetchProfile = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getUser>>(
        graphqlOperation(
          getUser,
          { id: user.id }
        ),
      ) as { data: GetUserQuery };

      if (response.data.getUser) {
        const fetchedUser: User = response.data.getUser;
        setUserData(fetchedUser);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchAssets = async (): Promise<void> => {
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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
    fetchAssets();
  }, []);

  if (!userData) {
    return (
      <ElementView style={styles.root}>
        <PageHeader title={"Assets"} />
        <ActivityIndicator />
      </ElementView>
    );
  }

  return (
    <ElementView style={styles.root}>
      <PageHeader title={"Assets"} />
      <ElementView style={styles.balanceContainer}>
        <PreciseMoney value={userData.networth || 0} style={styles.balance} />
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
