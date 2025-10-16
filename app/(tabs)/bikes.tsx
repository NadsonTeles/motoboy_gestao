import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

export default function BikesScreen() {
  const [bikes] = useState([
    { id: 1, model: 'CG 160', plate: 'ABC1234', year: '2020' },
    { id: 2, model: 'Factor 150', plate: 'XYZ5678', year: '2021' },
  ]);

  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [year, setYear] = useState('');

  const handleAddBike = () => {
    // TODO: Implementar adição de moto
    console.log({ model, plate, year });
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.bikesList}>
          {bikes.map(bike => (
            <ThemedView key={bike.id} style={styles.bikeCard}>
              <MaterialCommunityIcons name="motorbike" size={32} color="#2196F3" />
              <View style={styles.bikeInfo}>
                <ThemedText style={styles.bikeModel}>{bike.model}</ThemedText>
                <ThemedText style={styles.bikePlate}>{bike.plate}</ThemedText>
                <ThemedText style={styles.bikeYear}>Ano: {bike.year}</ThemedText>
              </View>
              <TouchableOpacity style={styles.deleteButton}>
                <MaterialCommunityIcons name="delete" size={24} color="#F44336" />
              </TouchableOpacity>
            </ThemedView>
          ))}
        </View>

        <View style={styles.form}>
          <ThemedText style={styles.formTitle}>Adicionar Nova Moto</ThemedText>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Modelo</ThemedText>
            <TextInput
              style={styles.input}
              value={model}
              onChangeText={setModel}
              placeholder="Ex: CG 160"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Placa</ThemedText>
            <TextInput
              style={styles.input}
              value={plate}
              onChangeText={setPlate}
              placeholder="Ex: ABC1234"
              autoCapitalize="characters"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Ano</ThemedText>
            <TextInput
              style={styles.input}
              value={year}
              onChangeText={setYear}
              placeholder="Ex: 2020"
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleAddBike}>
            <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
            <ThemedText style={styles.buttonText}>Adicionar Moto</ThemedText>
          </TouchableOpacity>
        </View>
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
  bikesList: {
    gap: 12,
    marginBottom: 24,
  },
  bikeCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  bikeInfo: {
    flex: 1,
    marginLeft: 16,
  },
  bikeModel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bikePlate: {
    fontSize: 16,
    marginTop: 4,
  },
  bikeYear: {
    fontSize: 14,
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  form: {
    gap: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 