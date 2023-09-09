import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function TabThreeScreen() {

  return (
    <View style={styles.root}>
      <Text>Tab 3</Text>
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
