import React, { useEffect, useState } from 'react';
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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
// import { listPortfolioCoins } from '../../src/graphql/queries';
// import { exchangeCoins } from './mutations';
// import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

import { userInfo } from '../../../assets/dummyData/userInfo';
import { getUser } from '../../../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { PortfolioCoinProps } from '../../components/molecules/PortfolioCoin';
import { useAuthContext } from '../../utils/AuthContext';
import { PortfolioCoin } from '../../../src/API';

const CoinExchangeScreen = () => {

  const [coinAmount, setCoinAmount] = useState<number>();
  const [coinUSDValue, setCoinUSDValue] = useState<number>();
  const [usdPortfolioCoin, setUsdPortfolioCoin] = useState<PortfolioCoin>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useAuthContext();

  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'CoinExchange'>>();

  const isBuy = route.params?.isBuy;
  const coin = route.params?.coin;
  const portfolioCoin = route.params?.portfolioCoin;

  const getUSDPortfolioCoin = async () => {
    if (!user) return;
    try {
      const response = await API.graphql(
        graphqlOperation(
          getUser,
          { id: user.id }
        ),
      );
      const userPortfolio: PortfolioCoin[] = response.data.getUser.portfolio.items;
      const usdPortfolioCoin: PortfolioCoin | undefined = userPortfolio.find(x => x.coinId === 'usd-coin');
      if (usdPortfolioCoin) {
        setUsdPortfolioCoin(usdPortfolioCoin);
      }
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUSDPortfolioCoin();
  }, []);

  useEffect(() => {
    const amount = coinAmount;
    if (!amount && amount !== 0) {
      setCoinAmount(0);
      setCoinUSDValue(0);
      return;
    }
    setCoinUSDValue(amount * coin?.currentPrice);
  }, [coinAmount]);

  useEffect(() => {
    const amount = coinUSDValue;
    if (!amount && amount !== 0) {
      setCoinAmount(0);
      setCoinUSDValue(0);
      return;
    }
    setCoinAmount(amount / coin?.currentPrice);
  }, [coinUSDValue]);

  const onSellAll = () => {
    setCoinAmount(portfolioCoin.amount);
  }

  const onBuyAll = () => {
    setCoinUSDValue(usdPortfolioCoin?.amount || 0);
  }

  const placeOrder = async () => {
    if (!user) return;
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const variables = {
        coinId: coin.id,
        isBuy,
        amount: coinAmount,
        usdPortfolioCoinId: usdPortfolioCoin?.id,
        coinPortfolioCoinId: portfolioCoin?.id,
        userId: user.id
      }

      const response = await API.graphql(
        graphqlOperation(exchangeCoins, variables)
      )
      if (response.data.exchangeCoins) {
        navigation.navigate('TabTwo');
      } else {
        Alert.alert('Error', 'There was an error exchanging coins');
      }
    } catch (e) {
      Alert.alert('Error', 'There was an error exchanging coins');
      console.error(e);
    }
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
