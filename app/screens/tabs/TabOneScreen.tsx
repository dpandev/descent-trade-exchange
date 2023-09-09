import { StyleSheet, View, Text } from 'react-native';
import { RootTabScreenProps } from '../../types';
import React from 'react';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <View style={styles.root}>
      <Text>Tab 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
