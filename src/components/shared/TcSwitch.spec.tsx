import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import TcSwitch from './TcSwitch';

describe('TcSwitch', () => {
  test('it should toggle switch', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<TcSwitch onChange={handleChange} />);

    const switchControl = getByRole('checkbox');
    expect(switchControl).not.toBeChecked();

    fireEvent.click(switchControl);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
