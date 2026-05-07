import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ActionButton from '../components/ui/ActionButton';

describe('ActionButton', () => {
  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<ActionButton title="Click Me" onPress={mockPress} />);
    fireEvent.press(getByText('Click Me'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
