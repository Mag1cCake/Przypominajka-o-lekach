import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { View,TextInput,StyleSheet,Platform,KeyboardAvoidingView,ScrollView,Alert,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

// Pobranie rozmiarów ekranu
const { width, height } = Dimensions.get('window');

export default function AddMedicationScreen({ navigation, route }) {
  const editItem = route.params?.item; // Pobranie leku do edycji (jeśli istnieje)

  // Stany formularza
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false); // Czy wyświetlić picker czasu

  // Jeśli edytujemy lek, wczytaj jego dane do formularza
  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setDose(editItem.dose);
      setTime(new Date(editItem.time));
    }
  }, [editItem]);

  // Funkcja planująca powiadomienie
  const scheduleNotification = async (medication) => {
    const now = new Date();
    const triggerTime = new Date(now);

    triggerTime.setHours(time.getHours());
    triggerTime.setMinutes(time.getMinutes());
    triggerTime.setSeconds(0);

    // Jeśli czas już minął, ustaw na następny dzień
    if (triggerTime <= now) {
      triggerTime.setDate(triggerTime.getDate() + 1); // jutro
    }

    console.log('Zaplanuj powiadomienie na:', triggerTime.toString());

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Przypomnienie: ${medication.name}`,
        body: `Weź dawkę: ${medication.dose}`,
      },
      trigger: triggerTime,
    });
  };

  // Obsługa zapisu leku (nowy lub edytowany)
  const handleSave = async () => {
    if (!name || !dose) {
      Alert.alert('Błąd', 'Uzupełnij nazwę i dawkę leku.');
      return;
    }

    const stored = await AsyncStorage.getItem('medications');
    const meds = stored ? JSON.parse(stored) : [];

    let updated;
    if (editItem) {
      // Edytuj istniejący lek
      updated = meds.map(m =>
        m.id === editItem.id ? { ...m, name, dose, time } : m
      );
    } else {
      // Dodaj nowy lek
      const newMed = { id: uuid.v4(), name, dose, time };
      updated = [...meds, newMed];
      await scheduleNotification(newMed);
    }

    // Zapisz listę leków do pamięci
    await AsyncStorage.setItem('medications', JSON.stringify(updated));
    navigation.goBack(); // Wróć do poprzedniego ekranu
  };

  // Zmiana czasu z pickera
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(false);
    setTime(currentDate);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            placeholder="Nazwa leku"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Dawka (np. 1 tabletka)"
            style={styles.input}
            value={dose}
            onChangeText={setDose}
          />
          <View style={styles.timePicker}>
            <CustomButton
              title={`Wybierz godzinę: ${time.getHours().toString().padStart(2, '0')}:${time
                .getMinutes()
                .toString()
                .padStart(2, '0')}`}
              onPress={() => setShowPicker(true)}
            />
            {showPicker && (
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeTime}
              />
            )}
          </View>

          <View style={{ marginTop: height * 0.005, marginBottom: height * 0.05 }}>
            <CustomButton title="Zapisz" onPress={handleSave} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: height * 0.015,
    padding: height * 0.015,
    borderRadius: 6,
    fontSize: width * 0.045,
  },
  timePicker: {
    marginBottom: height * 0.015,
  },
});