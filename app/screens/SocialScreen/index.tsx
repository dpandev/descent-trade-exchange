import { ActivatedButton, ElementView } from '../../components/Themed';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ProfileScreen from '../ProfileScreen';
import LeaderboardScreen from '../LeaderboardScreen';
import FollowingScreen from '../FollowingScreen';
import { useAuthContext } from '../../utils/AuthContext';

const enum ComponentTabItem {
  profile = 'Profile',
  leaderboard = 'Rankings',
  following = 'Following',
}

type TabEnum = `${ComponentTabItem}`;

export default function SocialScreen() {
  const [componentTab, setComponentTab] = useState<TabEnum>(ComponentTabItem.profile);

  const { user } = useAuthContext();

  const onButtonPress = (tabName: TabEnum): void => {
    setComponentTab(tabName);
  }

  return (
    <>
      <ElementView style={styles.root}>
        <ElementView style={styles.header}>
          <ElementView inverted style={styles.buttonsContainer}>
            <ActivatedButton
              activeState={componentTab === ComponentTabItem.profile}
              buttonStyles={styles.button}
              textStyles={styles.buttonText}
              onPress={() => onButtonPress(ComponentTabItem.profile)}
            >
              {ComponentTabItem.profile}
            </ActivatedButton>
            <ActivatedButton
              activeState={componentTab === ComponentTabItem.leaderboard}
              buttonStyles={styles.button}
              textStyles={styles.buttonText}
              onPress={() => onButtonPress(ComponentTabItem.leaderboard)}
            >
              {ComponentTabItem.leaderboard}
            </ActivatedButton>
            <ActivatedButton
              activeState={componentTab === ComponentTabItem.following}
              buttonStyles={styles.button}
              textStyles={styles.buttonText}
              onPress={() => onButtonPress(ComponentTabItem.following)}
            >
              {ComponentTabItem.following}
            </ActivatedButton>
          </ElementView>
        </ElementView>
      </ElementView>
      <ElementView style={styles.component}>
        {componentTab === ComponentTabItem.profile &&
          <ProfileScreen user={user} />
        }
        {componentTab === ComponentTabItem.leaderboard &&
          <LeaderboardScreen />
        }
        {componentTab === ComponentTabItem.following &&
          <FollowingScreen user={user} />
        }
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