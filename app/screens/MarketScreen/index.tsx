import { ActivatedButton, ElementView } from '../../components/Themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { AmplifyGraphQLResult } from '../../types';
import { getUser, listCoins } from '../../../src/graphql/queries';
import { Coin, GetUserQuery, ListCoinsQuery } from '../../../src/API';
import { useAuthContext } from '../../utils/AuthContext';
import CoinListing from '../../components/organisms/CoinListing';

const MarketListScreen = () => {
  const user = useAuthContext();
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [watchlist, setWatchlist] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCoins = async () => {
    setIsLoading(true);
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof listCoins>>({
        ...graphqlOperation(
          listCoins,
        ),
      }) as { data: ListCoinsQuery };
      if (response.data.listCoins) {
        setAllCoins([...response.data.listCoins.items]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchWatchlist = async () => {
    setIsLoading(true);
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getUser>>({
        ...graphqlOperation(
          getUser,
          { id: user.id }
        ),
      }) as { data: GetUserQuery };
      if (response.data.getUser?.watchlist) {
        if (allCoins) {
          let watchlist = [...allCoins].filter(x => response.data.getUser?.watchlist?.includes(x!.id));
          setWatchlist(watchlist);
          console.log('w-now', watchlist)
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCoins();
    fetchWatchlist();
  }, []);

  const getWatchlist = () => {
    if (watchlist) {
      return [...watchlist].sort();
    } else {
      return [];
    }
  }

  const sortByTrendingDay = () => {
    if (allCoins) {
      return [...allCoins].sort((a, b) => (a!.valueChange24H < b!.valueChange24H ? 1 : -1));
    } else {
      return [];
    }
  }

  const sortByTrendingHour = () => {
    if (allCoins) {
      return [...allCoins].sort((a, b) => (a!.valueChange1H < b!.valueChange1H ? 1 : -1));
    } else {
      return [];
    }
  }

  const tabs = [
    { id: 0, name: '% Hour', component: <CoinListing props={{ data: sortByTrendingHour(), refreshFunction: fetchCoins, isLoading: isLoading }} /> },
    { id: 1, name: '% Day', component: <CoinListing props={{ data: sortByTrendingDay(), refreshFunction: fetchCoins, isLoading: isLoading }} /> },
    { id: 2, name: 'Watchlist', component: <CoinListing props={{ data: watchlist, refreshFunction: fetchWatchlist, isLoading: isLoading }} /> },
  ]

  const [active, setActive] = useState<number>(0);

  const onButtonPress = (tabId: number) => {
    setActive(tabs[tabId].id);
  }

  return (
    <>
      <ElementView style={styles.root}>
        <ElementView style={styles.header}>
          <ElementView inverted style={styles.buttonsContainer}>
            {tabs.length > 0 && tabs.map((tab) => (
              <ActivatedButton
                activeState={tab.id === active}
                key={tab.id}
                buttonStyles={styles.button}
                textStyles={styles.buttonText}
                onPress={() => onButtonPress(tab.id)}
              >
                {tab.name}
              </ActivatedButton>
            ))}
          </ElementView>
        </ElementView>
      </ElementView>
      {tabs[active].component}
    </>
  );
}

export default MarketListScreen;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  header: {
    width: '90%',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    borderRadius: 12,
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 'auto',
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 12,
    borderWidth: 0,
    width: '33.33%',
  },
  buttonText: {
    textAlign: 'center',
  },
  noDataMsg: {
    textAlign: 'center',
    color: '#FE4A76',
  },
});