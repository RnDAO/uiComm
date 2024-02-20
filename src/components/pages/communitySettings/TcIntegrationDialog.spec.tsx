import {render } from '@testing-library/react';
import React from 'react';

import TcIntegrationDialog from './TcIntegrationDialog';

describe('<TcIntegrationDialog />', () => {
  it('renders the dialog with the provided content', () => {
    const mockOnClose = jest.fn();
    const { getByText } = render(
      <TcIntegrationDialog
        title='Test Title'
        showDialog={true}
        bodyContent={<p>Test Content</p>}
        buttonText='Test Button'
        onClose={mockOnClose}
      />
    );

    // Check if title is rendered
    expect(getByText('Test Title')).toBeInTheDocument();

    // Check if content is rendered
    expect(getByText('Test Content')).toBeInTheDocument();

    // Check if button is rendered
    expect(getByText('Test Button')).toBeInTheDocument();
  });
});
