import { StyleSheet, TextInput, View, Text, KeyboardTypeOptions, StyleProp, TextStyle, ColorValue } from 'react-native';
import React, { Component } from 'react';
// import useColorScheme from '../../../hooks/useColorScheme';

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
  inputStyles?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
  keyboardAppearance?: "default" | "light" | "dark";
  label?: string;
  labelStyles?: StyleProp<TextStyle>;
  componentStyles?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export default class LabelledTextInput extends Component<TheProps>{
  // let colorScheme = useColorScheme();

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
          maxLength={this.props.maxLength || 30}
          textContentType={this.props.textContentType || 'none'}
          style={this.props.inputStyles}
          placeholder={this.props.placeholder || ''}
          placeholderTextColor={this.props.placeholderTextColor || 'black'}
          secureTextEntry={this.props.secureTextEntry || false}
          selectionColor={this.props.selectionColor || 'white'}
          autoCorrect={this.props.autoCorrect || false}
          autoCapitalize={'none'}
          keyboardType={this.props.keyboardType || 'default'}
          keyboardAppearance={this.props.keyboardAppearance || 'default'}
          editable={this.props.disabled || true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
    borderBottomWidth: 1,
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  placeholderText: {},
  label: {
    color: '#C9CDD2',
    fontSize: 18,
    marginBottom: 5,
  },
});