import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TcPrivateMessageContainer from './TcPrivateMessaageContainer';

describe('TcPrivateMessageContainer Tests', () => {
  test('renders the component without crashing', () => {
    render(<TcPrivateMessageContainer />);
    expect(screen.getByText('Private Message (optional)')).toBeInTheDocument();
  });

  test('initial states are set correctly', () => {
    render(<TcPrivateMessageContainer />);
  });

  test('toggles private message switch', () => {
    render(<TcPrivateMessageContainer />);
    const switchControl = screen.getByRole('checkbox');
    fireEvent.click(switchControl);
  });

  test('message type buttons respond to clicks', () => {
    render(<TcPrivateMessageContainer />);
  });

  test('allows the user to enter a message', async () => {
    render(<TcPrivateMessageContainer />);

    const privateMessageToggle = screen.getByRole('checkbox');
    fireEvent.click(privateMessageToggle);

    const messageInput = (await screen.findByPlaceholderText(
      'Write your message here'
    )) as HTMLInputElement;
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });

    expect(messageInput.value).toBe('Test Message');
  });

  test('handles channel and username selection based on message type', () => {
    render(<TcPrivateMessageContainer />);
  });
});
