import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicationItem from '../components/MedicationItem';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation, setIsLoggedIn }) {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const loadMedications = async () => {
      const stored = await AsyncStorage.getItem('medications');
      if (stored) setMedications(JSON.parse(stored));
    };
    const unsubscribe = navigation.addListener('focus', loadMedications);
    return unsubscribe;
  }, [navigation]);

  const deleteMedication = async (id) => {
    const updated = medications.filter(m => m.id !== id);
    setMedications(updated);
    await AsyncStorage.setItem('medications', JSON.stringify(updated));
  };

  const editMedication = (item) => {
    navigation.navigate('AddMedication', { item });
  };

  const showDetails = (item) => {
    navigation.navigate('MedicationDetail', { medication: item });
  };

  const logout = () => {
    Alert.alert(
      'Wylogowanie',
      'Czy na pewno chcesz się wylogować?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Tak',
          onPress: async () => {
            await AsyncStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicationItem
            item={item}
            onDelete={deleteMedication}
            onEdit={() => editMedication(item)}
            onPress={() => showDetails(item)} // <- obsługa kliknięcia
          />
        )}
      />
      <CustomButton
        title="Dodaj lek"
        onPress={() => navigation.navigate('AddMedication')}
        style={{ marginVertical: height * 0.015 }}
      />
      <CustomButton
        title="Wyloguj się"
        onPress={logout}
        style={{ backgroundColor: '#d9534f' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
  },
});