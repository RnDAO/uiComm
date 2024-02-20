// TcAvatar.test.tsx

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'; // For the "toBeInTheDocument" matcher

import TcAvatar from './TcAvatar'; // Adjust the path as needed

describe('TcAvatar Component', () => {
  it('renders the avatar with the provided src', () => {
    const sampleSrc = 'https://example.com/sample-avatar.jpg';
    render(<TcAvatar src={sampleSrc} />);

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', sampleSrc);
  });
});
