import React from 'react';
import { StyleSheet} from 'react-native';
import SocialScreen from '../SocialScreen';
import PageHeader from '../../components/molecules/PageHeader';
import { AlternateButtonProps } from '../../components/atoms/buttons/AlternateButton';
import { RootStackParamList } from '../../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View } from '../../components/Themed';

export default function TabFourScreen() {

  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const onIconPress = (): void => {
    console.log('iconPressed')
    navigation.navigate('Settings');
  }

  const icon: AlternateButtonProps = {
    icon: {
      name: 'gears',
      size: 36,
      color: 'white',
      inactiveColor: '#929292'
    },
    activeStyle: {
      borderColor: 'white',
      borderWidth: 3,
      borderRadius: 10,
      padding: 4,
    },
    inactiveStyle: {
      borderColor: '#929292',
      borderWidth: 3,
      borderRadius: 10,
      padding: 4,
    },
    onPress: onIconPress,
  }

  return (
    <View style={styles.root}>
      <PageHeader title={'Social'} iconProps={icon} />
      <SocialScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
});