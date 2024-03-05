import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For the "toBeInTheDocument" matcher and other extended matchers

import TcCheckbox from './TcCheckbox';

describe('TcCheckbox', () => {
  it('renders without crashing', () => {
    render(<TcCheckbox />);
  });
});
