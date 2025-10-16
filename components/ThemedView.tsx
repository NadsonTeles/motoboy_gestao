import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface ThemedViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const ThemedView: React.FC<ThemedViewProps> = ({ children, style }) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        { backgroundColor: Colors[colorScheme ?? 'light'].background },
        style
      ]}>
      {children}
    </View>
  );
};

export default ThemedView; 