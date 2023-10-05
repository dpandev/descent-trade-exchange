import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ElementView, Text, ListItemButton } from '../../components/Themed';
import { TruncatedDecimal, PreciseMoney } from '../FormattedTextElements';
import { Coin } from '../../../src/API';

export interface PortfolioCoinProps {
  portfolioCoin: {
    coin: Coin,
    amount: number,
  }
}

export default function PortfolioCoin (props: PortfolioCoinProps) {
  const {
    portfolioCoin: {
      amount,
      coin: {
        id,
        image,
        name,
        symbol,
        currentPrice,
        priceHistory,
      }
    },
  } = props;

  const navigation = useNavigation();

  return (
    <ListItemButton 
      buttonStyles={styles.root} 
      onPress={() => navigation.navigate('CoinDetails', { id })}
    >
      <ElementView style={styles.left}>
        <Image style={styles.image} source={{ uri: image! }} />
        <ElementView>
          <Text style={styles.currency}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </ElementView>
      </ElementView>
      <ElementView style={styles.right}>
        <PreciseMoney 
          value={currentPrice * amount} 
          style={styles.value} 
          isColored
        />
        <Text style={styles.symbol}>
          {symbol != 'USD'
            ? <TruncatedDecimal value={amount} />
            : <TruncatedDecimal value={amount} fixed={2} />
          }
          {' '}
          {symbol.toUpperCase()}
        </Text>
      </ElementView>
    </ListItemButton>
  );
};

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
    borderRadius: 6,
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

