import { View, RoundedButton } from '../../components/Themed';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import ChangeDisplayName from './ChangeDisplayName';

export default function SettingsScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [visible, setVisible] = useState<boolean>(false);

  const onSignOut = async (): Promise<void> => {
    await Auth.signOut();
  }

  const changeTheme = (): void => {
    console.warn('change theme')
  }

  const onChangeUsername = (): void => {
    setVisible(true);
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
      <RoundedButton
        onPress={onChangeUsername}
        textStyles={styles.lightColor}
        buttonStyles={styles.signOutBtn}
      >
        Change Username
      </RoundedButton>

      <ChangeDisplayName visible={visible} setVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightColor: {},
  signOutBtn: {},
});