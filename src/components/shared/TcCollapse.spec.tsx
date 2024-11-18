import React from 'react';
import { render } from '@testing-library/react';

import TcCollapse from './TcCollapse'; // Replace with the correct import path

describe('TcCollapse Component', () => {
  it('renders children content when open', () => {
    const { getByText } = render(
      <TcCollapse in={true}>
        <div>Content inside Collapse</div>
      </TcCollapse>
    );

    const content = getByText('Content inside Collapse');

    // Check if the content is visible when open
    expect(content).toBeVisible();
  });
});
