// TcAvailableIntegrations.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TcAvailableIntegrations from './TcAvailableIntegrations';
import { IntegrationPlatform } from '../../../utils/enums';

describe('<TcAvailableIntegrations />', () => {
  it('renders the TcAvailableIntegrationsItem component for each platform', () => {
    const { getAllByTestId } = render(<TcAvailableIntegrations />);

    // Assuming TcAvailableIntegrationsItem has a data-testid of "integration-item"
    const items = getAllByTestId('integration-item');
    expect(items).toHaveLength(Object.values(IntegrationPlatform).length);

    // Extra: Check if each rendered item has the expected platform as prop
    items.forEach((item, index) => {
      const platform = Object.values(IntegrationPlatform)[index];
      expect(item).toHaveAttribute('data-platform', platform);
    });
  });
});
