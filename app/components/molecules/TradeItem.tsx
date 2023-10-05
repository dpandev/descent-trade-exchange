import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { Text, ElementView, ListItemButton } from '../Themed';
import { AbbreviateNum, DateAndTime, PreciseMoney } from '../FormattedTextElements';
import { Octicons } from '@expo/vector-icons';
import { Trade } from '../../../src/API';
const assetImg = require('../../../assets/images/dgb.png');

const imgFallback = Image.resolveAssetSource(assetImg).uri;

export default function TradeItem({
  props
}: {
  props: Trade
}) {
  if (!props) {
    return <Text style={styles.currencyText}>Error displaying trade</Text>;
  }
  return (
    <ListItemButton
      buttonStyles={styles.root}
    >
      <ElementView style={styles.left}>
        <Image style={styles.image} source={{ uri: props.image || imgFallback }}></Image>
      </ElementView>
      <ElementView style={styles.middle}>
        <ElementView style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.currencyText}>USD{' '}</Text>
          <Octicons name="arrow-switch" size={16} color="white" />
          <Text style={styles.currencyText}>{' '}{props.coinSymbol.toUpperCase()}</Text>
        </ElementView>
        <ElementView style={styles.tradeInfo}>
          <Text>Shares: </Text>
          <AbbreviateNum value={props.amount} />
        </ElementView>
        <ElementView style={styles.tradeInfo}>
          <Text>Price: </Text>
          <PreciseMoney value={props.price} isColored />
        </ElementView>
      </ElementView>
      <ElementView style={styles.right}>
        <DateAndTime value={props.date} />
      </ElementView>
    </ListItemButton>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1.25,
    alignItems: 'flex-start',
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 6,
  },
  middle: {
    flex: 2,
    flexDirection: 'column',
    height: '100%',
  },
  right: {
    flex: 1.25,
    alignItems: 'flex-end',
    height: '100%',
  },
  tradeInfo: {
    flexDirection: 'row',
  },
  currencyText: {
    fontWeight: 'bold', 
    fontSize: 16,
  },
});