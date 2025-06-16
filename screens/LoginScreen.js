import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';

// Pobranie wymiarów ekranu do stylizacji
const { width, height } = Dimensions.get('window');

export default function LoginScreen({ setIsLoggedIn }) {
  const [email, setEmail] = useState(''); // Stan dla pola email
  const [password, setPassword] = useState(''); // Stan dla pola hasła

  // Obsługa logowania
  const handleLogin = async () => {
    if (email === 'user' && password === '1234') {
      await AsyncStorage.setItem('isLoggedIn', 'true'); // Zapisz status logowania
      setIsLoggedIn(true); // Przejdź do ekranu głównego
    } else {
      Alert.alert('Błąd logowania', 'Nieprawidłowy email lub hasło.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Hasło</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton title="Zaloguj się" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,  // 5% szerokości
    justifyContent: 'center', // Wyśrodkowanie w pionie
    backgroundColor: '#fff',
  },
  label: {
    fontSize: width * 0.045, // Rozmiar czcionki responsywny
    marginBottom: height * 0.008,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.012,
    marginBottom: height * 0.02,
    fontSize: width * 0.04,
  },
});