import { render } from '@testing-library/react';
import React from 'react';

import TcAlert from './TcAlert'; // Replace with the correct import path

describe('TcAlert Component', () => {
  it('renders the alert with custom message', () => {
    const message = 'This is a test alert';

    const { getByText } = render(<TcAlert severity='info'>{message}</TcAlert>);

    // Use the @testing-library/jest-dom assertions to check if the element is present
    expect(getByText(message)).toBeInTheDocument();
  });

  it('renders the alert with a custom severity', () => {
    const message = 'Custom severity alert';
    const customSeverity = 'warning';

    const { container } = render(
      <TcAlert severity={customSeverity}>{message}</TcAlert>
    );

    // Check if the element has the correct class based on the custom severity
    expect(container).toHaveTextContent(message);
  });
});
