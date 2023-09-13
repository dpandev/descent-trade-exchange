import React, { useEffect, useState } from 'react';
import { Image, FlatList, StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed'
import UserRankingItem from "../../components/molecules/UserRankingItem";
import Searchbar from '../../components/atoms/inputs/Searchbar';

import { userInfo } from '../../../assets/dummyData/userInfo';

export default function LeaderboardScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')

  const FollowingData = userInfo[0].following

  const temp = () => {
    setIsLoading(false)
  }

  const fetchUsers = () => {
    // setIsLoading(true)
    // setTimeout(temp, 500)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <View style={styles.root}>
      <Searchbar 
        placeholder={'search for a user'} 
        value={search}
        setValue={setSearch}
      />
      <FlatList
        style={{width: '100%'}}
        onRefresh={fetchUsers}
        refreshing={isLoading}
        data={FollowingData.map(item => ({...item})).sort((a, b) => (a.networth < b.networth) ? 1 : -1)}
        renderItem={({item, index}) => <UserRankingItem user={item} place={index + 1} />}
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
