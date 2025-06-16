import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function MedicationItem({ item, onDelete, onEdit, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.dose}>Dawka: {item.dose}</Text>
        <Text style={styles.time}>
          Godzina: {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Text style={styles.buttonText}>Edytuj</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(item.id)}>
          <Text style={styles.buttonText}>Usuń</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: width * 0.04,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: height * 0.015,
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  dose: {
    color: '#555',
    fontSize: width * 0.04,
  },
  time: {
    color: '#333',
    fontSize: width * 0.04,
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.015,
  },
  button: {
    flex: 1,
    marginHorizontal: width * 0.01,
    backgroundColor: '#007bff',
    paddingVertical: height * 0.015,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
});