import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';
import UserRankingItem from "../../components/molecules/UserRankingItem";
import Searchbar from '../../components/atoms/inputs/Searchbar';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../../../src/graphql/queries';
import { AuthUserType } from '../../utils/AuthContext';

type FollowedUserType = {
  id: string;
  displayName: string;
  networth: number;
  email: string;
  image: string;
  followers: [string];
  trades: any;
  createdAt: string;
}

const FollowingScreen = ({user}: {user: AuthUserType}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [followingList, setFollowingList] = useState<FollowedUserType[]>([]);

  const fetchUsers = async () => {
    setIsLoading(true);
    if (user!.following) {
      for (let i = 0; i < user!.following.length; i++) {
        try {
          const response = await API.graphql({
            ...graphqlOperation(
              listUsers,
              { filter: {
                followers: {
                  contains: user!.id
                }
              }}
            ),
          });
          setFollowingList(response.data.listUsers.items);
        } catch(error) {
          console.error(error);
        }
        setIsLoading(false);
      }
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
        renderItem={({item, index}) => <UserRankingItem user={item} place={index + 1} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListEmptyComponent={<Text style={styles.noDataMsg}>pull down to refresh</Text>}
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
  noDataMsg: {
    textAlign: 'center',
    color: '#FE4A76',
  },
});

export default FollowingScreen;
