import { ElementView, Text } from '../Themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import Searchbar, { SearchbarProps } from '../atoms/inputs/Searchbar';

export interface PageHeaderProps {
  title: string;
  searchbarOptions?: SearchbarProps;
}

export default function PageHeader({ title, searchbarOptions }: PageHeaderProps) {
  return (
    <ElementView style={styles.header}>
      {searchbarOptions &&
        <ElementView style={styles.search}>
          <Searchbar 
            value={searchbarOptions.value} 
            setValue={searchbarOptions.setValue} 
            onSubmit={searchbarOptions.onSubmit}
          />
        </ElementView>
      }
      <Text style={styles.title}>{title}</Text>
    </ElementView>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '90%',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  search: {
    width: '100%',
    alignSelf: 'center',
  },
})