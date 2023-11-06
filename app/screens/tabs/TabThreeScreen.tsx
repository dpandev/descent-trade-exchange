import React from 'react';
import { StyleSheet} from 'react-native';
import { ElementView } from '../../components/Themed';
import PageHeader from '../../components/molecules/PageHeader';
import MarketListScreen from '../MarketScreen';

export default function TabThreeScreen(): React.JSX.Element {

  return (
    <ElementView style={styles.root}>
      <PageHeader title='Market' />
      <MarketListScreen />
    </ElementView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
