import { Text, Pressable, PressableProps, ColorValue } from 'react-native';
import React, { Component, ReactNode } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export interface CustomButtonProps extends PressableProps {
  children?: string | ReactNode;
  textStyles?: {};
  buttonStyles?: {};
  icon?: React.ComponentProps<typeof FontAwesome5>['name'];
  iconSize?: number;
  iconColor?: ColorValue;
}

export interface TheState {
  activeToggle: boolean;
}

class CustomButton extends Component<CustomButtonProps, TheState>{
  constructor(props: CustomButtonProps) {
    super(props);

    this.state = {
      activeToggle: false,
    };

    this.onPush = this.onPush.bind(this);
  }

  onPush() {
    this.setState((prevState, props) => ({
      activeToggle: !prevState.activeToggle,
    }));
  }

  render() {
    return (
      <Pressable 
        onPress={this.props.onPress} 
        style={this.props.buttonStyles}
        onPressIn={() => this.onPush()}
        onPressOut={() => this.onPush()}
      >
        {this.props.children && (typeof this.props.children === 'string') 
          ? <Text style={this.props.textStyles}>{this.props.children}</Text> 
          : this.props.children
        }
        {this.props.icon &&
          <FontAwesome5 
            name={this.props.icon} 
            size={this.props.iconSize} 
            color={this.props.iconColor}
          />
        }
      </Pressable>
    );
  }
}

export default CustomButton;