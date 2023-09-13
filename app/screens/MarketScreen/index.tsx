import { ActivatedButton, ElementView } from '../../components/Themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import MarketCoin from '../../components/molecules/MarketCoin';

import { userInfo } from '../../../assets/dummyData/userInfo';
import { market } from '../../../assets/dummyData/market';

export default function MarketListScreen() {

  const user = userInfo[0];

  const [allCoins, setAllCoins] = useState(market);
  const [watchlist, setWatchlist] = useState(user.watchlist);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const fetchCoins = async () => {
    setIsLoading(true);
    try {
      // const response = await API.graphql(graphqlOperation(listCoins))
      // setAllCoins(response.data.listCoins.items)
      setAllCoins(market)//dummydata
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchWatchlist = async () => {
    setIsLoading(true);
    try {
      // const response = await API.graphql(graphqlOperation(listCoins))
      // setAllCoins(response.data.listCoins.items)
      setWatchlist(user.watchlist);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const sortByTrendingDay = () => {
    return [...allCoins].sort((a, b) => (a.valueChange24H < b.valueChange24H ? 1 : -1));
  }

  const sortByTrendingHour = () => {
    return [...allCoins].sort((a, b) => (a.valueChange1H < b.valueChange1H ? 1 : -1));
  }

  const tabs = [
    { id: 0, name: '% Hour', data: sortByTrendingHour() },
    { id: 1, name: '% Day', data: sortByTrendingDay() },
    { id: 2, name: 'Watchlist', data: watchlist },
  ]

  const onButtonPress = (tabId: number) => {
    console.log('pressed:', tabId)
    setActiveTab(tabId);
    console.log('active tab changed to:', activeTab)
  }

  return (
    <>
      <ElementView style={styles.root}>
        <ElementView style={styles.header}>
          <ElementView inverted style={styles.buttonsContainer}>
            {tabs.length > 0 && tabs.map((tab) => (
              <ActivatedButton
                activeState={tab.id === activeTab}
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
      <FlatList 
        style={{width: '100%'}}
        data={tabs[activeTab].data}
        onRefresh={tabs[activeTab].name === 'watchlist' ? fetchWatchlist : fetchCoins}
        refreshing={isLoading}
        renderItem={({item}) => <MarketCoin marketCoin={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListEmptyComponent={<Text style={styles.noDataMsg}>pull down to refresh</Text>}
      />
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '90%',
    maxWidth: 400,
  },
  header: {
    width: '100%',
    marginTop: 30,
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