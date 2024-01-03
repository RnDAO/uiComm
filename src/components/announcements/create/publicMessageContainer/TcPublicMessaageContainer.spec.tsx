import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TcPublicMessaageContainer from './TcPublicMessaageContainer';

describe('TcPublicMessaageContainer Tests', () => {
  test('renders the component without crashing', () => {
    render(<TcPublicMessaageContainer />);
    expect(screen.getByText('Public Message')).toBeInTheDocument();
  });

  test('initial state is set correctly', () => {
    render(<TcPublicMessaageContainer />);
    expect(screen.getByPlaceholderText('Write your message here')).toHaveValue(
      ''
    );
  });

  test('allows the user to enter a message', () => {
    render(<TcPublicMessaageContainer />);
    const messageInput = screen.getByPlaceholderText(
      'Write your message here'
    ) as HTMLInputElement;
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });
    expect(messageInput.value).toBe('Test Message');
  });

  test('select channels dropdown is rendered', () => {
    render(<TcPublicMessaageContainer />);
    expect(screen.getByLabelText('Select Channels')).toBeInTheDocument();
  });
});
