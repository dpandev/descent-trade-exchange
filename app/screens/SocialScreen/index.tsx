import { ActivatedButton, ElementView } from '../../components/Themed';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ProfileScreen from '../ProfileScreen';
import LeaderboardScreen from '../LeaderboardScreen';
import FollowingScreen from '../FollowingScreen';
import { useAuthContext } from '../../utils/AuthContext';

export default function SocialScreen() {

  const { user } = useAuthContext();

  const tabs = [
    { id: 0, name: 'Profile', component: <ProfileScreen user={user} /> },
    { id: 1, name: 'Rankings', component: <LeaderboardScreen /> },
    { id: 2, name: 'Following', component: <FollowingScreen user={user} /> },
  ]

  const [active, setActive] = useState(tabs[0]);

  // type onPress: (event: GestureResponderEvent) => void;

  const onButtonPress = (tabId: number) => {
    setActive(tabs[tabId]);
  }

  return (
    <>
      <ElementView style={styles.root}>
        <ElementView style={styles.header}>
          <ElementView inverted style={styles.buttonsContainer}>
            {tabs.length > 0 && tabs.map((tab) => (
              <ActivatedButton
                activeState={tab.id === active.id}
                key={tab.id}
                buttonStyles={styles.button}
                textStyles={styles.buttonText}
                onPress={() => onButtonPress(tab.id)}
              >
                {tab.name}
              </ActivatedButton>
            ))}
          </ElementView>
        </ElementView>
      </ElementView>
      <ElementView style={styles.component}>
        {active.component}
      </ElementView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '90%',
    maxWidth: 400,
  },
  component: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    borderRadius: 12,
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 'auto',
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 12,
    borderWidth: 0,
    width: '33.33%',
  },
  buttonText: {
    textAlign: 'center',
  },
});