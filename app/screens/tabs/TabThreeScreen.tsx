import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import { ElementView } from '../../components/Themed';
import PageHeader from '../../components/molecules/PageHeader';
import MarketListScreen from '../MarketScreen';

export default function TabThreeScreen() {

  const [search, setSearch] = useState<string>('');

  const useSearch = () => {
    console.warn('searching...', search);
  }

  return (
    <ElementView style={styles.root}>
      <PageHeader title='Trading' searchbarOptions={{ value: search, setValue: setSearch, onSubmit: useSearch }} />
      <MarketListScreen />
    </ElementView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
});
