import { StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../types';
import React from 'react';
import { FollowButton, Text, View, } from '../../components/Themed';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <View style={styles.root}>
      <Text>Tab 1</Text>
      <FollowButton>
        Following
      </FollowButton>
      <FollowButton>
        Follow
      </FollowButton>
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
