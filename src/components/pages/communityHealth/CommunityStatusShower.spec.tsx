import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommunityStatusShower from './CommunityStatusShower';

test('renders the component with correct content', () => {
  // Render the component with different scoreStatus and isFragmentation values
  render(
    <CommunityStatusShower
      scoreStatus={1}
      isFragmentation={true}
      toggleTipDialog={jest.fn()}
    />
  );

  // Assert the presence of the tips message
  const tipsMessage = screen.getByText(
    'Tips for making your community less enmeshed'
  );
  expect(tipsMessage).toBeInTheDocument();

  // Assert the presence of the bulb icon
  const bulbIcon = screen.getByTestId('bulb-icon');
  expect(bulbIcon).toBeInTheDocument();

  // Render the component with different scoreStatus and isFragmentation values
  render(
    <CommunityStatusShower
      scoreStatus={0}
      isFragmentation={false}
      toggleTipDialog={jest.fn()}
    />
  );

  // Assert the presence of the success message
  const successMessage = screen.getByText('Your community is doing great!');
  expect(successMessage).toBeInTheDocument();

  // Render the component with different scoreStatus and isFragmentation values
  render(
    <CommunityStatusShower
      scoreStatus={-1}
      isFragmentation={true}
      toggleTipDialog={jest.fn()}
    />
  );

  // Assert the presence of the tips message
  const tipsMessage2 = screen.getByText(
    'Tips for making your community less fragmented'
  );
  expect(tipsMessage2).toBeInTheDocument();
});
