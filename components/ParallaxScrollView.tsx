import React, { ReactNode } from 'react';
import { ScrollView, Animated, ViewStyle, StyleSheet, View } from 'react-native';

interface ParallaxScrollViewProps {
  children: ReactNode;
  style?: ViewStyle;
  headerHeight?: number;
  renderHeader?: () => ReactNode;
}

const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
  children,
  style,
  headerHeight = 300,
  renderHeader
}) => {
  const scrollY = new Animated.Value(0);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, style]}>
      {renderHeader && (
        <Animated.View
          style={[
            styles.header,
            { height: headerHeight },
            { transform: [{ translateY: headerTranslate }] }
          ]}>
          {renderHeader()}
        </Animated.View>
      )}
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
});

export default ParallaxScrollView; 