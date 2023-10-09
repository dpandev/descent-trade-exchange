import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';
import UserRankingItem from "../../components/molecules/UserRankingItem";
import Searchbar from '../../components/atoms/inputs/Searchbar';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../../../src/graphql/queries';
import { AmplifyGraphQLResult } from '../../types';
import { ListUsersQuery, User } from '../../../src/API';
import { AuthUserType } from '../../utils/AuthContext';


const FollowingScreen = ({user}: {user: AuthUserType}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [followingList, setFollowingList] = useState<User[]>([]);

  const fetchUsers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof listUsers>>({
        ...graphqlOperation(
          listUsers,
          { filter: {
            followers: {
              contains: user.id
            }
          }}
        ),
      }) as { data: ListUsersQuery };
      if (response.data.listUsers.items) {
        const fetchedUsers: User[] = response.data.listUsers.items.filter(
          (item): item is User => item != null
        );
        setFollowingList(fetchedUsers);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.root}>
      <Searchbar 
        placeholder={'search for a user'} 
        value={search}
        setValue={setSearch}
      />
      <FlatList
        style={{width: '100%'}}
        data={followingList}
        onRefresh={fetchUsers}
        refreshing={isLoading}
        renderItem={({item, index}) => <UserRankingItem userData={item} place={index + 1} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
      />
    </View>
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
});

export default FollowingScreen;
