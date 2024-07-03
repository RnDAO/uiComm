import { render } from '@testing-library/react';

import TcDiscordIntgration from './TcDiscordIntgration';

describe('TcDiscordIntgration', () => {
  it('should render without throwing an error', () => {
    render(
      <TcDiscordIntgration
        platformType='discord'
        isLoading={false}
        connectedPlatforms={[]}
        handleUpdateCommunityPlatform={() => jest.fn()}
      />
    );
  });
});
