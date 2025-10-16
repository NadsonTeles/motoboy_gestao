import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import db from '../database/Database';
import HapticTab from '../components/HapticTab';

const DashboardScreen = ({ navigation }) => {
    const [data, setData] = useState({ earnings: [], expenses: [] });

    useEffect(() => {
        const fetchData = () => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT SUM(dailyEarnings) as totalEarnings FROM daily_records;',
                    [],
                    (_, result) => {
                        const earnings = result.rows.item(0).totalEarnings || 0;
                        setData(prevData => ({ ...prevData, earnings: [...prevData.earnings, earnings] }));
                    }
                );
                tx.executeSql(
                    'SELECT SUM(gasExpense) as totalExpenses FROM daily_records;',
                    [],
                    (_, result) => {
                        const expenses = result.rows.item(0).totalExpenses || 0;
                        setData(prevData => ({ ...prevData, expenses: [...prevData.expenses, expenses] }));
                    }
                );
            });
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard Financeiro</Text>
            <BarChart
                data={{
                    labels: ['Ganhos', 'Despesas'],
                    datasets: [{
                        data: [data.earnings.reduce((a, b) => a + b, 0), data.expenses.reduce((a, b) => a + b, 0)],
                    }],
                }}
                width={400} // from react-native
                height={220}
                yAxisLabel="R$"
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: "6", strokeWidth: "2", stroke: "rgba(0, 0, 255, 0.5)" },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
            <HapticTab onPress={() => navigation.navigate('Home')}>Voltar para Home</HapticTab>
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
});

export default DashboardScreen; 