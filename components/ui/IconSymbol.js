import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const IconSymbol = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

export default IconSymbol; 