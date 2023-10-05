import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Networth } from '../FormattedTextElements';
import { ElementView, Text, ListItemButton, FollowButton } from '../Themed';
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from '../../utils/AuthContext';
import { UpdateUserMutation, User } from '../../../src/API';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../../src/graphql/mutations';
import { AmplifyGraphQLResult } from '../../types';

export interface UserRankingItemProps {
  userData: User,
  place: number,
}

export default function UserRankingItem(props: UserRankingItemProps) {
  const {
    userData: {
      id,
      image,
      displayName,
      networth,
      followers,
    },
    place
  } = props;

  const { user } = useAuthContext();
  if (!followers || !user) {
    throw new Error;
  }
  const [activeFollow, setActiveFollow] = useState<boolean>(followers.filter(x => x === user.id).includes(user.id));
  const navigation = useNavigation();

  const onPressed = () => {
    navigation.navigate('PlayerDetails', { id });
  }

  const followPressed = () => {
    if (user?.id && user?.following && followers && id) {
      if (!activeFollow) {//add
        updateFollowList(id, [...followers, user.id], true);
        updateFollowList(user.id, [...user.following, id], false);
        setActiveFollow(true);
      } else if (activeFollow) {//remove
        updateFollowList(id, [...followers.filter(x => x !== user.id)], true);
        updateFollowList(user.id, [...user.following.filter(x => x !== id)], false);
        setActiveFollow(false);
      }
    }
  }

  const updateFollowList = async (userToUpdate: any, following: any, isFollowersList: boolean): Promise<void> => {
    if (isFollowersList) {
      try {
        let response: { data: UpdateUserMutation };
        response = await API.graphql<AmplifyGraphQLResult<typeof updateUser>>({
          ...graphqlOperation(
            updateUser,
            { input: { id: userToUpdate, followers: following } }
          ),
        }) as { data: UpdateUserMutation };
      } catch(error) {
        console.error(error);
        throw new Error;
      }
    } else {
      try {
        let response: { data: UpdateUserMutation };
        response = await API.graphql<AmplifyGraphQLResult<typeof updateUser>>({
          ...graphqlOperation(
            updateUser,
            { input: { id: userToUpdate, following: following } }
          ),
        }) as { data: UpdateUserMutation };
      } catch(error) {
        console.error(error);
        throw new Error;
      }
    }
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
        {followers?.length && user !== null && user.id !== id
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
