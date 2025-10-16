import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';

const HapticTab = (props: BottomTabBarButtonProps) => {
    const { children, onPress } = props;

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        if (onPress) {
            onPress();
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            style={[styles.tab, props.style]}>
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HapticTab; 