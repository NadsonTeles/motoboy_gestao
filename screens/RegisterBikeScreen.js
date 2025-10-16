import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import db from '../database/Database';
import HapticTab from '../components/HapticTab';

const RegisterBikeScreen = ({ navigation }) => {
    const [model, setModel] = useState('');
    const [consumption, setConsumption] = useState('');
    const [status, setStatus] = useState('kitada');
    const [totalValue, setTotalValue] = useState('');

    const handleRegister = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO bikes (model, consumption, status, totalValue) VALUES (?, ?, ?, ?);',
                [model, consumption, status, totalValue],
                () => { alert('Moto cadastrada com sucesso!'); },
                (_, error) => { console.log(error); }
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro da Moto</Text>
            <TextInput
                style={styles.input}
                placeholder="Modelo"
                value={model}
                onChangeText={setModel}
            />
            <TextInput
                style={styles.input}
                placeholder="Consumo (km/l)"
                value={consumption}
                onChangeText={setConsumption}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Status (kitada/financiada)"
                value={status}
                onChangeText={setStatus}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor Total (se financiada)"
                value={totalValue}
                onChangeText={setTotalValue}
                keyboardType="numeric"
            />
            <Button title="Cadastrar Moto" onPress={handleRegister} />
            <HapticTab onPress={() => navigation.navigate('Home')}>Voltar para Home</HapticTab>
            <HapticTab onPress={() => navigation.navigate('DailyRegister')}>Registro Diário</HapticTab>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
});

export default RegisterBikeScreen; 