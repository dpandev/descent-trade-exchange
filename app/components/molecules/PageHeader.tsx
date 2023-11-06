import { ElementView, Text } from '../Themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import AlternateButton from '../atoms/buttons/AlternateButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';


export interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const onIconPress = (): void => {
    navigation.navigate('Settings');
  }

  return (
    <ElementView style={styles.header}>
      <ElementView style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <AlternateButton 
          icon={{ name: 'cogs', size: 32, color: 'white', inactiveColor: '#929292' }}
          style={{ padding: 4 }}
          onPress={onIconPress}
        />
      </ElementView>
    </ElementView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
  },
});