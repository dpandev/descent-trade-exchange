import React, {useEffect, useState, useContext} from 'react';
import {
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './styles';
import { 
  ElementView, 
  RoundedButton, 
  KeyboardAvoidingView, 
  Text 
} from '../../components/Themed';
import { PreciseMoney } from '../../components/FormattedTextElements';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { API, graphqlOperation } from 'aws-amplify';
// import { listPortfolioCoins } from '../../src/graphql/queries';
// import { exchangeCoins } from './mutations';
// import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

import { userInfo } from '../../../assets/dummyData/userInfo';

const USD_COIN_ID = 'usd';//TODO remove

export type PortfolioCoin = {
  // id: string;
  amount: number;
  // coinId: string;
  coin: {}; //temp for dummy data
}

const CoinExchangeScreen = () => {

  const [coinAmount, setCoinAmount] = useState<string>('')
  const [coinUSDValue, setCoinUSDValue] = useState<string>('')
  // const [usdPortfolioCoin, setUsdPortfolioCoin] = useState(null);
  const [usdPortfolioCoin, setUsdPortfolioCoin] = useState<PortfolioCoin>(userInfo[0].portfolioCoins[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const { theUser } = useContext(AuthenticatedUserContext)
  // const userId = theUser.id

  const navigation = useNavigation();
  const route = useRoute();

  const isBuy = route?.params?.isBuy;
  const coin = route?.params?.coin;
  const portfolioCoin = route?.params?.portfolioCoin;

  const getUSDPortfolioCoin = async () => {
    try {
      // const response = await API.graphql(
      //   graphqlOperation(listPortfolioCoins,
      //     { filter: {
      //         and: {
      //           coinId: { eq: USD_COIN_ID },
      //           userId: { eq: userId }
      //         }
      //       }
      //     }
      //   )
      // )
      // if (response.data.listPortfolioCoins.items.length > 0) {
      //   setUsdPortfolioCoin(response.data.listPortfolioCoins.items[0]);
      // }
      const dummyCoin = userInfo[0].portfolioCoins[0]
      setUsdPortfolioCoin(dummyCoin)
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUSDPortfolioCoin();
  }, [])

  useEffect(() => {
    const amount = parseFloat(coinAmount)
    if (!amount && amount !== 0) {
      setCoinAmount("");
      setCoinUSDValue("");
      return;
    }
    setCoinUSDValue((amount * coin?.currentPrice).toString());
  }, [coinAmount]);

  useEffect(() => {
    const amount = parseFloat(coinUSDValue)
    if (!amount && amount !== 0) {
      setCoinAmount("");
      setCoinUSDValue("");
      return;
    }
    setCoinAmount((amount / coin?.currentPrice).toString());
  }, [coinUSDValue]);

  const onSellAll = () => {
    // setCoinAmount(portfolioCoin.amount);
  }

  const onBuyAll = () => {
    // setCoinUSDValue(usdPortfolioCoin?.amount || 0);
  }

  const placeOrder = async () => {
    if (isLoading) {
      return;
    }
    // setIsLoading(true);
    // try {
    //   const variables = {
    //     coinId: coin.id,
    //     isBuy,
    //     amount: parseFloat(coinAmount),
    //     usdPortfolioCoinId: usdPortfolioCoin?.id,
    //     coinPortfolioCoinId: portfolioCoin?.id,
    //     userId: userId
    //   }

    //   const response = await API.graphql(
    //     graphqlOperation(exchangeCoins, variables)
    //   )
    //   if (response.data.exchangeCoins) {
    //     navigation.navigate('TabTwo');
    //   } else {
    //     Alert.alert('Error', 'There was an error exchanging coins');
    //   }
    // } catch (e) {
    //   Alert.alert('Error', 'There was an error exchanging coins');
    //   console.error(e);
    // }
    navigation.navigate('TabTwo');
    setIsLoading(false);
  }

  const onPlaceOrder = async () => {
    const maxUsd = usdPortfolioCoin?.amount || 0;
    if (isBuy && parseFloat(coinUSDValue) > maxUsd) {
      Alert.alert('Oops!', `Not enough USD coins. Max: ${maxUsd}`);
      return;
    }
    if (!isBuy && (!portfolioCoin || parseFloat(coinAmount) > portfolioCoin.amount)) {
      Alert.alert('Oops!', `Not enough ${coin.symbol} coins. Max: ${portfolioCoin.amount || 0}`);
      return;
    }

    await placeOrder();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <Text style={styles.title}>
          {isBuy ? 'Buy ' : "Sell "}
          {coin?.name}
        </Text>
        <Text style={styles.subtitle}>
          1 {coin?.symbol}
          {' = '}
          <PreciseMoney value={coin?.currentPrice} />
        </Text>

        <ElementView style={styles.inputsContainer}>
          <Text style={{fontWeight: 'bold'}}>{coin?.symbol}</Text>
          <ElementView style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={'#b1b1b1'}
              value={coinAmount}
              onChangeText={setCoinAmount}
            />
          </ElementView>
          <Text style={{fontSize: 30}}>=</Text>

          <ElementView style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={'#b1b1b1'}
              value={coinUSDValue}
              onChangeText={setCoinUSDValue}
            />
          </ElementView>
          <Text style={{fontWeight: 'bold'}}>USD</Text>
        </ElementView>

        <RoundedButton
          inverted
          onPress={onPlaceOrder}
          textStyles={styles.buttonText}
          buttonStyles={styles.button}
        >
          Place Order
        </RoundedButton>
        {isLoading && <ActivityIndicator color={'white'} />}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CoinExchangeScreen;
