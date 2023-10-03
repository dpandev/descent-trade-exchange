import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Networth } from '../FormattedTextElements';
import { ElementView, Text, ListItemButton, FollowButton } from '../Themed';
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from '../../utils/AuthContext';

export interface UserRankingItemProps {
  user: {
    id: string,
    image: string,
    displayName: string,
    networth: number,
    followers: [string]
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
      followers
    },
    place
  } = props;

  const user = useAuthContext();
  const [activeFollow, setActiveFollow] = useState<boolean>(followers.filter(x => x === user.id).length > 0);
  const navigation = useNavigation();

  const onPressed = () => {
    navigation.navigate('PlayerDetails', { id });
  }

  const followPressed = () => {
    setActiveFollow(prevState => !prevState);
    //TODO mutation gql
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
        {followers.filter(x => x === user.id).includes(user.id) 
        
          ? <FollowButton inverted={!activeFollow} activeState={activeFollow} onPress={followPressed}>
              {activeFollow ? "Following" : "Follow"}
            </FollowButton>

          : null
        }
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
