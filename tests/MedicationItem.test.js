import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MedicationItem from '../components/MedicationItem';

// Przykłowy obiekt leku do testów
const mockItem = {
  id: '1',
  name: 'Ibuprofen',
  dose: '200mg',
  time: new Date(),
};

describe('MedicationItem', () => {
  // Test sprawdzający, czy wyświetlana jest nazwa i dawka leku
  it('renders medication name and dose', () => {
    const { getByText } = render(
      <MedicationItem item={mockItem} onDelete={() => {}} onEdit={() => {}} onPress={() => {}} />
    );
    expect(getByText('Ibuprofen')).toBeTruthy(); // Sprawdza obecność nazwy leku
    expect(getByText('Dawka: 200mg')).toBeTruthy(); // Sprawdza obecność dawki
  });

  // Test sprawdzający, czy kliknięcie "Edytuj" wywołuje onEdit
  it('calls onEdit when "Edytuj" is pressed', () => {
    const mockEdit = jest.fn();
    const { getByText } = render(
      <MedicationItem item={mockItem} onDelete={() => {}} onEdit={mockEdit} onPress={() => {}} />
    );
    fireEvent.press(getByText('Edytuj')); // Symuluje kliknięcie przycisku "Edytuj"
    expect(mockEdit).toHaveBeenCalled(); // Sprawdza, czy funkcja została wywołana
  });

  // Test sprawdzający, czy kliknięcie "Usuń" wywołuje onDelete z prawidłowym ID
  it('calls onDelete when "Usuń" is pressed', () => {
    const mockDelete = jest.fn();
    const { getByText } = render(
      <MedicationItem item={mockItem} onDelete={mockDelete} onEdit={() => {}} onPress={() => {}} />
    );
    fireEvent.press(getByText('Usuń')); // Symuluje kliknięcie przycisku "Usuń"
    expect(mockDelete).toHaveBeenCalledWith('1'); // Sprawdza, czy funkcja została wywołana z ID
  });
});