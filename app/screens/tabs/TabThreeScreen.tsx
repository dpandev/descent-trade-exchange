import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import { Text, View } from '../../components/Themed';
import PageHeader from '../../components/molecules/PageHeader';
import MarketListScreen from '../MarketScreen';
import Searchbar from '../../components/atoms/inputs/Searchbar';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listCoins } from '../../src/graphql/queries';

export default function TabThreeScreen() {

  const [search, setSearch] = useState('');

  const useSearch = () => {
    console.log('searching...', search);
  }

  return (
    <View style={styles.root}>
      <PageHeader title='Trading' searchbarOptions={{ value: search, setValue: setSearch, onSubmit: useSearch }} />
      <MarketListScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  noDataMsg: {
    textAlign: 'center',
    color: '#FE4A76',
  },
});
