import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { Text, ElementView, ListItemButton } from '../Themed';
import { Article } from '../../../src/API';
import { Ionicons } from '@expo/vector-icons';
import { DaysAgo } from '../FormattedTextElements';
import { openBrowserAsync } from 'expo-web-browser';

const NewsItem = ({article}: {article: Article}): React.JSX.Element => {

  const openLink = (url: string): void => {
    openBrowserAsync(url);
  }
      
  return (
    <ListItemButton 
      buttonStyles={styles.root} 
      onPress={() => openLink(article.url)}
    >
      <ElementView style={styles.col}>
        <Text style={styles.title}>{article.title}</Text>
        <ElementView style={styles.row}>
          <ElementView style={styles.left}>
            <DaysAgo value={article.publishedAt} style={{ color: '#D1D1D1' }} />
            <Text style={styles.symbol}>{article.coinSymbol.toUpperCase()}</Text>
          </ElementView>
          <ElementView style={styles.link}>
            <Ionicons name="link" size={18} color="#D1D1D1" />
            <Text style={styles.domain}>{article.domain}</Text>
          </ElementView>
        </ElementView>
      </ElementView>
    </ListItemButton>
  );
}

export default memo(NewsItem);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  symbol: {
    flex: 1,
    color: '#2ceb77',
    marginLeft: 25,
    fontWeight: 'bold',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  link: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  domain: {
    marginLeft: 5,
    fontSize: 14,
    color: '#D1D1D1',
  },
});