import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" and other extended matchers
import Tac from './tac';

describe('tac Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Tac />);
    expect(getByText('One more thing...')).toBeInTheDocument();
    expect(
      getByText('Please take a moment to familiarize yourself with')
    ).toBeInTheDocument();
  });

  it('has the correct link', () => {
    const { getByText } = render(<Tac />);
    const link = getByText('Privacy Policy and Terms of Service.');
    expect(link).toHaveAttribute(
      'href',
      'https://www.togethercrew.com/privacy-and-terms'
    );
  });

  it('can toggle the checkbox', () => {
    const { getByRole } = render(<Tac />);
    const checkbox = getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('has a Continue button', () => {
    const { getByText } = render(<Tac />);
    const button = getByText('Continue');
    expect(button).toBeInTheDocument();
    // If you have further behaviors linked to this button, you would add more tests (like checking if a function is called when it's clicked, etc.)
  });
});
