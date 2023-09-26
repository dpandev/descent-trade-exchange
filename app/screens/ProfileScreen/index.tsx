import { StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { View, Text, RoundedButton } from '../../components/Themed';
import { AbbreviateNum, Networth, ShortDate } from '../../components/FormattedTextElements';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen({user}: any) {
  const navigation = useNavigation();
  console.log('profileUser', user.id);
  console.log('trades:', user);

  const onSettingsPressed = () => {
    navigation.navigate('Settings');
  }

  return (
    <View style={styles.root}>
      <View style={styles.profileContainer}>
        <Image 
          src={user?.image} 
          source={user?.image} 
          width={50}
          height={50}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.username}</Text>
          <Text style={styles.profileText}>
            Net Worth: {''}
            <Networth value={user?.networth} />
          </Text>
          <Text style={styles.profileText}>
            Total Trades: {''}
            <AbbreviateNum value={user?.trades?.length || 0} style={styles.profileTextData}/>
          </Text>
          <Text style={styles.profileText}>
            Followers: {''}
            <AbbreviateNum value={user?.following?.length || 0} style={styles.profileTextData}/>
            {/* <Text style={styles.profileTextData}>{user?.followers?.length.toLocaleString('en-US')}</Text> */}
          </Text>
          <Text style={styles.profileText}>Member Since:</Text>
          <ShortDate value={user?.createdAt} />
        </View>
      </View>
      <RoundedButton
        inverted
        onPress={onSettingsPressed} 
        buttonStyles={styles.settings}
        textStyles={{ fontSize: 16 }}
      >
        Settings
      </RoundedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
    flexWrap: 'wrap',
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
});