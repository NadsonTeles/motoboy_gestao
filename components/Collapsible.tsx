import React, { useState, ReactNode } from 'react';
import { View, TouchableOpacity, LayoutAnimation, Platform, UIManager, ViewStyle } from 'react-native';

// Habilitar LayoutAnimation no Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface CollapsibleProps {
  children: ReactNode;
  trigger: ReactNode;
  style?: ViewStyle;
}

const Collapsible: React.FC<CollapsibleProps> = ({ children, trigger, style }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={toggleCollapse}>
        {trigger}
      </TouchableOpacity>
      {!isCollapsed && (
        <View>
          {children}
        </View>
      )}
    </View>
  );
};

export default Collapsible; 