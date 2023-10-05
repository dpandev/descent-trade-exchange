import { StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../../types';
import React from 'react';
import { FollowButton, RoundedButton, Text, View } from '../../components/Themed';

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
      <RoundedButton
        buttonStyles={styles.btn}
      >
        Continue with Apple
      </RoundedButton>
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
