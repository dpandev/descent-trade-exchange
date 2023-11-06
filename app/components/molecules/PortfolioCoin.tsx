import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ElementView, Text, ListItemButton } from '../../components/Themed';
import { TruncatedDecimal, PreciseMoney, abbreviateDecimal } from '../FormattedTextElements';
import { Coin } from '../../../src/API';
import { RootStackParamList } from '../../types';
const assetImg = require('../../../assets/images/default-coin.png');

const imgFallback = Image.resolveAssetSource(assetImg).uri;

export interface PortfolioCoinProps {
  portfolioCoin: {
    coin: Coin,
    amount: number,
  }
}

const PortfolioCoin = (props: PortfolioCoinProps): React.JSX.Element => {
  const {
    portfolioCoin: {
      amount,
      coin: {
        id,
        image,
        name,
        symbol,
        currentPrice,
      }
    },
  } = props;

  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <ListItemButton 
      buttonStyles={styles.root} 
      onPress={() => navigation.navigate('CoinDetails', { id })}
    >
      <ElementView style={styles.left}>
        <Image style={styles.image} source={{ uri: image || imgFallback }} />
        <ElementView>
          <Text style={styles.currency}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </ElementView>
      </ElementView>
      <ElementView style={styles.right}>
        <PreciseMoney 
          value={abbreviateDecimal(currentPrice * amount)} 
          style={styles.value} 
          isColored
        />
        <Text style={styles.symbol}>
          {symbol !== 'USDC'
            ? <TruncatedDecimal value={amount} fixed={5} />
            : <TruncatedDecimal value={amount} fixed={2} />
          }
          {' '}
          {symbol.toUpperCase()}
        </Text>
      </ElementView>
    </ListItemButton>
  );
};

export default memo(PortfolioCoin);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  symbol: {
    color: '#959595',
  },
  right: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
});

