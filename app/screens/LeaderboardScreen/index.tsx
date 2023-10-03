import React, { useEffect, useState } from 'react';
import { Image, FlatList, StyleSheet } from 'react-native';
import { ElementView, Text } from '../../components/Themed'
import UserRankingItem from "../../components/molecules/UserRankingItem";
import Searchbar from '../../components/atoms/inputs/Searchbar';

import { useAuthContext } from '../../utils/AuthContext';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../../../src/graphql/queries';

type User = {
  id: string;
  displayName: string;
  image: string;
  createdAt: string;
  networth: number;
  followers: [string];
  trades: any;
}

export default function LeaderboardScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [usersList, setUsersList] = useState<User[]>([]);
  const [nextToken, setNextToken] = useState<string>();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      let response;
      // send graphql req without nextToken if data doesnt exist in state yet
      if (usersList.length > 0 || usersList !== null) {
        response = await API.graphql({
          ...graphqlOperation(
            listUsers,
            { limit: 10, nextToken: nextToken }
          ),
        });
      } else {
        response = await API.graphql({
          ...graphqlOperation(
            listUsers,
          ),
        });
      }
      if (response.data.listUsers.items) {
        setUsersList(response.data.listUsers.items);

        if (response.data.nextToken) {
          setNextToken(response.data.nextToken);
        }
      }
    } catch(error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ElementView style={styles.root}>
      <Searchbar 
        placeholder={'search for a user'} 
        value={search}
        setValue={setSearch}
      />
      <FlatList
        style={{width: '100%'}}
        onRefresh={fetchUsers}
        refreshing={isLoading}
        data={usersList.map(item => ({...item})).sort((a, b) => (a.networth < b.networth) ? 1 : -1)}
        renderItem={({item, index}) => <UserRankingItem user={item} place={index + 1} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListEmptyComponent={<Text style={styles.noDataMsg}>pull down to refresh</Text>}
      />
    </ElementView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noDataMsg: {
    textAlign: 'center',
    color: '#FE4A76',
  },
});
