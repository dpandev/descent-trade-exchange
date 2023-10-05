import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ElementView, Text } from '../../components/Themed'
import UserRankingItem from "../../components/molecules/UserRankingItem";
import Searchbar from '../../components/atoms/inputs/Searchbar';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../../../src/graphql/queries';
import { AmplifyGraphQLResult } from '../../types';
import { ListUsersQuery, User } from '../../../src/API';

export default function LeaderboardScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [usersList, setUsersList] = useState<User[]>([]);
  const [nextToken, setNextToken] = useState<string>();

  const fetchUsers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      let response: { data: ListUsersQuery };
      // send graphql req without nextToken if data doesnt exist in state yet
      if (usersList.length > 0) {
        response = await API.graphql<AmplifyGraphQLResult<typeof listUsers>>({
          ...graphqlOperation(
            listUsers,
            { limit: 20, nextToken: nextToken }
          ),
        }) as { data: ListUsersQuery };
      } else if (usersList != null) {
        response = await API.graphql<AmplifyGraphQLResult<typeof listUsers>>({
          ...graphqlOperation(
            listUsers,
          ),
        })  as { data: ListUsersQuery };
      } else {
        throw new Error;
      }

      if (response.data.listUsers?.items) {
        const fetchedUsers: User[] = response.data.listUsers.items.filter(
          (item): item is User => item != null
        );
        setUsersList(fetchedUsers);

        if (response.data.listUsers.nextToken) {
          setNextToken(response.data.listUsers.nextToken);
        }
      }
    } catch(error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
        data={usersList.map((item: User) => ({...item})).sort((a, b) => (a.networth < b.networth) ? 1 : -1)}
        renderItem={({item, index}: {item: User, index: number}) => <UserRankingItem userData={item} place={index + 1} />}
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
