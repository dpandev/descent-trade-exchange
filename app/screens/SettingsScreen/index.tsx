import { View, RoundedButton } from '../../components/Themed';
import { Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import DeleteAccount from './DeleteAccount';

export default function SettingsScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [visible, setVisible] = useState<boolean>(false);

  const onSignOut = async (): Promise<void> => {
    await Auth.signOut();
  }

  const onDeleteAccount = (): void => {
    setVisible(true);
  }

  return (
    <View style={styles.root}>
      <RoundedButton
        onPress={onSignOut}
        buttonStyles={styles.signOutBtn}
      >
        Sign Out
      </RoundedButton>
      <RoundedButton
        onPress={onDeleteAccount}
        buttonStyles={styles.signOutBtn}
      >
        Delete Account
      </RoundedButton>

      <DeleteAccount visible={visible} setVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutBtn: {},
});