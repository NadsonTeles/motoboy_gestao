import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

export default function ReportsScreen() {
  // Dados de exemplo
  const monthlyData = {
    earnings: 3750.00,
    expenses: 1050.00,
    kilometers: 450,
    deliveries: 135,
    averagePerDelivery: 27.78,
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.subtitle}>Março 2024</ThemedText>

        <View style={styles.summaryContainer}>
          <ThemedView style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <MaterialCommunityIcons name="cash-plus" size={24} color="#4CAF50" />
              <ThemedText style={styles.summaryTitle}>Ganhos Totais</ThemedText>
            </View>
            <ThemedText style={styles.summaryValue}>
              R$ {monthlyData.earnings.toFixed(2)}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <MaterialCommunityIcons name="cash-minus" size={24} color="#F44336" />
              <ThemedText style={styles.summaryTitle}>Despesas Totais</ThemedText>
            </View>
            <ThemedText style={styles.summaryValue}>
              R$ {monthlyData.expenses.toFixed(2)}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <MaterialCommunityIcons name="bike" size={24} color="#2196F3" />
              <ThemedText style={styles.summaryTitle}>Quilômetros Totais</ThemedText>
            </View>
            <ThemedText style={styles.summaryValue}>
              {monthlyData.kilometers} km
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <MaterialCommunityIcons name="package-variant" size={24} color="#FF9800" />
              <ThemedText style={styles.summaryTitle}>Total de Entregas</ThemedText>
            </View>
            <ThemedText style={styles.summaryValue}>
              {monthlyData.deliveries}
            </ThemedText>
          </ThemedView>

          <ThemedView style={[styles.summaryCard, { borderWidth: 2, borderColor: '#9C27B0' }]}>
            <View style={styles.summaryHeader}>
              <MaterialCommunityIcons name="chart-line" size={24} color="#9C27B0" />
              <ThemedText style={styles.summaryTitle}>Média por Entrega</ThemedText>
            </View>
            <ThemedText style={styles.summaryValue}>
              R$ {monthlyData.averagePerDelivery.toFixed(2)}
            </ThemedText>
          </ThemedView>
        </View>

        <ThemedView style={styles.chartPlaceholder}>
          <MaterialCommunityIcons name="chart-bar" size={48} color="#666" />
          <ThemedText style={styles.placeholderText}>
            Gráficos em desenvolvimento
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  summaryContainer: {
    gap: 16,
    marginBottom: 24,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartPlaceholder: {
    height: 200,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
}); 