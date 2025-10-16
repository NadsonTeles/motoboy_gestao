import React from 'react';
import { View, StyleSheet } from 'react-native';

const TabBarBackground = () => {
    return <View style={styles.background} />;
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Example background color
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 60, // Example height
    },
});

export default TabBarBackground; 