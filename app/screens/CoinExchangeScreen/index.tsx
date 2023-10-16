import React, { useEffect, useState } from 'react';
import {
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import styles from './styles';
import { 
  ElementView, 
  RoundedButton, 
  KeyboardAvoidingView, 
  Text 
} from '../../components/Themed';
import { PreciseMoney } from '../../components/FormattedTextElements';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AmplifyGraphQLResult, RootStackParamList, RootTabParamList } from '../../types';
import { getPortfolioCoin } from '../../../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { useAuthContext } from '../../utils/AuthContext';
import { GetPortfolioCoinQuery, PortfolioCoin } from '../../../src/API';
import { exchangeCoins, exchangeCoinsNew } from './mutations';
import { Octicons } from '@expo/vector-icons';

const CoinExchangeScreen = () => {

  const [coinAmount, setCoinAmount] = useState<string>('');
  const [coinUSDValue, setCoinUSDValue] = useState<string>('');
  const [usdPortfolioCoin, setUsdPortfolioCoin] = useState<PortfolioCoin>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();
  const navigation: NavigationProp<RootTabParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'CoinExchange'> = useRoute();

  const isBuy = route.params.isBuy;
  const coin = route.params.coin;
  const portfolioCoin = route.params.portfolioCoin;

  const getUSDPortfolioCoin = async (): Promise<void> => {
    try {
      const response = await API.graphql<AmplifyGraphQLResult<typeof getPortfolioCoin>>(
        graphqlOperation(
          getPortfolioCoin,
          { id: `${user?.id}-usd-coin` }
        ),
      ) as { data: GetPortfolioCoinQuery };
      if (response.data.getPortfolioCoin) {
        const usdPortfolioCoin: PortfolioCoin = response.data.getPortfolioCoin as PortfolioCoin;
        setUsdPortfolioCoin(usdPortfolioCoin);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const onSellAll = (): void => {
    if (!portfolioCoin) return;
    setCoinAmount(Math.floor(portfolioCoin.amount).toString());
  }

  const onBuyAll = (): void => {
    if (!usdPortfolioCoin) return;
    setCoinUSDValue(Math.floor(usdPortfolioCoin.amount || 0).toString());
  }

  const placeOrder = async (): Promise<void> => {
    if (isLoading || !user || !usdPortfolioCoin) {
      return;
    }
    setIsLoading(true);
    const date = new Date();
    const expiryDate = Date.now() / 1000;
    let variables = {
      inputOne: {//update existing coin portfolioCoin
        id: `${user.id}-${coin.id}`,
        amount: 0,
        coinId: coin.id,
        userID: user.id,
      },
      inputTwo: {//create a trade item
        amount: isBuy ? parseFloat(coinAmount) : -Math.abs(parseFloat(coinAmount)),
        coinId: coin.id,
        coinSymbol: coin.symbol,
        date: date.toISOString(),
        image: coin.image,
        price: coin.currentPrice,
        userID: user.id,
        expires_at: expiryDate + (7 * 24 * 60 * 60),
      },
      inputThree: {//update existing usd portfolioCoin
        id: `${user.id}-usd-coin`,
        amount: (usdPortfolioCoin.amount - parseFloat(coinUSDValue)),
        coinId: 'usd-coin',
      },
    }
    try {
      if (portfolioCoin) {
        variables.inputOne.amount = ( isBuy ? portfolioCoin?.amount + parseFloat(coinAmount) : portfolioCoin?.amount - parseFloat(coinAmount) );
        if (isBuy) {
          await API.graphql<AmplifyGraphQLResult<typeof exchangeCoins>>(
            graphqlOperation(exchangeCoins, variables)
          ) as { data: any };
        } else {
          //  sell calculations - adjust vars here
          variables.inputOne.amount = (portfolioCoin.amount - parseFloat(coinAmount));
          variables.inputThree.amount = (usdPortfolioCoin.amount + parseFloat(coinUSDValue));
          await API.graphql<AmplifyGraphQLResult<typeof exchangeCoins>>(
            graphqlOperation(exchangeCoins, variables)
          ) as { data: any };
        }
      } else {  //if user does not have this portfolioCoin (first time trading this)
        variables.inputOne.amount = parseFloat(coinAmount);
        await API.graphql<AmplifyGraphQLResult<typeof exchangeCoinsNew>>(
          graphqlOperation(exchangeCoinsNew, variables)
        ) as { data: any };
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigation.navigate('TabTwo');
    }
  }

  const onPlaceOrder = async (): Promise<void> => {
    if (!coinAmount || !coinUSDValue) return;
    const maxUsd = usdPortfolioCoin?.amount || 0;
    if (isBuy && parseFloat(coinUSDValue) > maxUsd) {
      Alert.alert('Oops!', `Not enough USD coins. Max: ${maxUsd}`);
      return;
    }
    if (!isBuy && (!portfolioCoin || parseFloat(coinAmount) > portfolioCoin.amount)) {
      Alert.alert('Oops!', `Not enough ${coin.symbol} coins. Max: ${portfolioCoin?.amount || 0}`);
      return;
    }

    await placeOrder();
  }

  useEffect(() => {
    getUSDPortfolioCoin();
  }, []);

  useEffect(() => {
    const amount = parseFloat(coinAmount);
    if (!amount && amount !== 0) {
      setCoinAmount('');
      setCoinUSDValue('');
      return;
    }
    setCoinUSDValue((amount * coin.currentPrice).toString());
  }, [coinAmount]);

  useEffect(() => {
    const amount = parseFloat(coinUSDValue);
    if (!amount && amount !== 0) {
      setCoinAmount('');
      setCoinUSDValue('');
      return;
    }
    setCoinAmount((amount / coin.currentPrice).toString());
  }, [coinUSDValue]);


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <Text style={styles.title}>
          {isBuy ? 'Buy ' : "Sell "}
          {coin.name}
        </Text>
        <Text style={styles.subtitle}>
          1 {coin?.symbol.toUpperCase()}
          {' = '}
          <PreciseMoney value={coin?.currentPrice} />
        </Text>

        <ElementView style={styles.col}>
          <Text style={{fontWeight: 'bold'}}>{coin.symbol.toUpperCase()}</Text>
          <ElementView style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder={`0 ${coin.symbol.toUpperCase()}`}
              placeholderTextColor={'#b1b1b1'}
              value={coinAmount}
              onChangeText={setCoinAmount}
            />
            <Pressable style={{ padding: 5 }} onPress={isBuy ? onBuyAll : onSellAll}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#8F43EE' }}>MAX</Text>
            </Pressable>
          </ElementView>
          <Octicons name="arrow-switch" size={36} color="white" />

          <ElementView style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              placeholder={`0 USDC`}
              placeholderTextColor={'#b1b1b1'}
              value={coinUSDValue}
              onChangeText={setCoinUSDValue}
            />
            <Pressable style={{ padding: 5 }} onPress={isBuy ? onBuyAll : onSellAll}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#8F43EE' }}>MAX</Text>
            </Pressable>
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
