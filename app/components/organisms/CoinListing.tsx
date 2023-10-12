import { FlatList } from 'react-native';
import React from 'react';
import { Text, ElementView } from '../Themed';
import MarketCoin from '../molecules/MarketCoin';
import { Coin } from '../../../src/API';

type ListProps = {
  data: Coin[];
  refreshFunction: () => void;
  isLoading: boolean;
}

const CoinListing = ({props}: {props: ListProps}) => {
  return (
    <ElementView>
      <FlatList 
        style={{width: '100%'}}
        data={props.data}
        onRefresh={props.refreshFunction}
        refreshing={props.isLoading}
        renderItem={({item}) => <MarketCoin props={item} key={item.id} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListEmptyComponent={<Text>pull down to refresh</Text>}
      />
    </ElementView>
  );
}

export default CoinListing;