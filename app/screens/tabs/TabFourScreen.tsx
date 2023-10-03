import React from 'react';
import { StyleSheet} from 'react-native';
import SocialScreen from '../SocialScreen';
import { View } from '../../components/Themed';
import PageHeader from '../../components/molecules/PageHeader';

export default function TabFourScreen() {

  return (
    <View style={styles.root}>
      <PageHeader title={'Social'} />
      <SocialScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
});