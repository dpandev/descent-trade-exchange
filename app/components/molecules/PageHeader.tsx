import { AlternateThemeButtonProps, AlternateThemedButton, ElementView, Text } from '../Themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import Searchbar, { SearchbarProps } from '../atoms/inputs/Searchbar';
import AlternateButton, { AlternateButtonProps } from '../atoms/buttons/AlternateButton';


export interface PageHeaderProps {
  title: string;
  searchbarOptions?: SearchbarProps;
  iconProps?: AlternateButtonProps;
}

export default function PageHeader({ title, searchbarOptions, ...otherProps }: PageHeaderProps) {
  return (
    <ElementView style={styles.header}>
      {searchbarOptions &&
        <ElementView style={styles.search}>
          <Searchbar {...searchbarOptions} />
        </ElementView>
      }
      <ElementView style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {otherProps?.iconProps?.icon &&
          <AlternateButton {...otherProps?.iconProps} />
        }
      </ElementView>
    </ElementView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '90%',
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
  search: {
    width: '100%',
    alignSelf: 'center',
  },
});