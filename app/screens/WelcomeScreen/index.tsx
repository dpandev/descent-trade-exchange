import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

export default function WelcomeScreen() {

  return (
    <View style={styles.root}>
      <Text>Welcome</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})