import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface ThemedTextProps {
  children: ReactNode;
  style?: TextStyle;
}

const ThemedText: React.FC<ThemedTextProps> = ({ children, style }) => {
  const colorScheme = useColorScheme();

  return (
    <Text
      style={[
        { color: Colors[colorScheme ?? 'light'].text },
        style
      ]}>
      {children}
    </Text>
  );
};

export default ThemedText; 