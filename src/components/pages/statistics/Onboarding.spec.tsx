import { render, screen } from '@testing-library/react';

import Onboarding from './Onboarding';
import { TokenProvider } from '../../../context/TokenContext';
import { communityActiveDates } from '../../../lib/data/dateRangeValues';
jest.mock('next/router', () => require('next-router-mock'));

describe('Onboarding component', () => {
  const mockActivePeriod = 1;
  const mockHandleDateRange = jest.fn();

  beforeEach(() => {
    render(
      <TokenProvider>
        <Onboarding
          activePeriod={mockActivePeriod}
          handleDateRange={mockHandleDateRange}
        />
      </TokenProvider>
    );
  });

  it('renders the component with the correct heading and description', () => {
    const headingElement = screen.getByText('Onboarding overview');
    const descriptionElement = screen.getByText('New members retention');

    expect(headingElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the statistical data with the correct labels', () => {
    const joinedLabelElement = screen.getByText('Joined');
    const stillActiveLabelElement = screen.getByText('Still Active');
    const droppedLabelElement = screen.getByText('Dropped');
    const newlyActiveLabelElement = screen.getByText('Newly Active');

    expect(joinedLabelElement).toBeInTheDocument();
    expect(newlyActiveLabelElement).toBeInTheDocument();
    expect(stillActiveLabelElement).toBeInTheDocument();
    expect(droppedLabelElement).toBeInTheDocument();
  });

  it('renders the statistical data with the correct description', () => {
    const joinedDescriptionElement = screen.getByText(
      'All members that joined in the last 7 days'
    );
    const stillActiveDescriptionElement = screen.getByText(
      'Started interacting for the first time in the last 7 days'
    );
    const droppedDescriptionElement = screen.getByText(
      'New members that remain interacting 2 weeks after their first interaction'
    );
    const newlyActiveDescriptionElement = screen.getByText(
      "Were newly active within the last 2 weeks, but didn't interact in the last 7 days"
    );

    expect(joinedDescriptionElement).toBeInTheDocument();
    expect(stillActiveDescriptionElement).toBeInTheDocument();
    expect(droppedDescriptionElement).toBeInTheDocument();
    expect(newlyActiveDescriptionElement).toBeInTheDocument();
  });

  it('renders the range select component with the correct options and active period', () => {
    const rangeSelectOptions = [...communityActiveDates];
    const activePeriod = mockActivePeriod;

    expect(rangeSelectOptions).toHaveLength(communityActiveDates.length);
    expect(rangeSelectOptions[0].title).toBe('Last 7 days');
    expect(rangeSelectOptions[1].title).toBe('1M');
    expect(rangeSelectOptions[2].title).toBe('3M');
    expect(rangeSelectOptions[3].title).toBe('6M');
    expect(rangeSelectOptions[4].title).toBe('1Y');

    expect(activePeriod).toBe(mockActivePeriod);
  });
});
