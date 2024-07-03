import { render, screen } from '@testing-library/react';

import TcHivemindDiscordLearnings from './TcHivemindDiscordLearnings';
import { IPlatformProps } from '../../../utils/interfaces';

describe('TcHivemindDiscordLearnings', () => {
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
  it('should render learnings header', () => {
    render(
      <TcHivemindDiscordLearnings
        platform={mockPlatform}
        handleModuleConfigChange={() => jest.fn()}
      />
    );
    expect(screen.getByText('Learnings')).toBeInTheDocument();
  });
  it('should render data extraction placeholder', () => {
    render(
      <TcHivemindDiscordLearnings
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
      <TcHivemindDiscordLearnings
        platform={mockPlatform}
        handleModuleConfigChange={() => jest.fn()}
      />
    );
    expect(
      screen.getByText('Sync the following data sources')
    ).toBeInTheDocument();
  });
});
