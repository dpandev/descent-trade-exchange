import { ElementView, Text } from '../Themed';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Searchbar from '../atoms/inputs/Searchbar';
import ThreeCustomTabs from '../organisms/ThreeCustomTabs';

export interface PageHeaderProps {
  title: string;
  searchbarOptions?: any;
  buttonsOptions?: any;
}

export default function PageHeader({ title, searchbarOptions, buttonsOptions }: PageHeaderProps) {

  const [search, setSearch] = useState('');

  return (
    <ElementView style={styles.header}>
      {searchbarOptions &&
        <ElementView style={styles.search}>
            <Searchbar 
              placeholder={searchbarOptions.placeholder} 
              value={search}
              setValue={setSearch}
            />
          </ElementView>
      }
      <Text style={styles.title}>{title}</Text>
      {buttonsOptions &&
        <ThreeCustomTabs buttons={buttonsOptions.buttons} setRenderComp={buttonsOptions.setRenderComp} />
      }
    </ElementView>
  );
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
});