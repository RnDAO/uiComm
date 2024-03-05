import { render, screen } from '@testing-library/react';

import DisengagedMembersCompositionBreakdown from './DisengagedMembersCompositionBreakdown';
import { TokenProvider } from '../../../../../context/TokenContext';
jest.mock('next/router', () => require('next-router-mock'));

describe('ActiveMemberBreakdown', () => {
  it('renders the component', () => {
    render(
      <TokenProvider>
        <DisengagedMembersCompositionBreakdown />
      </TokenProvider>
    );

    const component = screen.getByText('Members breakdown');
    expect(component).toBeInTheDocument();
  });
});
