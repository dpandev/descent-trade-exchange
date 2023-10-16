import React from 'react'
import { Text } from './Themed'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'

interface NumberProps {
  value: number;
  isMoney?: boolean;
  isColored?: boolean;
  fixed?: number;
  style?: StyleProp<TextStyle>;
}

interface DateProps {
  value: string | number;
  style?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
  green: {
    color: '#44f153',
  },
  red: {
    color: '#ff5358',
  },
});

function shortenDate(value: string): string {
  const dateValue = new Date(value)
  return dateValue.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function abbreviateNumber(num: any, fixed: number): string {
  if (num === null) { return 'NaN' }
  if (num === 0) { return '0' }
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return d;
}

export function getNumberOfZerosInDecimal(num: number): number {
  if (num > 0 && num < 1.0) {
    let c = 0;
    while (!~~num) {
      c++;
      num *= 10;
    }
    return c - 1;
  } else {
    return 1;
  }
}

export function abbreviateDecimal(num: number, fixed?: number): number {
  const x = fixed || getNumberOfZerosInDecimal(num) + 2;
  return parseFloat(num.toFixed(x));
}

export function AbbreviateNum({ value, style = {} }: NumberProps): React.JSX.Element {
  return (
    <Text style={[style, (value > 0 ? styles.green : styles.red)]}>
      {abbreviateNumber(value, 0)}
    </Text>
  );
}

export function Networth({ value, style = {} }: NumberProps): React.JSX.Element {
  return (
    <Text style={[style, value > 0 ? styles.green : styles.red]}>
      {value >= 0 ? '$' : '-$'}
      {abbreviateNumber(value, 0)}
    </Text>
  );
}

export function PercentageChange({ value, style = {} }: NumberProps): React.JSX.Element {
  return (
    <Text style={[style, value > 0 ? styles.green : styles.red, {fontWeight: 'bold'}]}>
      {value >= 0 && '+'}{value.toFixed(3)}{'%'}
    </Text>
  );
}

export function PreciseMoney({ value, style = {}, isColored }: NumberProps): React.JSX.Element {
  const redGreenExp = value >= 0 ? styles.green : styles.red;
  return (
    <Text style={[isColored ? redGreenExp : {}, style]}>
      {value >= 0 ? '$' : '-$'}
      {Math.abs(value).toLocaleString('en-US', { maximumSignificantDigits: 7 })}
    </Text>
  );
}

export function ShortDate({ value, style = {} }: DateProps): React.JSX.Element {
  return (
    <Text style={[styles.green, style]}>
      {shortenDate(value.toString())}
    </Text>
  );
}

export function DateAndTime({ value, style = {} }: DateProps): React.JSX.Element {
  const date: Date = new Date(value);
  let hours: number = date.getHours();
  let minutes: number | string = date.getMinutes();
  let ampm: string = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;//the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime: string = hours + ':' + minutes + ' ' + ampm;
  let fulldate: string = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear().toString().substring(2);
  return (
    <Text style={[{textAlign: 'right'}, styles.green, style]}>
      {fulldate}{'\n'}
      {strTime}
    </Text>
  );
}

export function DaysAgo({ value, style = {} }: DateProps): React.JSX.Element {
  const oldDate: any = new Date(value);
  const now: any = new Date();
  oldDate.setDate(oldDate.getDate());
  const difference: number = Math.round((now - oldDate)/(1000*60*60*24));
  return (
    <Text style={style}>
      {difference < 1
        ? 'Today'
        : difference + 'd ago'
      }
    </Text>
  );
}

export function TruncatedDecimal({ value, style = {}, isMoney, isColored, fixed }: NumberProps): React.JSX.Element {
  const newValue = abbreviateDecimal(value, fixed);
  const moneyExp = newValue >= 0 ? '$' : '-$';
  const redGreenExp = newValue >= 0 ? styles.green : styles.red;
  return (
    <Text style={[isColored ? redGreenExp : {}, style]}>
      {isMoney ? moneyExp : ''}
      {newValue.toLocaleString('en-US', { maximumSignificantDigits: 7 })}
    </Text>
  );
}