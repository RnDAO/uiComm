// TcInput.test.tsx

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'; // For the "toBeInTheDocument" matcher

import TcInput from './TcInput'; // Adjust the path as needed

describe('TcInput Component', () => {
  it('renders the provided label', () => {
    const label = 'Test Label';
    render(<TcInput label={label} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });
});
