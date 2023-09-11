import { StyleSheet, TextInput, View, Text, KeyboardTypeOptions, StyleProp, TextStyle, ColorValue } from 'react-native'
import React, { Component } from 'react'

interface TheProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmitEditing: (nativeEvent: any) => void;
  placeholder?: string;
  textContentType?: any;
  maxLength?: number;
  autoCorrect?: boolean;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  selectionColor?: ColorValue;
  inputStyles?: {};
  keyboardType?: KeyboardTypeOptions;
  keyboardAppearance?: "default" | "light" | "dark";
  label?: string;
  labelStyles?: {};
  componentStyles?: {};
}

export default class LabelledTextInput extends Component<TheProps>{
  render() {
    return (
      <View style={[styles.root, this.props.componentStyles]}>
        {this.props.label &&
          <Text style={[styles.label, this.props.labelStyles]}>
            {this.props.label}
          </Text>
        }
        <TextInput 
          onSubmitEditing={this.props.onSubmitEditing}
          value={this.props.value}
          onChangeText={this.props.setValue}
          maxLength={this.props.maxLength ? this.props.maxLength : 30}
          textContentType={this.props.textContentType ? this.props.textContentType : 'none'}
          style={[styles.input, this.props.inputStyles]}
          placeholder={this.props?.placeholder || ''}
          placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor : '#90A3B9'}
          secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
          selectionColor={this.props.selectionColor ? this.props.selectionColor : 'white'}
          autoCorrect={this.props.autoCorrect ? this.props.autoCorrect : false}
          autoCapitalize={'none'}
          keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
          keyboardAppearance={this.props.keyboardAppearance ? this.props.keyboardAppearance : 'default'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
    width: '95%',
    maxWidth: 400,
    borderWidth: 1,
    borderBottomColor: '#90A3B9',
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  input: {
    color: 'white',
    fontSize: 18,
  },
  placeholderText: {},
  label: {
    color: '#C9CDD2',
    fontSize: 18,
    marginBottom: 5,
  },
})