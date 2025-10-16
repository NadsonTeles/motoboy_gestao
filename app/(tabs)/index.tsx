import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

export default function DashboardScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.cardsContainer}>
        <ThemedView style={styles.card}>
          <MaterialCommunityIcons name="cash" size={32} color="#4CAF50" />
          <ThemedText style={styles.cardValue}>R$ 1.250,00</ThemedText>
          <ThemedText style={styles.cardLabel}>Ganhos do Mês</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <MaterialCommunityIcons name="gas-station" size={32} color="#F44336" />
          <ThemedText style={styles.cardValue}>R$ 350,00</ThemedText>
          <ThemedText style={styles.cardLabel}>Gastos com Combustível</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <MaterialCommunityIcons name="bike" size={32} color="#2196F3" />
          <ThemedText style={styles.cardValue}>150 km</ThemedText>
          <ThemedText style={styles.cardLabel}>Distância Percorrida</ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <MaterialCommunityIcons name="package-variant" size={32} color="#FF9800" />
          <ThemedText style={styles.cardValue}>45</ThemedText>
          <ThemedText style={styles.cardLabel}>Entregas Realizadas</ThemedText>
        </ThemedView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardLabel: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
});
