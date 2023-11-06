import { View, Text, StyleSheet, TextInput, TextInputProps, TextProps, ViewProps } from 'react-native';
import React from 'react';

export interface LabeledInputProps extends TextInputProps{
  label?: TextProps['children'];
  labelStyle?: TextProps['style'];
  viewStyle?: ViewProps['style'];
}

const LabeledInput = (props: LabeledInputProps): React.JSX.Element => {
  return (
    <View style={[styles.root, props.viewStyle]}>
      {props.label &&
        <Text style={[styles.label, props.labelStyle]}>
          {props.label}
        </Text>
      }
      <TextInput 
        value={props.value}
        style={[styles.input, props.style]}
        autoCapitalize={'none'}
        selectionColor={props.selectionColor || styles.label.color}
        {...props}
      />
    </View>
  );
}

export default LabeledInput;

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: '#D1D1D1',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#71459B',
  },
  input: {
    color: 'white', 
    fontSize: 18,
  },
});