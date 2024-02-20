import { render } from '@testing-library/react';
import React from 'react';

import TcDialog from './TcDialog';

describe('TcDialog Component', () => {
  it('renders the dialog with children content', () => {
    const { getByText } = render(
      <TcDialog open={true}>
        <div>Dialog Content</div>
      </TcDialog>
    );

    const content = getByText('Dialog Content');
    expect(content).toBeInTheDocument();
  });
});
