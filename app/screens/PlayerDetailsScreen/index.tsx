import React, { useEffect, useState, useContext } from 'react';
import { Image, Pressable, ActivityIndicator, StyleSheet, View } from 'react-native';
import { ElementView, Text, RoundedButton } from '../../components/Themed'
import { AbbreviateNum, Networth, PercentageChange, PreciseMoney, ShortDate } from "../../components/FormattedTextElements";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../../src/graphql/queries';

type PlayerDetails = {
  displayName: string;
  image: string;
  networth: number;
  createdAt: string;
  trades: any;
  followers: [];
  following: [];
}

const PlayerDetailsScreen = () => {
  const route: RouteProp<ParamListBase> = useRoute();

  const [player, setPlayer] = useState<PlayerDetails>();
  
  const fetchPlayerData = async () => {
    if (!route.params?.id) {
      return;
    }
    try {
      const response = await API.graphql(graphqlOperation(getUser, { id: route.params.id }));
      setPlayer(response.data.getUser);
    } catch(error) {
      console.log('error2', error);
    }
  }

  useEffect(() => {
    fetchPlayerData();
    console.log('running a player marathon');
  }, []);

  if (!player) {
    return (<ActivityIndicator />);
  }

  return (
    <View style={styles.root}>
      <View style={styles.profileContainer}>
        <Image 
          src={player?.image} 
          source={{ uri: player?.image }} 
          width={50}
          height={50}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{player?.displayName}</Text>
          <Text style={styles.profileText}>
            Net Worth: {''}
            <Networth value={player?.networth} />
          </Text>
          <Text style={styles.profileText}>
            Total Trades: {''}
            {/* <AbbreviateNum value={player?.trades?.length || 0} style={styles.profileTextData}/> */}
          </Text>
          <Text style={styles.profileText}>
            Followers: {''}
            {/* <AbbreviateNum value={player?.followers?.length || 0} style={styles.profileTextData}/> */}
            {/* <Text style={styles.profileTextData}>{player?.followers?.length.toLocaleString('en-US')}</Text> */}
          </Text>
          <Text style={styles.profileText}>Member Since:</Text>
          <ShortDate value={player?.createdAt} />
        </View>
      </View>
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
  profileTextData: {
    color: '#3EF03E',
  },
});