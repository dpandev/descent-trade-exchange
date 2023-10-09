import { ActivatedButton, ElementView } from '../../components/Themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser, listCoins } from '../../../src/graphql/queries';
import { Coin, GetUserQuery, ListCoinsQuery } from '../../../src/API';
import { useAuthContext } from '../../utils/AuthContext';
import CoinListing from '../../components/organisms/CoinListing';
import { AmplifyGraphQLResult } from '../../types';

const enum ComponentTabItem {
  byHour = '% Hour',
  byDay = '% Day',
  watchlist = 'Watchlist',
}

type TabEnum = `${ComponentTabItem}`;

export default function MarketListScreen() {
  const { user } = useAuthContext();
  const [componentTab, setComponentTab] = useState<TabEnum>(ComponentTabItem.byHour);
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [watchlist, setWatchlist] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const coinsResponse = await API.graphql<AmplifyGraphQLResult<typeof listCoins>>({
        ...graphqlOperation(
          listCoins,
        ),
      }) as { data: ListCoinsQuery };
      let coinList: Coin[] = [];
      if (coinsResponse.data.listCoins.items) {
        (Object.values(coinsResponse.data.listCoins.items) as Coin[]).forEach((value) => coinList.push(value));
        setAllCoins(coinList);
      }

      const watchlistResponse = await API.graphql<AmplifyGraphQLResult<typeof getUser>>({
        ...graphqlOperation(
          getUser,
          { id: user.id }
        ),
      }) as { data: GetUserQuery };
      if (watchlistResponse.data.getUser.watchlist) {
        const watchlist = [...coinList].filter(x => watchlistResponse.data.getUser.watchlist.includes(x.id));
        setWatchlist(watchlist);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getWatchlist = (): Coin[] => {
    return [...watchlist].sort();
  }

  const sortByTrendingDay = (): Coin[] => {
    return [...allCoins].sort((a, b) => (a!.valueChange24H < b!.valueChange24H ? 1 : -1));
  }

  const sortByTrendingHour = (): Coin[] => {
    return [...allCoins].sort((a, b) => (a!.valueChange1H < b!.valueChange1H ? 1 : -1));
  }

  const onButtonPress = (tabName: TabEnum): void => {
    setComponentTab(tabName);
  }

  return (
      <ElementView style={styles.root}>
        <ElementView style={styles.header}>
          <ElementView inverted style={styles.buttonsContainer}>
            <ActivatedButton
              activeState={componentTab === ComponentTabItem.byHour}
              buttonStyles={styles.button}
              textStyles={styles.buttonText}
              onPress={() => onButtonPress(ComponentTabItem.byHour)}
            >
              {ComponentTabItem.byHour}
            </ActivatedButton>
            <ActivatedButton
              activeState={componentTab === ComponentTabItem.byDay}
              buttonStyles={styles.button}
              textStyles={styles.buttonText}
              onPress={() => onButtonPress(ComponentTabItem.byDay)}
            >
              {ComponentTabItem.byDay}
            </ActivatedButton>
            <ActivatedButton
              activeState={componentTab === ComponentTabItem.watchlist}
              buttonStyles={styles.button}
              textStyles={styles.buttonText}
              onPress={() => onButtonPress(ComponentTabItem.watchlist)}
            >
              {ComponentTabItem.watchlist}
            </ActivatedButton>
          </ElementView>
        </ElementView>
        <ElementView style={styles.tabComponent}>
          {componentTab === ComponentTabItem.byHour &&
            <CoinListing props={{ data: sortByTrendingHour(), refreshFunction: fetchData, isLoading: isLoading }} />
          }
          {componentTab === ComponentTabItem.byDay &&
            <CoinListing props={{ data: sortByTrendingDay(), refreshFunction: fetchData, isLoading: isLoading }} />
          }
          {componentTab === ComponentTabItem.watchlist &&
            <CoinListing props={{ data: getWatchlist(), refreshFunction: fetchData, isLoading: isLoading }} />
          }
        </ElementView>
      </ElementView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
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
  tabComponent: {
    height: '70%',
  },
});