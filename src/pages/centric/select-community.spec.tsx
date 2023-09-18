import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import SelectCommunity from './select-community';

describe('SelectCommunity', () => {
  it('renders the TcBoxContainer', () => {
    const { getByTestId } = render(<SelectCommunity />);

    // Ensure TcBoxContainer is in the document.
    // Note: You would need to add "data-testid='tcbox-container'" to TcBoxContainer in your component.
    const boxContainer = getByTestId('tcbox-container');
    expect(boxContainer).toBeInTheDocument();
  });

  it('renders the TcSelectCommunity inside the TcBoxContainer', () => {
    const { getByTestId } = render(<SelectCommunity />);

    // Ensure TcSelectCommunity is in the document.
    // Note: You would need to add "data-testid='tcselect-community'" to TcSelectCommunity in your component.
    const selectCommunityComponent = getByTestId('tcselect-community');
    expect(selectCommunityComponent).toBeInTheDocument();
  });
});
