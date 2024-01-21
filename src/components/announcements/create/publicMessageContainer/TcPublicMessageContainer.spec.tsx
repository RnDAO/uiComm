import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TcPublicMessageContainer from './TcPublicMessageContainer';
import { ChannelContext } from '../../../../context/ChannelContext';

const mockChannels = [
  { channelId: '1131241242', title: 'Channel 1', subChannels: [] },
  { channelId: '1242512553', title: 'Channel 2', subChannels: [] },
];

const mockSelectedSubChannels = {
  channel1: { '1131241242': true },
  channel2: { '1242512553': true },
};

const mockChannelContext = {
  channels: mockChannels,
  selectedSubChannels: mockSelectedSubChannels,
  loading: false,
  refreshData: jest.fn(),
  handleSubChannelChange: jest.fn(),
  handleSelectAll: jest.fn(),
  updateSelectedSubChannels: jest.fn(),
};

describe('TcPublicMessageContainer Tests', () => {
  // Helper function to render the component with the necessary context
  const renderComponent = (handlePublicAnnouncements = jest.fn()) =>
    render(
      <ChannelContext.Provider value={mockChannelContext}>
        <TcPublicMessageContainer
          handlePublicAnnouncements={handlePublicAnnouncements}
        />
      </ChannelContext.Provider>
    );

  test('renders the component without crashing', () => {
    renderComponent();
    expect(screen.getByText('Public Message')).toBeInTheDocument();
  });

  test('initial state is set correctly', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Write your message here')).toHaveValue(
      ''
    );
  });

  test('allows the user to enter a message', () => {
    renderComponent();
    const messageInput = screen.getByPlaceholderText(
      'Write your message here'
    ) as HTMLInputElement;
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });
    expect(messageInput.value).toBe('Test Message');
  });

  test('select channels dropdown is rendered', () => {
    renderComponent();
    expect(screen.getByLabelText('Select Channels')).toBeInTheDocument();
  });

  test('handlePublicAnnouncements is called with correct data', () => {
    const handlePublicAnnouncementsMock = jest.fn();
    renderComponent(handlePublicAnnouncementsMock);

    // Assuming there is a way to select channels in your UI, simulate that
    // For example, if there's a button to confirm channel selection:
    // fireEvent.click(screen.getByText('Confirm Channels'));

    // Simulate entering a message
    const messageInput = screen.getByPlaceholderText(
      'Write your message here'
    ) as HTMLInputElement;
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });

    // Assuming the function is called on some action, like a form submission or button click
    // fireEvent.click(screen.getByText('Submit'));

    // Check if handlePublicAnnouncementsMock was called correctly
    // Expect the mock to have been called with expected message and channels data
    // This will depend on how your component calls the handlePublicAnnouncements function
    expect(handlePublicAnnouncementsMock).toHaveBeenCalledWith({
      message: 'Test Message',
      selectedChannels: expect.anything(), // Replace with specific expectation
    });
  });
});
