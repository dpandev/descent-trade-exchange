import React, { useEffect, useState } from 'react';
import { Image, Pressable, ActivityIndicator } from 'react-native';
import { ElementView, Text, RoundedButton } from '../../components/Themed';
import { Octicons } from "@expo/vector-icons";
import styles from "./styles";
import { PercentageChange, PreciseMoney } from "../../components/FormattedTextElements";
import CoinPriceGraph from "../../components/organisms/PriceGraph";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from 'aws-amplify';
import { getCoin, getPortfolioCoin, getUser } from '../../../src/graphql/queries';
import { useAuthContext } from '../../utils/AuthContext';
import { Coin, GetCoinQuery, PortfolioCoin, UpdateUserMutation } from '../../../src/API';
import { AmplifyGraphQLResult, RootStackParamList } from '../../types';
import { updateUser } from '../../../src/graphql/mutations';

const CoinDetailsScreen = () => {
  const { user, setUser } = useAuthContext();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'CoinDetails'>>();
  const [coin, setCoin] = useState<Coin | null | undefined>(null);
  const [portfolioCoin, setPortfolioCoin] = useState<PortfolioCoin | null | undefined>(null);
  const [starActive, setStarActive] = useState<boolean>();

  const fetchCoinData = async () => {
    if (!route.params?.id) {
      return;
    }
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getCoin>>({
        ...graphqlOperation(
          getCoin, 
          { id: route.params.id }
        ),
      }) as { data: GetCoinQuery };
      if (response.data.getCoin) {
        setCoin({...response.data.getCoin});
      }
    } catch(error) {
      console.error(error);
    }
  }

  const fetchPortfolioCoinData = async () => {
    if (!user) return;
    if (!route.params?.id) {
      return;
    }
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getPortfolioCoin>>(
        graphqlOperation(
          getPortfolioCoin, 
          { id: `${user.id}-${route.params.id}` },
        ),
      );
      if (response.data.getPortfolioCoin) {
        setPortfolioCoin(response.data.getPortfolioCoin);
      }
      if (coin) {
        if (user?.watchlist?.includes(coin.id)) {
          setStarActive(true);
        }
      }
    } catch(error) {
      console.error(error);
    }
  }

  const addToWatchlist = async () => {
    if (!user) return;
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof updateUser>>({
        ...graphqlOperation(
          updateUser, 
          { input: {
            id: user.id,
            watchlist: user.watchlist + coin!.id
          }}
        ),
      }) as { data: UpdateUserMutation };
      if (response.data.updateUser) {
        setStarActive(true);
        setUser(response.data.updateUser);
      }
    } catch(error) {
      console.error(error);
    }
  }

  const removeFromWatchlist = async () => {
    if (!user) return;
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof updateUser>>({
        ...graphqlOperation(
          updateUser, 
          { input: {
            id: user.id,
            watchlist: user.watchlist!.filter(x => x !== coin!.id)
          }}
        ),
      }) as { data: UpdateUserMutation };
      if (response.data.updateUser) {
        setStarActive(false);
        setUser(response.data.updateUser);
      }
    } catch(error) {
      console.error(error); 
    }
  }

  useEffect(() => {
    fetchCoinData();
  }, []);

  useEffect(() => {
    fetchPortfolioCoinData();
  }, [coin]);

  const onBuy = () => {
    navigation.navigate('CoinExchange', { isBuy: true, coin, portfolioCoin });
  }

  const onSell = () => {
    navigation.navigate('CoinExchange', { isBuy: false, coin, portfolioCoin });
  }

  const onStarPressed = () => {
    if (starActive) {
      removeFromWatchlist();
    } else {
      addToWatchlist();
    }
  }

  if (!coin) {
    return <ActivityIndicator />;
  }

  return (
    <ElementView inverted style={styles.root}>
      <ElementView style={styles.topContainer}>
        <ElementView style={styles.left}>
          <Image style={styles.image} source={{ uri: coin.image! }} />
          <ElementView>
            <Text style={styles.name}>{coin.name}</Text>
            <Text style={styles.symbol}>{coin.symbol}</Text>
          </ElementView>
        </ElementView>
        <ElementView style={{alignItems: 'flex-end'}}>
          <Pressable onPress={onStarPressed}>
            <Octicons name={starActive ? 'star-fill' : 'star'} size={30} color={'#6338F1'} />
          </Pressable>
        </ElementView>
      </ElementView>

      <ElementView style={styles.row}>
        <ElementView style={styles.valueContainer}>
          <Text style={styles.label}>Current price</Text>
          <PreciseMoney value={coin.currentPrice} style={styles.value} />
        </ElementView>

        <ElementView style={{flexDirection: 'row'}}>
          <ElementView style={styles.valueContainer}>
            <Text style={styles.label}>1 hour</Text>
            <PercentageChange value={coin.valueChange1H} />
          </ElementView>

          <ElementView style={styles.valueContainer}>
            <Text style={styles.label}>1 day</Text>
            <PercentageChange value={coin.valueChange24H} />
          </ElementView>

          <ElementView style={styles.valueContainer}>
            <Text style={styles.label}>7 days</Text>
            <PercentageChange value={coin.valueChange7D} />
          </ElementView>
        </ElementView>
      </ElementView>

      {coin?.priceHistory
        && <CoinPriceGraph dataString={coin.priceHistory} />}

      <ElementView style={[styles.row, {justifyContent: 'space-evenly'}]}>
        <Text style={styles.positionLabel}>Position</Text>
        <ElementView>
          <Text>
            {portfolioCoin?.amount?.toLocaleString('en-US') || 0} {coin.symbol.toUpperCase()}
          </Text>
          <ElementView style={styles.rowText}>
            <PreciseMoney value={coin.currentPrice * (portfolioCoin?.amount || 0)} />
            <Text> USD</Text>
          </ElementView>
        </ElementView>
      </ElementView>

      <ElementView style={[styles.row, { marginTop: 'auto' }]}>
        <RoundedButton
          inverted
          onPress={onBuy}
          textStyles={styles.buttonText}
          buttonStyles={styles.button}
        >
          Buy
        </RoundedButton>
        <RoundedButton
          inverted
          onPress={onSell}
          textStyles={styles.buttonText}
          buttonStyles={styles.button}
        >
          Sell
        </RoundedButton> 
      </ElementView>

    </ElementView>
  );
};

export default CoinDetailsScreen;
