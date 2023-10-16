import { FlatList } from 'react-native';
import React from 'react';
import { Text } from '../Themed';
import MarketCoin from '../molecules/MarketCoin';
import { Coin } from '../../../src/API';
import { TabEnum } from '../../screens/MarketScreen';

type ListProps = {
  data: Coin[];
  refreshFunction: () => void;
  isLoading: boolean;
  sortType: TabEnum;
}

const CoinListing = ({props}: {props: ListProps}) => {
  return (
    <FlatList 
      initialNumToRender={7}
      removeClippedSubviews
      style={{ flex: 1 }}
      data={props.data}
      onRefresh={props.refreshFunction}
      refreshing={props.isLoading}
      renderItem={props.sortType === '% Day' ? _renderitem_byday : _renderitem_byhour}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#FE4A76' }}>no coins to display</Text>}
      ListFooterComponent={
        <Text style={{ textAlign: 'center', color: '#929292' }}>pull to refresh</Text>
      }
    />
  );
}

const _renderitem_byhour = ({item}: {item: Coin}) => <MarketCoin props={item} sorting={'% Hour'} key={item.id} />;
const _renderitem_byday = ({item}: {item: Coin}) => <MarketCoin props={item} sorting={'% Day'} key={item.id} />;

export default CoinListing;