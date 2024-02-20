import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import TcAvailableIntegrationsItem from './TcAvailableIntegrationsItem';
import { IntegrationPlatform } from '../../../utils/enums';

describe('<TcAvailableIntegrationsItem />', () => {
  test('it renders the correct integration platform text and icon', () => {
    const { getByText, getByTestId } = render(
      <TcAvailableIntegrationsItem
        integrationPlatform={IntegrationPlatform.Discord}
      />
    );

    expect(getByText(IntegrationPlatform.Discord)).toBeInTheDocument();
  });

  test('it contains a connect button', () => {
    const { getByText } = render(
      <TcAvailableIntegrationsItem
        integrationPlatform={IntegrationPlatform.Discord}
      />
    );

    // Checking for the button
    const buttonElement = getByText('Connect');
    expect(buttonElement).toBeInTheDocument();
  });
});
