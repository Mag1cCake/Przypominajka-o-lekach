import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const MedicationDetailScreen = ({ route }) => {
  const { medication } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Szczegóły leku</Text>
      <Text style={styles.label}>Nazwa:</Text>
      <Text style={styles.value}>{medication.name}</Text>

      <Text style={styles.label}>Dawka:</Text>
      <Text style={styles.value}>{medication.dose}</Text>

      <Text style={styles.label}>Godzina przypomnienia:</Text>
      <Text style={styles.value}>
        {new Date(medication.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
};

export default MedicationDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: '600',
    marginTop: height * 0.02,
  },
  value: {
    fontSize: width * 0.045,
  },
});