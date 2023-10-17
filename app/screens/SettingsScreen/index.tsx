import { Text, ElementView, ListItemButton } from '../../components/Themed';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import DeleteAccount from './DeleteAccount';
import { FontAwesome5 } from '@expo/vector-icons'; 
import DialogModal from '../../components/molecules/DialogModal';
import { openBrowserAsync } from 'expo-web-browser';

export default function SettingsScreen() {
  type Dialog = {
    title: string;
    message: string;
  }

  const [accountDel, setAccountDel] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<Dialog>({ title: '', message: '' });

  const openLink = (url: string): void => {
    openBrowserAsync(url);
  }

  const onSignOut = async (): Promise<void> => {
    await Auth.signOut();
  }

  const onDeleteAccount = (): void => {
    setAccountDel(true);
  }

  const onSupport = (): void => {
    setVisible(true);
    setDialogContent({
      title: 'Help & Support',
      message: 'For any inquiries, send our team an email at team@corewebstudios.io',
    });
  }

  const onAbout = (): void => {
    setVisible(true);
    setDialogContent({
      title: 'About',
      message: 'Descent Exchange is a trading platform for virtual cryptocurrencies where users can trades virtual money in exchange for virtual crypto assets. All coin values are provided by CoinGecko and all news data is provided by CryptoPanic.'
    });
  }

  const onPrivacy = (): void => {
    openLink('https://corewebstudios.io/privacy-policy/');
  }

  return (
    <ElementView style={styles.root}>
      <ListItemButton buttonStyles={styles.row} onPress={onSignOut}>
        <FontAwesome5 name="sign-out-alt" size={32} color="white" />
        <Text style={styles.options}>Sign out</Text>
        <FontAwesome5 name="angle-right" size={32} color="white" />
      </ListItemButton>
      <ListItemButton buttonStyles={styles.row} onPress={onDeleteAccount}>
        <FontAwesome5 name="user-times" size={32} color="white" />
        <Text style={styles.options}>Delete Account</Text>
        <FontAwesome5 name="angle-right" size={32} color="white" />
      </ListItemButton>
      <ListItemButton buttonStyles={styles.row} onPress={onSupport}>
        <FontAwesome5 name="headphones-alt" size={32} color="white" />
        <Text style={styles.options}>Help & Support</Text>
        <FontAwesome5 name="angle-right" size={32} color="white" />
      </ListItemButton>
      <ListItemButton buttonStyles={styles.row} onPress={onAbout}>
        <FontAwesome5 name="question-circle" size={32} color="white" />
        <Text style={styles.options}>About</Text>
        <FontAwesome5 name="angle-right" size={32} color="white" />
      </ListItemButton>
      <ListItemButton buttonStyles={styles.row} onPress={onPrivacy}>
        <FontAwesome5 name="lock" size={32} color="white" />
        <Text style={styles.options}>Privacy Policy</Text>
        <FontAwesome5 name="angle-right" size={32} color="white" />
      </ListItemButton>
      <DeleteAccount visible={accountDel} setVisible={setAccountDel} />
      <DialogModal 
        visible={visible}
        setVisible={setVisible}
        title={dialogContent.title}
        statement={dialogContent.message}
      />
    </ElementView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  options: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});