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
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AmplifyGraphQLResult, RootStackParamList, RootTabParamList } from '../../types';
import { getPortfolioCoin } from '../../../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { useAuthContext } from '../../utils/AuthContext';
import { GetPortfolioCoinQuery, PortfolioCoin } from '../../../src/API';
import { exchangeCoins, exchangeCoinsNew } from './mutations';

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
          { id: `${user.id}-usd-coin` }
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
    setCoinAmount((portfolioCoin?.amount).toString());
  }

  const onBuyAll = (): void => {
    setCoinUSDValue((usdPortfolioCoin?.amount || 0).toString());
  }

  const placeOrder = async (): Promise<void> => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    let variables = {
      inputOne: {//update existing coin portfolioCoin
        id: `${user.id}-${coin.id}`,
        amount: ( isBuy ? portfolioCoin?.amount + parseFloat(coinAmount) : portfolioCoin?.amount - parseFloat(coinAmount) ),
        coinId: coin.id,
        userID: user.id,
      },
      inputTwo: {//create a trade item
        amount: parseFloat(coinAmount),
        coinId: coin.id,
        coinSymbol: coin.symbol,
        date: new Date().toISOString(),
        image: coin.image,
        price: coin.currentPrice,
        userID: user.id,
      },
      inputThree: {//update existing usd portfolioCoin
        id: `${user.id}-usd-coin`,
        amount: (usdPortfolioCoin.amount - parseFloat(coinUSDValue)),
        coinId: 'usd-coin',
      },
    }
    try {
      if (portfolioCoin) {
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
      } else {
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
      Alert.alert('Oops!', `Not enough ${coin.symbol} coins. Max: ${portfolioCoin.amount || 0}`);
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
    setCoinUSDValue((amount * coin?.currentPrice).toString());
  }, [coinAmount]);

  useEffect(() => {
    const amount = parseFloat(coinUSDValue);
    if (!amount && amount !== 0) {
      setCoinAmount('');
      setCoinUSDValue('');
      return;
    }
    setCoinAmount((amount / coin?.currentPrice).toString());
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
              placeholder={`0 ${coin?.symbol}`}
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
              placeholder={`0 usd`}
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
