import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TcPopover from './TcPopover';

describe('TcPopover', () => {
  test('displays content when open', () => {
    const content = <div>Test Content</div>;
    render(
      <TcPopover
        open={true}
        anchorEl={document.createElement('button')}
        content={content}
        onClose={() => {}}
      />
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
