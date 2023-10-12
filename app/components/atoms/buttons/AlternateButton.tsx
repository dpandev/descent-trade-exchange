import { ColorValue, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

export interface AlternateButtonIconProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  size?: number;
  color?: ColorValue;
  inactiveColor?: ColorValue;
}

export interface AlternateButtonProps extends PressableProps {
  icon?: AlternateButtonIconProps;
  activeStyle?: StyleProp<ViewStyle>;
  inactiveStyle?: StyleProp<ViewStyle>;
}

export const AlternateButton = (props: AlternateButtonProps): React.JSX.Element => {
  const [activeTouch, setActiveTouch] = useState<boolean>(false);

  const onPush = (): void => {
    setActiveTouch(prevState => !activeTouch);
  }

  return (
    <Pressable 
      onPress={props.onPress} 
      onPressIn={onPush}
      onPressOut={onPush}
      style={
        props.activeStyle && props.inactiveStyle
        ? (activeTouch ? props.activeStyle : props.inactiveStyle)
        : (props.style || {})
      }
      {...props}
    >
      <>
        {props.children}
        {props.icon?.name &&
          <FontAwesome 
            name={props.icon.name} 
            size={props.icon.size} 
            color={(activeTouch ? props.icon.color : props.icon.inactiveColor || props.icon.color) || 'white'}
          />
        }
      </>
    </Pressable>
  );
}

export default AlternateButton;