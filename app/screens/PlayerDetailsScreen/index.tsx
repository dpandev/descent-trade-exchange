import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, StyleSheet } from 'react-native';
import { ElementView, Text, View } from '../../components/Themed'
import { AbbreviateNum, Networth, ShortDate } from "../../components/FormattedTextElements";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../../src/graphql/queries';
import TradesDisplay from '../../components/organisms/TradesDisplay';
import { GetUserQuery, Trade } from '../../../src/API';
import { AmplifyGraphQLResult } from '../../types';

type PlayerDetails = {
  displayName: string | null | undefined;
  image: string | null | undefined;
  networth: number;
  createdAt: string;
  trades: Trade[] | (Trade | null)[] | null;
  followers: (string | null)[] | null | undefined;
  following: (string | null)[] | null | undefined;
}

const PlayerDetailsScreen = () => {
  const route: RouteProp<ParamListBase> = useRoute();
  const [player, setPlayer] = useState<PlayerDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const fetchPlayerData = async () => {
    setIsLoading(true);
    if (!route.params?.id) {
      return;
    }
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getUser>>({
        ...graphqlOperation(
          getUser, 
          { id: route.params.id }
        ),
      }) as { data: GetUserQuery };
      if (response.data.getUser) {
        setPlayer({
          displayName: response.data.getUser.displayName,
          image: response.data.getUser.image,
          networth: response.data.getUser.networth,
          createdAt: response.data.getUser.createdAt,
          trades: response.data.getUser.trades!,
          followers: response.data.getUser.followers,
          following: response.data.getUser.following,
        });
      }
    } catch(error) {
      console.error('error2', error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPlayerData();
  }, []);

  if (!player || isLoading) {
    return (
      <ElementView style={{ alignItems: 'center' }}>
        <ActivityIndicator />
      </ElementView>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.profileContainer}>
        <Image 
          src={player?.image!} 
          source={{ uri: player?.image! }} 
          width={50}
          height={50}
          style={styles.profileImage}
        />
        <ElementView style={styles.profileInfo}>
          <Text style={styles.profileName}>{player?.displayName}</Text>
          <Text style={styles.profileText}>
            Net Worth: {''}
            <Networth value={player?.networth} />
          </Text>
          <Text style={styles.profileText}>
            Total Trades: {''}
            <AbbreviateNum value={player?.trades?.length || 0} />
          </Text>
          <Text style={styles.profileText}>
            Followers: {''}
            <AbbreviateNum value={player?.followers?.length || 0} />
          </Text>
          <Text style={styles.profileText}>Member Since:</Text>
          <ShortDate value={player?.createdAt} />
        </ElementView>
      </View>
      <ElementView style={styles.tradesDisplay}>
        <TradesDisplay listOfTrades={player?.trades}></TradesDisplay>
      </ElementView>
    </View>
  );
};

export default PlayerDetailsScreen;

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
  tradesDisplay: {
    width: '100%',
    paddingHorizontal: 10,
    maxWidth: 325,
    marginTop: 25,
    height: '60%',
  },
});