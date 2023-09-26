import { StyleSheet, FlatList } from 'react-native';
import { View, ElementView } from '../../components/Themed';
import PortfolioCoin from '../../components/molecules/PortfolioCoin';
import PageHeader from '../../components/molecules/PageHeader';
import { PreciseMoney } from '../../components/FormattedTextElements';
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify'

import { AuthUserType, useAuthContext } from '../../utils/AuthContext';
import { getUser } from '../../../src/graphql/queries';

type PortfolioCoin = {
  id: string;
  coinId: string;
  amount: number;
}

export default function TabTwoScreen() {

  const [userInfo, setUserInfo] = useState<AuthUserType>();
  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioCoin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theUser = useAuthContext();

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const response = await API.graphql({
        ...graphqlOperation(
          getUser,
          { id: theUser.id },
        ),
        authMode: "API_KEY"
      });

      console.log('roro', response.data.getUser.portfolio.items)
      setPortfolioCoins(response.data.getUser.portfolio.items);
      setUserInfo(response.data.getUser);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <View style={styles.root}>
      <PageHeader title={"Assets"} />
      <ElementView style={styles.balanceContainer}>
        <PreciseMoney value={userInfo?.networth || 0} style={styles.balance} />
      </ElementView>
      <FlatList
        style={{width: '100%'}}
        data={portfolioCoins}
        // keyExtractor={(item, index) => item.id}
        onRefresh={fetchAssets}
        refreshing={isLoading}
        renderItem={({item}) => <PortfolioCoin portfolioCoin={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  balanceContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {},
  balance: {
    fontSize: 28,
    fontWeight: 'bold',
    width: '85%',
    textAlign: 'center',
    color: '#6338F1',
  },
});
