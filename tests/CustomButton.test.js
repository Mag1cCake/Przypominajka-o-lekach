import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../components/CustomButton';

describe('CustomButton', () => {
  it('renders with correct title', () => {
    const { getByText } = render(
      <CustomButton title="Click Me" onPress={() => {}} />
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <CustomButton title="Press me" onPress={mockPress} />
    );
    fireEvent.press(getByText('Press me'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <CustomButton title="Disabled" onPress={mockPress} disabled={true} />
    );
    fireEvent.press(getByText('Disabled'));
    expect(mockPress).not.toHaveBeenCalled();
  });
});