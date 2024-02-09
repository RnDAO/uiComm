import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TcScheduleAnnouncement from './TcScheduleAnnouncement';

describe('TcScheduleAnnouncement Tests', () => {
  // Mock functions for the new props
  const mockHandleScheduledDate = jest.fn();
  const mockSetIsDateValid = jest.fn();

  test('renders the component without crashing', () => {
    render(
      <TcScheduleAnnouncement
        handleSchaduledDate={mockHandleScheduledDate}
        isDateValid={true}
        setIsDateValid={mockSetIsDateValid}
      />
    );

    // Since the initial text is "Select Date for Announcement", we should assert this text.
    expect(
      screen.getByText('Select Date for Announcement')
    ).toBeInTheDocument();
  });

  test('initially displays the calendar icon', () => {
    render(
      <TcScheduleAnnouncement
        handleSchaduledDate={mockHandleScheduledDate}
        isDateValid={true}
        setIsDateValid={mockSetIsDateValid}
      />
    );

    // Assuming your TcButton component renders an <MdCalendarMonth /> icon, this test checks for its presence.
    const calendarIcon = screen.getByTestId('MdCalendarMonth');
    expect(calendarIcon).toBeInTheDocument();
  });

  test('displays the button to open date-time popover', () => {
    render(
      <TcScheduleAnnouncement
        handleSchaduledDate={mockHandleScheduledDate}
        isDateValid={true}
        setIsDateValid={mockSetIsDateValid}
      />
    );

    // Check if the button that is supposed to open the date-time popover is rendered.
    const button = screen.getByRole('button', {
      name: /select date for announcement/i,
    });
    expect(button).toBeInTheDocument();
  });
});
