import React from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HelloWaveProps {
  style?: ViewStyle;
  size?: number;
  color?: string;
}

const HelloWave = ({ style, size = 24, color = '#000' }: HelloWaveProps) => {
  const rotateAnim = new Animated.Value(0);

  React.useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(animate, 2000);
      });
    };

    animate();

    return () => {
      rotateAnim.setValue(0);
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '30deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [{ rotate: spin }],
        },
      ]}>
      <MaterialCommunityIcons name="hand-wave" size={size} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HelloWave; 