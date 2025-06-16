import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MedicationItem from '../components/MedicationItem';

const mockItem = {
  id: '1',
  name: 'Ibuprofen',
  dose: '200mg',
  time: new Date(),
};

describe('MedicationItem', () => {
  it('renders medication name and dose', () => {
    const { getByText } = render(
      <MedicationItem item={mockItem} onDelete={() => {}} onEdit={() => {}} onPress={() => {}} />
    );
    expect(getByText('Ibuprofen')).toBeTruthy();
    expect(getByText('Dawka: 200mg')).toBeTruthy();
  });

  it('calls onEdit when "Edytuj" is pressed', () => {
    const mockEdit = jest.fn();
    const { getByText } = render(
      <MedicationItem item={mockItem} onDelete={() => {}} onEdit={mockEdit} onPress={() => {}} />
    );
    fireEvent.press(getByText('Edytuj'));
    expect(mockEdit).toHaveBeenCalled();
  });

  it('calls onDelete when "Usuń" is pressed', () => {
    const mockDelete = jest.fn();
    const { getByText } = render(
      <MedicationItem item={mockItem} onDelete={mockDelete} onEdit={() => {}} onPress={() => {}} />
    );
    fireEvent.press(getByText('Usuń'));
    expect(mockDelete).toHaveBeenCalledWith('1');
  });
});