import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Networth } from '../FormattedTextElements';
import { ElementView, Text, ListItemButton, FollowButton } from '../Themed';
import { useNavigation } from "@react-navigation/native";

export interface UserRankingItemProps {
  user: {
    id: string,
    image: string,
    displayName: string,
    networth: number,
    following: boolean,
  },
  place: number,
}

export default function UserRankingItem(props: UserRankingItemProps) {
  const {
    user: {
      id,
      image,
      displayName,
      networth,
      following,
    },
    place
  } = props;

  const [activeFollow, setActiveFollow] = useState<boolean>(following)
  const navigation = useNavigation();

  const onPressed = () => {
    navigation.navigate('PlayerDetails', { id });
  }

  const followPressed = () => {
    setActiveFollow(prevState => !prevState);
  }

  return (
    <ListItemButton 
      buttonStyles={styles.root} 
      onPress={onPressed}
    >
      <ElementView style={styles.left}>
        <Text style={styles.index}>{place}</Text>
        <Image style={styles.image} src={image} source={{ uri: image }} />
        <ElementView>
          <Text style={styles.username} numberOfLines={1}>{displayName}</Text>
          <Networth value={networth} style={styles.networth} />
        </ElementView>
      </ElementView>
      <ElementView style={styles.right}>
        <FollowButton inverted={!activeFollow} activeState={activeFollow}
          onPress={followPressed}
        >
          {activeFollow ? "Following" : "Follow"}
        </FollowButton>
      </ElementView>
    </ListItemButton>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 15,
    borderRadius: 6,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 15,
    maxWidth: 130,
    marginBottom: 5,
  },
  right: {
    alignItems: 'flex-end',
  },
  networth: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  index: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 15,
  },
});
