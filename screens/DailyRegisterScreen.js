import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import db from '../database/Database';
import HapticTab from '../components/HapticTab';

const DailyRegisterScreen = ({ navigation }) => {
    const [gasExpense, setGasExpense] = useState('');
    const [dailyEarnings, setDailyEarnings] = useState('');

    const handleRegister = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO daily_records (gasExpense, dailyEarnings) VALUES (?, ?);',
                [gasExpense, dailyEarnings],
                () => { alert('Registro diário cadastrado com sucesso!'); },
                (_, error) => { console.log(error); }
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro Diário</Text>
            <TextInput
                style={styles.input}
                placeholder="Gasto com Gasolina"
                value={gasExpense}
                onChangeText={setGasExpense}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Ganhos Diários"
                value={dailyEarnings}
                onChangeText={setDailyEarnings}
                keyboardType="numeric"
            />
            <Button title="Cadastrar Registro Diário" onPress={handleRegister} />
            <HapticTab onPress={() => navigation.navigate('Home')}>Voltar para Home</HapticTab>
            <HapticTab onPress={() => navigation.navigate('Dashboard')}>Dashboard</HapticTab>
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

export default DailyRegisterScreen; 