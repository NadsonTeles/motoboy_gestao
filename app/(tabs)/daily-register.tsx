import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Pressable, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';

type TabType = 'earnings' | 'expenses';
type ExpenseType = 'fuel' | 'maintenance' | 'insurance' | 'others' | null;

export default function DailyRegisterScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('earnings');
  const [selectedExpense, setSelectedExpense] = useState<ExpenseType>(null);
  
  // Estados para ganhos
  const [earnings, setEarnings] = useState('');
  const [description, setDescription] = useState('');

  // Estados para despesas
  const [expenseValue, setExpenseValue] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  // Animações para os ícones
  const scaleAnims = {
    fuel: useRef(new Animated.Value(1)).current,
    maintenance: useRef(new Animated.Value(1)).current,
    insurance: useRef(new Animated.Value(1)).current,
    others: useRef(new Animated.Value(1)).current,
  };

  const animateIcon = (type: ExpenseType, selected: boolean) => {
    if (!type) return;
    
    Animated.sequence([
      Animated.spring(scaleAnims[type], {
        toValue: selected ? 1.1 : 1,
        useNativeDriver: true,
        friction: 8,
      })
    ]).start();
  };

  const handleExpenseSelect = (type: ExpenseType) => {
    if (selectedExpense === type) {
      animateIcon(type, false);
      setSelectedExpense(null);
    } else {
      animateIcon(selectedExpense, false);
      setSelectedExpense(type);
      animateIcon(type, true);
    }
  };

  const handleSaveEarnings = () => {
    console.log({ earnings, description });
  };

  const handleSaveExpense = () => {
    console.log({ type: selectedExpense, value: expenseValue, description: expenseDescription });
    // Limpar campos após salvar
    setExpenseValue('');
    setExpenseDescription('');
    setSelectedExpense(null);
  };

  const getExpenseColor = (type: ExpenseType) => {
    switch (type) {
      case 'fuel': return '#FF9800';
      case 'maintenance': return '#2196F3';
      case 'insurance': return '#4CAF50';
      case 'others': return '#9C27B0';
      default: return '#666';
    }
  };

  const [tabScaleAnim] = useState(() => ({
    earnings: new Animated.Value(1),
    expenses: new Animated.Value(1)
  }));

  const animateTab = (tab: TabType, isPressed: boolean) => {
    Animated.spring(tabScaleAnim[tab], {
      toValue: isPressed ? 0.95 : 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const handleTabPress = (tab: TabType) => {
    animateTab(activeTab, false);
    setActiveTab(tab);
    animateTab(tab, true);

    // Auto select fuel when switching to expenses
    if (tab === 'expenses') {
      setSelectedExpense('fuel');
      animateIcon('fuel', true);
    }
  };

  const formatDate = (date: Date) => {
    const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    const weekDay = weekDays[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${weekDay}, ${day} de ${month} de ${year}`;
  };

  const renderEarningsForm = () => (
    <View style={styles.form}>
      <ThemedView style={styles.earningsCard}>
        <MaterialCommunityIcons name="cash-plus" size={32} color="#4CAF50" />
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Valor Recebido</ThemedText>
          <TextInput
            style={styles.input}
            value={earnings}
            onChangeText={setEarnings}
            placeholder="R$ 0,00"
            keyboardType="decimal-pad"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Descrição</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva os serviços realizados..."
            multiline
            numberOfLines={4}
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#4CAF50' }]} 
          onPress={handleSaveEarnings}
        >
          <MaterialCommunityIcons name="check-circle" size={24} color="#FFF" />
          <ThemedText style={styles.buttonText}>Confirmar Ganho</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );

  const renderExpensesForm = () => (
    <View style={styles.form}>
      <View style={styles.expenseIconsContainer}>
        <TouchableOpacity 
          style={[
            styles.expenseIconButton,
            selectedExpense === 'fuel' && styles.selectedExpenseIcon,
            selectedExpense === 'fuel' && { borderColor: '#FF9800' }
          ]}
          onPress={() => handleExpenseSelect('fuel')}
        >
          <MaterialCommunityIcons 
            name="gas-station" 
            size={24} 
            color={selectedExpense === 'fuel' ? '#FF9800' : '#666'} 
          />
          <ThemedText style={styles.expenseIconLabel}>
            Combustível
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.expenseIconButton,
            selectedExpense === 'maintenance' && styles.selectedExpenseIcon,
            selectedExpense === 'maintenance' && { borderColor: '#2196F3' }
          ]}
          onPress={() => handleExpenseSelect('maintenance')}
        >
          <MaterialCommunityIcons 
            name="wrench" 
            size={24} 
            color={selectedExpense === 'maintenance' ? '#2196F3' : '#666'} 
          />
          <ThemedText style={styles.expenseIconLabel}>
            Manutenção
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.expenseIconButton,
            selectedExpense === 'insurance' && styles.selectedExpenseIcon,
            selectedExpense === 'insurance' && { borderColor: '#4CAF50' }
          ]}
          onPress={() => handleExpenseSelect('insurance')}
        >
          <MaterialCommunityIcons 
            name="shield-check" 
            size={24} 
            color={selectedExpense === 'insurance' ? '#4CAF50' : '#666'} 
          />
          <ThemedText style={styles.expenseIconLabel}>
            Seguro
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.expenseIconButton,
            selectedExpense === 'others' && styles.selectedExpenseIcon,
            selectedExpense === 'others' && { borderColor: '#9C27B0' }
          ]}
          onPress={() => handleExpenseSelect('others')}
        >
          <MaterialCommunityIcons 
            name="dots-horizontal-circle" 
            size={24} 
            color={selectedExpense === 'others' ? '#9C27B0' : '#666'} 
          />
          <ThemedText style={styles.expenseIconLabel}>
            Outros
          </ThemedText>
        </TouchableOpacity>
      </View>

      {selectedExpense && (
        <ThemedView style={styles.expenseCard}>
          <View style={styles.expenseCardHeader}>
            <MaterialCommunityIcons 
              name={
                selectedExpense === 'fuel' ? 'gas-station' :
                selectedExpense === 'maintenance' ? 'wrench' :
                selectedExpense === 'insurance' ? 'shield-check' :
                'dots-horizontal-circle'
              } 
              size={24} 
              color={getExpenseColor(selectedExpense)} 
            />
            <ThemedText style={[styles.expenseCardTitle, { color: getExpenseColor(selectedExpense) }]}>
              {selectedExpense === 'fuel' ? 'Combustível' :
               selectedExpense === 'maintenance' ? 'Manutenção' :
               selectedExpense === 'insurance' ? 'Seguro' :
               'Outras Despesas'}
            </ThemedText>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Valor</ThemedText>
            <TextInput
              style={styles.input}
              value={expenseValue}
              onChangeText={setExpenseValue}
              placeholder="R$ 0,00"
              keyboardType="decimal-pad"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Descrição</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={expenseDescription}
              onChangeText={setExpenseDescription}
              placeholder="Descreva a despesa..."
              multiline
              numberOfLines={4}
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: getExpenseColor(selectedExpense) }]} 
            onPress={handleSaveExpense}
          >
            <MaterialCommunityIcons name="check-circle" size={24} color="#FFF" />
            <ThemedText style={styles.buttonText}>Confirmar Despesa</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Registrar Movimentação</ThemedText>
          <ThemedText style={styles.subtitle}>{formatDate(new Date())}</ThemedText>
        </View>

        <View style={styles.tabContainer}>
          <Animated.View style={{ flex: 1, transform: [{ scale: tabScaleAnim.earnings }] }}>
            <Pressable
              style={[
                styles.tab,
                activeTab === 'earnings' && [
                  styles.activeTab,
                  { borderColor: '#4CAF50', borderWidth: 2 }
                ]
              ]}
              onPressIn={() => animateTab('earnings', true)}
              onPressOut={() => !activeTab || activeTab !== 'earnings' ? animateTab('earnings', false) : null}
              onPress={() => handleTabPress('earnings')}
            >
              <MaterialCommunityIcons 
                name="cash-plus" 
                size={24} 
                color={activeTab === 'earnings' ? '#4CAF50' : '#666'} 
              />
              <ThemedText style={[
                styles.tabText,
                activeTab === 'earnings' && { color: '#4CAF50', fontWeight: '600' }
              ]}>
                Ganhos
              </ThemedText>
            </Pressable>
          </Animated.View>

          <Animated.View style={{ flex: 1, transform: [{ scale: tabScaleAnim.expenses }] }}>
            <Pressable
              style={[
                styles.tab,
                activeTab === 'expenses' && [
                  styles.activeTab,
                  { borderColor: '#F44336', borderWidth: 2 }
                ]
              ]}
              onPressIn={() => animateTab('expenses', true)}
              onPressOut={() => !activeTab || activeTab !== 'expenses' ? animateTab('expenses', false) : null}
              onPress={() => handleTabPress('expenses')}
            >
              <MaterialCommunityIcons 
                name="cash-minus" 
                size={24} 
                color={activeTab === 'expenses' ? '#F44336' : '#666'} 
              />
              <ThemedText style={[
                styles.tabText,
                activeTab === 'expenses' && { color: '#F44336', fontWeight: '600' }
              ]}>
                Despesas
              </ThemedText>
            </Pressable>
          </Animated.View>
        </View>

        {activeTab === 'earnings' ? renderEarningsForm() : renderExpensesForm()}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#333333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFF',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeTab: {
    backgroundColor: '#FFF',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  form: {
    gap: 16,
  },
  earningsCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    gap: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  expenseIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    backgroundColor: '#FFF',
    padding: 6,
    borderRadius: 12,
  },
  expenseIconButton: {
    flex: 1,
    minWidth: '45%',
    aspectRatio: 2,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  selectedExpenseIcon: {
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  expenseIconLabel: {
    marginTop: 2,
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  expenseCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    gap: 16,
    marginTop: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  expenseCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expenseCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    padding: 16,
    borderRadius: 12,
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