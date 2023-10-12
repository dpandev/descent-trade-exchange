import { View } from '../../components/Themed';
import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import TradesDisplay from '../../components/organisms/TradesDisplay';
import { Trade } from '../../../src/API';

export default function TradesModal(trades: Trade[]) {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const onPress = async (): Promise<void> => {
    console.log('Pressed')
  }

  return (
    <View style={styles.root}>
      <TradesDisplay listOfTrades={[]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightColor: {},
  signOutBtn: {},
});