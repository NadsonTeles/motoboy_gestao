import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

interface ExternalLinkProps extends Omit<TouchableOpacityProps, 'onPress'> {
  href: string;
  children: ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children, ...props }) => {
  const handlePress = () => {
    WebBrowser.openBrowserAsync(href);
  };

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default ExternalLink; 