import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ElementView, Text, ListItemButton } from '../Themed';
import { PercentageChange, TruncatedDecimal } from '../FormattedTextElements';
import { Coin } from '../../../src/API';
import { RootStackParamList } from '../../types';
import { TabEnum } from '../../screens/MarketScreen';
const assetImg = require('../../../assets/images/default-coin.png');

const imgFallback = Image.resolveAssetSource(assetImg).uri;

const MarketCoin = ({props, sorting}: {props: Coin, sorting: TabEnum}) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const {
    id,
    image,
    name,
    symbol,
    currentPrice,
    valueChange1H,
    valueChange24H,
  } = props;

  const onPressed = (): void => {
    navigation.navigate('CoinDetails', { id });
  }

  return (
    <ListItemButton buttonStyles={styles.root} onPress={onPressed}>
      <ElementView style={styles.left}>
        <Image style={styles.image} source={{ uri: image || imgFallback }} />
        <ElementView style={{ flexDirection: 'column', width: '100%' }}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode={'tail'}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </ElementView>
      </ElementView>
      <ElementView style={{flex: 1, alignItems: 'flex-end'}}>
        <TruncatedDecimal value={currentPrice} style={styles.value} isMoney={true} />
        <PercentageChange 
          value={
            sorting === '% Day'
              ? valueChange24H
              : valueChange1H
          } 
        />
      </ElementView>
    </ListItemButton>
  );
}

export default memo(MarketCoin);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
