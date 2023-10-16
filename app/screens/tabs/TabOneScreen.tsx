import { FlatList, StyleSheet } from 'react-native';
import { AmplifyGraphQLResult } from '../../types';
import React, { useState, useEffect } from 'react';
import { ElementView, Text } from '../../components/Themed';
import NewsItem from '../../components/molecules/NewsItem';
import PageHeader from '../../components/molecules/PageHeader';
import { API, graphqlOperation } from 'aws-amplify';
import { listArticles } from '../../../src/graphql/queries';
import { Article, ListArticlesQuery } from '../../../src/API';

export default function TabOneScreen(): React.JSX.Element {
  
  const [newsList, setNewsList] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNews = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof listArticles>>(
        graphqlOperation(
          listArticles,
          { limit: 30 }
        ),
      ) as { data: ListArticlesQuery };

      if (response.data.listArticles?.items) {
        let articlesResponse: Article[] = response.data.listArticles.items.filter(
          (item): item is Article => item != null
        );
        setNewsList(articlesResponse);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <ElementView style={styles.root}>
      <PageHeader title={"News"} />
      <FlatList
        initialNumToRender={7}
        removeClippedSubviews
        style={{width: '100%', marginTop: 25}}
        data={newsList.map(item => ({...item})).sort((a, b) => (a.publishedAt > b.publishedAt) ? 1 : -1)}
        onRefresh={fetchNews}
        refreshing={isLoading}
        renderItem={_renderitem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.textComponent}>no articles to display</Text>}
        ListFooterComponent={<Text style={styles.textComponent}>pull to refresh</Text>}
      />
    </ElementView>
  );
}

const _renderitem = ({item}: {item: Article}) => <NewsItem article={item} key={item.id} />;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  textComponent: {
    textAlign: 'center',
    color: '#929292',
  },
});
