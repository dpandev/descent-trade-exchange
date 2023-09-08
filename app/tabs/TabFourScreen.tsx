import { StyleSheet, Image, useWindowDimensions, View, Text } from 'react-native';
import { RootTabScreenProps } from '../types';
import React from 'react';

export default function TabFourScreen({ navigation }: RootTabScreenProps<'TabFour'>) {

  return (
    <View style={styles.container}>
      <Text>TabFourScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    maxWidth: 400,
    maxHeight: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
