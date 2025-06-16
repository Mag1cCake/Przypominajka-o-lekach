import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../components/CustomButton';

describe('CustomButton', () => {
  // Test sprawdzający, czy komponent renderuje się z odpowiednim tytułem
  it('renders with correct title', () => {
    const { getByText } = render(
      <CustomButton title="Click Me" onPress={() => {}} />
    );
    expect(getByText('Click Me')).toBeTruthy(); // Sprawdza, czy tekst przycisku jest widoczny
  });

  // Test sprawdzający, czy funkcja onPress jest wywoływana po kliknięciu
  it('calls onPress when pressed', () => {
    const mockPress = jest.fn(); // Mock funkcj
    const { getByText } = render(
      <CustomButton title="Press me" onPress={mockPress} />
    );
    fireEvent.press(getByText('Press me')); // Symuluje kliknięcie
    expect(mockPress).toHaveBeenCalledTimes(1); // Sprawdza, czy funkcja została wywołana
  });

  // Test sprawdzający, czy onPress NIE jest wywoływane, gdy przycisk jest nieaktywny
  it('does not call onPress when disabled', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <CustomButton title="Disabled" onPress={mockPress} disabled={true} />
    );
    fireEvent.press(getByText('Disabled'));
    expect(mockPress).not.toHaveBeenCalled(); // Funkcja nie powinna zostać wywołana
  });
});