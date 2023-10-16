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

  const fetchTrades = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof tradesByUserID>>({
        ...graphqlOperation(
          tradesByUserID,
          { userID: user?.id, limit: 25 }
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
        initialNumToRender={7}
        removeClippedSubviews
        style={{ width: '100%' }}
        data={tradesList.map(item => ({...item})).sort((a, b) => (a.date < b.date) ? 1 : -1)}
        onRefresh={fetchTrades}
        refreshing={isLoading}
        renderItem={_renderitem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.noDataMsg}>This user has no recent trades</Text>}
        ListFooterComponent={<Text style={{ textAlign: 'center', color: '#929292' }}>pull to refresh</Text>}
      />
    </ElementView>
  );
}

const _renderitem = ({item}: {item: Trade}) => <TradeItem props={item} key={item.id} />;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    flex: 1,
    maxWidth: 350,
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