import { StyleSheet, FlatList, ActivityIndicator, Pressable, Platform } from 'react-native';
import { ElementView, Text } from '../../components/Themed';
import PortfolioCoinComponent, { PortfolioCoinProps } from '../../components/molecules/PortfolioCoin';
import PageHeader from '../../components/molecules/PageHeader';
import { PreciseMoney } from '../../components/FormattedTextElements';
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Coin, GetUserQuery, ListCoinsQuery, PortfolioCoin, PortfolioCoinsByUserIDQuery, User } from '../../../src/API';
import { useAuthContext } from '../../utils/AuthContext';
import { getUser, listCoins, portfolioCoinsByUserID } from '../../../src/graphql/queries';
import { AmplifyGraphQLResult } from '../../types';

export default function TabTwoScreen(): React.JSX.Element {

  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioCoinProps[]>([]);
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const fetchProfile = async (): Promise<void> => {
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getUser>>(
        graphqlOperation(
          getUser,
          { id: user?.id }
        ),
      ) as { data: GetUserQuery };
      
      if (response.data.getUser) {
        const fetchedUser: User = response.data.getUser;
        setUserData(fetchedUser);
      }
    } catch(error) {
      console.log(error);
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

        const portfolioResponse = await API.graphql<AmplifyGraphQLResult<typeof portfolioCoinsByUserID>>(
          graphqlOperation(
            portfolioCoinsByUserID,
            { userID: user?.id },
          ),
        ) as { data: PortfolioCoinsByUserIDQuery };
  
        if (portfolioResponse.data.portfolioCoinsByUserID) {
          let portfolioCoinsResponse: PortfolioCoin[] = portfolioResponse.data.portfolioCoinsByUserID.items.filter(
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
              if (obj.portfolioCoin.amount > 0) {
                pCoins.push(obj);
              }
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
        <ActivityIndicator size={'large'} color={'white'} />
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
        initialNumToRender={7}
        removeClippedSubviews
        style={{width: '100%'}}
        data={portfolioCoins.sort((a, b) => (
          (a.portfolioCoin.coin.currentPrice * a.portfolioCoin.amount) 
          < (b.portfolioCoin.coin.currentPrice * b.portfolioCoin.amount) 
          ? 1 : -1
        ))}
        onRefresh={fetchAssets}
        refreshing={isLoading}
        renderItem={_renderitem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#FE4A76' }}>no data to display</Text>}
        ListFooterComponent={<Text style={{ textAlign: 'center', color: '#929292' }}>pull to refresh</Text>}
      />
    </ElementView>
  );
}

const _renderitem = ({
  item}: {item: PortfolioCoinProps}): React.JSX.Element => (
  <PortfolioCoinComponent 
    portfolioCoin={item.portfolioCoin} 
    key={item.portfolioCoin.coin.id} 
  />
  );

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
    textAlign: 'center',
    color: '#772ceb',
  },
});
