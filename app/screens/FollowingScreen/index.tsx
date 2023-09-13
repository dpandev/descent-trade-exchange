import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from '../../components/Themed'
import UserRankingItem from "../../components/molecules/UserRankingItem";
import Searchbar from '../../components/atoms/inputs/Searchbar';

// import { userInfo } from '../../../assets/dummyData/userInfo';

const FollowingScreen = ({user}: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')

  const followingData = user.following

  const temp = () => {
    setIsLoading(false)
  }

  const fetchUsers = () => {
    // setIsLoading(true)
    // setTimeout(temp, 100)
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
        data={followingData.filter((item: any) => item.following)}
        onRefresh={fetchUsers}
        refreshing={isLoading}
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

export default FollowingScreen;
