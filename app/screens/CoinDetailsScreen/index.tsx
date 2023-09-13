import React, { useEffect, useState, useContext } from 'react';
import { Image, Pressable, ActivityIndicator } from 'react-native';
import { ElementView, Text, RoundedButton } from '../../components/Themed'
import { Octicons } from "@expo/vector-icons";
import styles from "./styles";
import { PercentageChange, PreciseMoney } from "../../components/FormattedTextElements";
import CoinPriceGraph from "../../components/organisms/PriceGraph";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { API, graphqlOperation } from 'aws-amplify';
// import { getCoin, listPortfolioCoins } from '../../src/graphql/queries';
// import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

import priceHistory from '../../../assets/dummyData/priceHistory';
import { userInfo } from '../../../assets/dummyData/userInfo';
import coinMarket from '../../../assets/dummyData/coinMarket';
import { coins } from '../../../assets/dummyData/coins';
import { portfolio } from '../../../assets/dummyData/portfolio';

const dummyCoins = coins;

const CoinDetailsScreen = () => {
  // const { theUser } = useContext(AuthenticatedUserContext)
  const [starActive, setStarActive] = useState(false)//todo replace with data
  // const [coin, setCoin] = useState(null)
  // const [portfolioCoin, setPortfolioCoin] = useState(null)

  const navigation = useNavigation();
  const route = useRoute();

  const [coin, setCoin] = useState({
    id: 'bitcoin',
    image: 'https://bitcoin.org/img/icons/opengraph.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    valueChange24H: -1.12,
    valueChange1H: 2.12,
    valueChange7D: -1.12,
    currentPrice: 59420,
    priceHistory: priceHistory
  })

  const [portfolioCoin, setPortfolioCoin] = useState({
    coin: {
      id: 'bitcoin',
      name: 'Bitcoin',
      image: 'https://bitcoin.org/img/icons/opengraph.png',
      symbol: 'BTC',
      currentPrice: 59420,
      priceHistory: priceHistory,
    },
    amount: 1.7,
  })

  const fetchCoinData = async () => {
    if (!route.params?.id) {
      return;
    }
    try {
      // const response = await API.graphql(graphqlOperation(getCoin, { id: route.params.id }))
      // setCoin(response.data.getCoin)
    } catch(error) {
      console.log('error2', error);
    }
  }

  const fetchPortfolioCoinData = async () => {
    if (!route.params?.id) {
      return;
    }
    try {
      // const response = await API.graphql(
      //   graphqlOperation(//seems fixed, now need to refresh component/update state, fix position display
      //     listPortfolioCoins, 
      //     { filter: {
      //       and: {
      //         coinId: { eq: route.params?.id},
      //         userId: { eq: theUser.id }
      //       }
      //     }}
      //   )
      // )
      // if (response.data.listPortfolioCoins.items.length > 0) {
      //   setPortfolioCoin(response.data.listPortfolioCoins.items[0])
      // }
      const routeId = route.params.id
      const dummyCoinIndex = Object.values(userInfo[0].portfolioCoins).filter(x => x.coin.id === routeId)
      setPortfolioCoin(dummyCoinIndex[0])
      setCoin(dummyCoinIndex[0].coin)
    } catch(error) {
      console.log('error3', error);
    }
  }
  

  useEffect(() => {
    fetchCoinData()
    fetchPortfolioCoinData()
    console.log('running a marathon');
  }, [])

  const onBuy = () => {
    navigation.navigate('CoinExchange', { isBuy: true, coin, portfolioCoin });
  }

  const onSell = () => {
    navigation.navigate('CoinExchange', { isBuy: false, coin, portfolioCoin });
  }

  const onStarPressed = () => {
    setStarActive(prevState => !prevState)
  }

  if (!coin) {
    return <ActivityIndicator />
  }

  return (
    <ElementView inverted style={styles.root}>
      <ElementView style={styles.topContainer}>
        <ElementView style={styles.left}>
          <Image style={styles.image} source={{ uri: coin.image}} />
          <ElementView>
            <Text style={styles.name}>{coin.name}</Text>
            <Text style={styles.symbol}>{coin.symbol}</Text>
          </ElementView>
        </ElementView>
        <ElementView style={{alignItems: 'flex-end'}}>
          <Pressable
            onPress={onStarPressed}
          >
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
            {portfolioCoin?.amount?.toLocaleString('en-US') || 0} {coin.symbol}
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
