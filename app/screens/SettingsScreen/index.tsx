import { View, RoundedButton } from '../../components/Themed';
import { StyleSheet } from 'react-native';
import React from 'react';
import { Auth } from 'aws-amplify'

export default function SettingsScreen() {

  const onSignOut = async () => {
    await Auth.signOut();
    console.log('signout')
  }

  const changeTheme = () => {
    console.log('changing theme')
  }

  return (
    <View style={styles.root}>
      <RoundedButton
        onPress={onSignOut}
        textStyles={styles.lightColor}
        buttonStyles={styles.signOutBtn}
      >
        Sign Out
      </RoundedButton>
      <RoundedButton
        onPress={changeTheme}
        textStyles={styles.lightColor}
        buttonStyles={styles.signOutBtn}
      >
        Change Theme
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
  title: {
    fontSize: 32,
  },
  lightColor: {},
  signOutBtn: {},
});