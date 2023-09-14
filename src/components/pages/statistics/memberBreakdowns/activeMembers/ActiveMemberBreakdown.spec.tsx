import { render, screen } from '@testing-library/react';
import ActiveMemberBreakdown from './ActiveMemberBreakdown';
jest.mock('next/router', () => require('next-router-mock'));

describe('ActiveMemberBreakdown', () => {
  it('renders the component', () => {
    render(<ActiveMemberBreakdown />);

    // Assert the component is rendered
    const component = screen.getByText('Members breakdown');
    expect(component).toBeInTheDocument();
  });
});
