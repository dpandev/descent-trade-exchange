import { StyleSheet, FlatList } from 'react-native';
import { ElementView, Text } from '../Themed';
import TradeItem from '../molecules/TradeItem';
import React, { useEffect, useState } from 'react';
import { Trade, TradesByUserIDQuery } from '../../../src/API';
import { API, graphqlOperation } from 'aws-amplify';
import { tradesByUserID } from '../../../src/customGraphQL/customQueries';
import { AmplifyGraphQLResult } from '../../types';
import { useAuthContext } from '../../utils/AuthContext';

export default function TradesDisplay() {

  const [tradesList, setTradesList] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();
  const aWeekAgo: number = Date.now() - (7 * 24 * 60 * 60 * 1000);

  const fetchTrades = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof tradesByUserID>>({
        ...graphqlOperation(
          tradesByUserID,
          { userID: user?.id, limit: 25, filter: {date: {lt: aWeekAgo}} }
        ),
      }) as { data: TradesByUserIDQuery };
      if (response.data.tradesByUserID?.items) {
        const fetchedTrades: Trade[] = response.data.tradesByUserID.items.filter(
          (item): item is Trade => item != null
        );
        setTradesList(fetchedTrades);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <ElementView style={styles.root}>
      <Text style={styles.heading}>Last 7 Days</Text>
      <FlatList
        style={{width: '100%', height: '100%'}}
        data={tradesList.map(item => ({...item})).sort((a, b) => (a.date! < b.date!) ? 1 : -1)}
        onRefresh={fetchTrades}
        refreshing={isLoading}
        renderItem={({item}) => <TradeItem props={item} key={item.id} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListEmptyComponent={<Text style={styles.noDataMsg}>This user has no recent trades</Text>}
      />
    </ElementView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10
  },
  noDataMsg: {
    textAlign: 'center',
    color: '#FE4A76',
  },
});