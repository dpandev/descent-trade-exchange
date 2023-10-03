import { StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, RoundedButton, ElementView } from '../../components/Themed';
import { AbbreviateNum, Networth, ShortDate } from '../../components/FormattedTextElements';
import { useNavigation } from '@react-navigation/native';
import TradesDisplay from '../../components/organisms/TradesDisplay';
import { AuthUserType } from '../../utils/AuthContext';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser, tradesByUserID } from '../../../src/graphql/queries';
import { Trade } from '../../../src/API';

export default function ProfileScreen({user}: {user: AuthUserType}) {
  const [userTrades, setUserTrades] = useState<Trade[]>([]);
  const navigation = useNavigation();

  const fetchProfile = async () => {
    if (!user) return;
    try {
      const response = await API.graphql(
        graphqlOperation(
          getUser,
          { id: user.id }
        ),
      );
      const fetchedUser: AuthUserType = response.data.getUser;
      if (fetchedUser) {
        user = fetchedUser;
      }
    } catch(error) {
      console.error(error);
    }
  }

  const fetchTrades = async () => {
    if (!user) return;
    if (user.trades?.items) {
      let tradesList: Trade[] = [];
      for (let i = 0; i < user.trades.items.length; i++) {
        if (typeof user.trades.items[i] !== null) {
          tradesList.push(user.trades.items[i]!);
        }
      }
      setUserTrades(tradesList);
    }
    try {
      const response = await API.graphql(
        graphqlOperation(
          tradesByUserID,
          { userID: user.id }
        ),
      );
      const trades: Trade[] = response.data.tradesByUserID.items;
      if (trades) {
        setUserTrades([...trades]);
      }
    } catch(error) {
      console.error(error);
    }
  }

  const onSettingsPressed = () => {
    navigation.navigate('Settings');
  }

  useEffect(() => {
    fetchTrades();
    // fetchProfile();
  }, []);

  return (
    <ElementView style={styles.root}>
      <ElementView style={styles.profileContainer}>
        <Image 
          source={{ uri: user?.image! }} 
          width={50}
          height={50}
          style={styles.profileImage}
        />
        <ElementView style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.displayName}</Text>
          <Text style={styles.profileText}>
            Net Worth: {''}
            <Networth value={user?.networth!} />
          </Text>
          <Text style={styles.profileText}>
            Total Trades: {''}
            <AbbreviateNum value={userTrades.length || 0} style={styles.profileTextData}/>
          </Text>
          <Text style={styles.profileText}>
            Followers: {''}
            <AbbreviateNum value={user?.followers?.length || 0} style={styles.profileTextData}/>
            {/* <Text style={styles.profileTextData}>{user?.followers?.length.toLocaleString('en-US')}</Text> */}
          </Text>
          <Text style={styles.profileText}>Member Since:</Text>
          <ShortDate value={user?.createdAt!} />
        </ElementView>
      </ElementView>
      <ElementView style={styles.tradesDisplay}>
        <TradesDisplay listOfTrades={userTrades || []}></TradesDisplay>
      </ElementView>
      <RoundedButton
        inverted
        onPress={onSettingsPressed} 
        buttonStyles={styles.settings}
        textStyles={{ fontSize: 16 }}
      >
        Settings
      </RoundedButton>
    </ElementView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#1A1C2A',
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 6,
  },
  profileText: {
    marginVertical: 2,
  },
  profileTextData: {
    color: '#3EF03E',
  },
  settings: {
    marginTop: 'auto',
    paddingHorizontal: 45,
    width: 'auto',
  },
  tradesDisplay: {
    width: '100%',
    maxWidth: 325,
    marginTop: 25,
    height: '60%',
  },
});