import { render, screen } from '@testing-library/react';

import TcHivemindDiscordAnswering from './TcHivemindDiscordAnswering';
import { IPlatformProps } from '../../../utils/interfaces';

describe('TcHivemindDiscordAnswering', () => {
  const mockPlatform: IPlatformProps = {
    id: 'platform_id',
    name: 'Discord',
    community: 'Gaming Group',
    isInProgress: false,
    connectedAt: '2022-01-01T00:00:00Z',
    disconnectedAt: null,
    metadata: {
      selectedChannels: ['channel1', 'channel2'],
    },
  };
  beforeAll(() => {
    jest.mock('../../../store/useStore', () => {
      return () => ({
        retrievePlatformProperties: jest.fn(),
      });
    });
  });
  it('should render answering header', () => {
    render(
      <TcHivemindDiscordAnswering
        platform={mockPlatform}
        handleModuleConfigChange={() => jest.fn()}
      />
    );
    expect(screen.getByText('Answering')).toBeInTheDocument();
  });
  it('should render data extraction placeholder', () => {
    render(
      <TcHivemindDiscordAnswering
        platform={mockPlatform}
        handleModuleConfigChange={() => jest.fn()}
      />
    );
    expect(
      screen.getByText('Select the data extraction period')
    ).toBeInTheDocument();
  });
  it('should render Sync the following data sources', () => {
    render(
      <TcHivemindDiscordAnswering
        platform={mockPlatform}
        handleModuleConfigChange={() => jest.fn()}
      />
    );
    expect(
      screen.getByText('Sync the following data sources')
    ).toBeInTheDocument();
  });
});
