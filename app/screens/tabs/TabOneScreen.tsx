import { StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../types';
import React from 'react';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <View style={styles.root}>
      <Text>News Display</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 'auto'
  },
});
