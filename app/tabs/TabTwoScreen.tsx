import { StyleSheet, Image, useWindowDimensions, View, Text } from 'react-native';
import { RootTabScreenProps } from '../types';
import React from 'react';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {

  return (
    <View style={styles.container}>
      <Text>TabTwoScreen</Text>
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
