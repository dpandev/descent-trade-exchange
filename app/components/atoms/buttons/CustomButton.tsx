import { Text, Pressable } from 'react-native';
import React, { Component, ReactNode } from 'react';
import { FontAwesome } from '@expo/vector-icons';

interface TheProps {
  onPress?: null | (() => void) | undefined;
  children: string | ReactNode;
  textStyles?: {};
  buttonStyles?: {};
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
  iconSize?: number;
  iconColor?: string;
}

export interface TheState {
  activeToggle: boolean;
}

class CustomButton extends Component<TheProps, TheState>{
  constructor(props: TheProps) {
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
        onPress={() => this.props.onPress?.()} 
        style={this.props.buttonStyles}
        onPressIn={() => this.onPush()}
        onPressOut={() => this.onPush()}
      >
        {(typeof this.props.children === 'string') 
          ? <Text style={this.props.textStyles}>{this.props.children}</Text> 
          : this.props.children
        }
        {this.props.icon &&
          <FontAwesome 
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