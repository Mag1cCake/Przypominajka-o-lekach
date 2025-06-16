import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'medications';

export const saveMedications = async (medications) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(medications));
  } catch (e) {
    console.error('Błąd zapisu danych:', e);
  }
};

export const loadMedications = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Błąd odczytu danych:', e);
    return [];
  }
};