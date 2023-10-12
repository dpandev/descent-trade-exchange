import React, { useEffect, useState } from 'react';
import { Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import { ElementView, Text, RoundedButton } from '../../components/Themed';
import { Octicons } from "@expo/vector-icons";
import styles from "./styles";
import { PercentageChange, PreciseMoney } from "../../components/FormattedTextElements";
import CoinPriceGraph from "../../components/organisms/PriceGraph";
import { API, graphqlOperation } from 'aws-amplify';
import { getCoin, getPortfolioCoin, getUser } from '../../../src/graphql/queries';
import { useAuthContext } from '../../utils/AuthContext';
import { Coin, GetCoinQuery, GetPortfolioCoinQuery, GetUserQuery, PortfolioCoin, UpdateUserMutation } from '../../../src/API';
import { AmplifyGraphQLResult, RootStackScreenProps } from '../../types';
import { updateUser } from '../../../src/graphql/mutations';


const CoinDetailsScreen = ({ navigation, route }: RootStackScreenProps<'CoinDetails'>) => {//todo update amplify postconfirm coin id, just send
  const { user } = useAuthContext();
  const [coin, setCoin] = useState<Coin>();
  const [portfolioCoin, setPortfolioCoin] = useState<PortfolioCoin>();
  const [starActive, setStarActive] = useState<boolean>(false);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [isUpdatingUser, setIsUpdatingUser] = useState<boolean>(false);

  const fetchCoinData = async (): Promise<void> => {
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
      console.log(error);
    }
  }

  const fetchWatchlistData = async (): Promise<void> => {
    try {
      const watchlistResponse = await API.graphql<AmplifyGraphQLResult<typeof getUser>>({
        ...graphqlOperation(
          getUser,
          { id: user.id }
        ),
      }) as { data: GetUserQuery };
      if (watchlistResponse.data.getUser.watchlist) {
        const watchlistData: string[] = watchlistResponse.data.getUser.watchlist as string[];
        const isInWatchlist: boolean = watchlistData.includes(route.params.id);
        if (isInWatchlist) {
          setStarActive(true);
        }
        setWatchlist(watchlistData);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const fetchPortfolioCoinData = async (): Promise<void> => {
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getPortfolioCoin>>(
        graphqlOperation(
          getPortfolioCoin, 
          { id: `${user.id}-${route.params.id}` },
        ),
      ) as { data: GetPortfolioCoinQuery };
      if (response.data.getPortfolioCoin) {
        const fetchedPortfolioCoin: PortfolioCoin = response.data.getPortfolioCoin as PortfolioCoin;
        setPortfolioCoin(fetchedPortfolioCoin);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const addToWatchlist = async (): Promise<void> => {
    setIsUpdatingUser(true);
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof updateUser>>({
        ...graphqlOperation(
          updateUser, 
          { input: {
            id: user.id,
            watchlist: [...watchlist, coin.id]
          }}
        ),
      }) as { data: UpdateUserMutation };
      if (response.data.updateUser.watchlist) {
        setStarActive(true);
        setWatchlist(response.data.updateUser.watchlist);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsUpdatingUser(false);
    }
  }

  const removeFromWatchlist = async (): Promise<void> => {
    setIsUpdatingUser(true);
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof updateUser>>({
        ...graphqlOperation(
          updateUser, 
          { input: {
            id: user.id,
            watchlist: [...watchlist.filter(x => x !== coin.id)]
          }}
        ),
      }) as { data: UpdateUserMutation };
      if (response.data.updateUser) {
        setStarActive(false);
        setWatchlist(response.data.updateUser.watchlist);
      }
    } catch(error) {
      console.log(error); 
    } finally {
      setIsUpdatingUser(false);
    }
  }

  useEffect(() => {
    fetchCoinData();
    fetchWatchlistData();
    fetchPortfolioCoinData();
  }, []);

  const onBuy = (): void => {
    navigation.navigate('CoinExchange', { isBuy: true, coin, portfolioCoin });
  }

  const onSell = (): void => {
    if (coin.id === 'usd-coin') {
      Alert.alert("Unable to sell USDC. Buy a different coin instead.")
    } else {
      navigation.navigate('CoinExchange', { isBuy: false, coin, portfolioCoin });
    }
  }

  const onStarPressed = (): void => {
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
          <Image style={styles.image} source={{ uri: coin.image }} />
          <ElementView>
            <Text style={styles.name}>{coin.name}</Text>
            <Text style={styles.symbol}>{coin.symbol}</Text>
          </ElementView>
        </ElementView>
        <ElementView style={{alignItems: 'flex-end'}}>
          <Pressable onPress={onStarPressed} disabled={isUpdatingUser}>
            {isUpdatingUser 
            ? <ActivityIndicator />
            : <Octicons name={starActive ? 'star-fill' : 'star'} size={30} color={'#6338F1'} />
            }
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
          {'Shares: '}{portfolioCoin?.amount.toLocaleString('en-US') || 0} {coin.symbol.toUpperCase()}
          </Text>
          <ElementView style={styles.rowText}>
            <Text>{'Value: '}</Text>
            <PreciseMoney value={coin.currentPrice * (portfolioCoin?.amount || 0)} />
            <Text>{' USD'}</Text>
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
          // disabled={coin.id === 'usd-coin'}
        >
          Sell
        </RoundedButton> 
      </ElementView>

    </ElementView>
  );
};

export default CoinDetailsScreen;
