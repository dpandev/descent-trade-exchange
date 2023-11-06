import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, RoundedButton, ElementView } from '../../components/Themed';
import { AbbreviateNum, Networth, ShortDate } from '../../components/FormattedTextElements';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import TradesDisplay from '../../components/organisms/TradesDisplay';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../../src/graphql/queries';
import { GetUserQuery, User } from '../../../src/API';
import { AmplifyGraphQLResult, RootStackParamList } from '../../types';
import { AuthUserType } from '../../hooks/AuthContext';

export default function ProfileScreen({user}: {user: AuthUserType}) {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const fetchProfile = async (): Promise<void> => {
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getUser>>(
        graphqlOperation(
          getUser,
          { id: user.id },
        ),
      ) as { data: GetUserQuery };

      if (response.data.getUser) {
        const fetchedUser: User = response.data.getUser;
        setUserData(fetchedUser);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onSettingsPressed = (): void => {
    navigation.navigate('Settings');
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading || !userData) {
    return (
      <>
        <ActivityIndicator />
        <RoundedButton
          inverted
          onPress={onSettingsPressed} 
          buttonStyles={styles.settings}
          textStyles={{ fontSize: 16 }}
        >
          Settings
        </RoundedButton>
      </>
    );
  }

  return (
    <ElementView style={styles.root}>
      <Text style={styles.profileName} numberOfLines={1}>{userData.displayName}</Text>
      <ElementView style={styles.profileContainer}>
        <Image 
          source={{ uri: userData.image }} 
          width={50}
          height={50}
          style={styles.profileImage}
        />
        <ElementView style={styles.profileInfo}>
          <Text style={styles.profileText}>
            Net Worth: {''}
            <Networth value={userData.networth} />
          </Text>
          <Text style={styles.profileText}>
            Total Trades: {''}
            <AbbreviateNum value={userData.trades?.items.length || 0} style={styles.profileTextData}/>
          </Text>
          <Text style={styles.profileText}>Member Since:</Text>
          <ShortDate value={userData.createdAt} />
        </ElementView>
      </ElementView>
      <ElementView style={styles.tradesDisplay}>
        <TradesDisplay></TradesDisplay>
      </ElementView>
    </ElementView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
    height: '100%',
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
    marginBottom: 12,
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
    alignSelf: 'center',
  },
  tradesDisplay: {
    width: '100%',
    maxWidth: 320,
    marginTop: 10,
  },
  squareBtn: {
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
});