import { StyleSheet, FlatList } from 'react-native';
import { ElementView, Text } from '../Themed';
import TradeItem from '../molecules/TradeItem';
import React from 'react';
import { Trade } from '../../../src/API';

export default function TradesDisplay({
  listOfTrades
}: {
  listOfTrades: Trade[], 
}) {

  return (
    <ElementView style={styles.root}>
      <Text style={styles.heading}>Recent Trades</Text>
      <FlatList
        style={{width: '100%'}}
        data={listOfTrades?.map(item => ({...item})).sort((a, b) => (a.date! < b.date!) ? 1 : -1)}
        renderItem={({item}) => <TradeItem props={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListEmptyComponent={<Text style={styles.noDataMsg}>This user has no recent trades</Text>}
      />
    </ElementView>
  );
}

const styles = StyleSheet.create({
  root: {
    //
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