import { render, screen } from '@testing-library/react';
import DisengagedMembersCompositionBreakdown from './DisengagedMembersCompositionBreakdown';

describe('ActiveMemberBreakdown', () => {
  it('renders the component', () => {
    render(<DisengagedMembersCompositionBreakdown />);

    // Assert the component is rendered
    const component = screen.getByText('Members breakdown');
    expect(component).toBeInTheDocument();
  });
});
