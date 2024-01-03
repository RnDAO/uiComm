import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TcScheduleAnnouncement from './TcScheduleAnnouncement';

describe('TcScheduleAnnouncement Tests', () => {
  test('renders the component without crashing', () => {
    render(<TcScheduleAnnouncement />);
    expect(screen.getByText('Schedule Announcement')).toBeInTheDocument();
  });
});
