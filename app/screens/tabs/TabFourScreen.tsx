import React from 'react';
import { StyleSheet } from 'react-native';
import PageHeader from '../../components/molecules/PageHeader';
import { ElementView } from '../../components/Themed';
import TradesDisplay from '../../components/organisms/TradesDisplay';

export default function TabFourScreen(): React.JSX.Element {

  return (
    <ElementView style={styles.root}>
      <PageHeader title={'Trades'} />
      <TradesDisplay />
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