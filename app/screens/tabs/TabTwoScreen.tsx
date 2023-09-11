import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';

export default function TabTwoScreen() {

  return (
    <View style={styles.root}>
      <Text>Tab 2</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
