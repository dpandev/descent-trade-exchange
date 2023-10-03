import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ElementView, Text, ListItemButton } from '../Themed';
import { PercentageChange, TruncatedDecimal } from '../FormattedTextElements';
import { Coin } from '../../../src/API';
const assetImg = require('../../../assets/images/dgb.png');

const profileImgFallback = Image.resolveAssetSource(assetImg).uri;

export default function MarketCoin ({props}: {props: Coin}) {
  const navigation = useNavigation();

  const {
    id,
    image,
    name,
    symbol,
    currentPrice,
    valueChange24H,
  } = props;

  const onPressed = () => {
    navigation.navigate('CoinDetails', { id });
  }

  return (
    <ListItemButton 
      buttonStyles={styles.root} 
      onPress={onPressed}
    >
      <ElementView style={styles.left}>
        <Image style={styles.image} source={{ uri: image! }} />
        <ElementView>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </ElementView>
      </ElementView>
      <ElementView style={{alignItems: 'flex-end'}}>
        <TruncatedDecimal value={currentPrice} style={styles.value} isMoney={true} />
        <PercentageChange value={valueChange24H} />
      </ElementView>
    </ListItemButton>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  symbol: {
    color: '#959595',
  },
});
