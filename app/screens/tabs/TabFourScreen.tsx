import React from 'react';
import { StyleSheet } from 'react-native';
import PageHeader from '../../components/molecules/PageHeader';
import { AlternateButtonProps } from '../../components/atoms/buttons/AlternateButton';
import { RootStackParamList } from '../../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ElementView } from '../../components/Themed';
import TradesDisplay from '../../components/organisms/TradesDisplay';

export default function TabFourScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const onIconPress = (): void => {
    navigation.navigate('Settings');
  }

  const icon: AlternateButtonProps = {
    icon: {
      name: 'gears',
      size: 36,
      color: 'white',
      inactiveColor: '#929292'
    },
    style: {
      padding: 4,
    },
    onPress: onIconPress,
  }

  return (
    <ElementView style={styles.root}>
      <PageHeader title={'Trades'} iconProps={icon} />
      <TradesDisplay />
    </ElementView>
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