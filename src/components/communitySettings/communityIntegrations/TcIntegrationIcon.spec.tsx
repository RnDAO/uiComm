import React from 'react';
import { render } from '@testing-library/react';
import TcIntegrationIcon from './TcIntegrationIcon';
import { IntegrationPlatform } from '../../../utils/enums';

describe('<TcIntegrationIcon />', () => {
  it('renders the correct icon for each platform', () => {
    Object.values(IntegrationPlatform).forEach((platform) => {
      const { container } = render(<TcIntegrationIcon platform={platform} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
