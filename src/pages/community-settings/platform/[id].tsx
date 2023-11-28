import SEO from '../../../components/global/SEO';
import TcPlatform from '../../../components/communitySettings/platform';
import { defaultLayout } from '../../../layouts/defaultLayout';
import { ChannelProvider } from '../../../context/ChannelContext';
import TcBreadcrumbs from '../../../components/shared/TcBreadcrumbs';

function PlatformConfigurations() {
  return (
    <>
      <ChannelProvider>
        <SEO titleTemplate="Community Platform" />
        <div className="flex flex-col container px-4 md:px-12 py-4">
          <TcBreadcrumbs
            items={[
              { label: 'Community Settings', path: '/community-settings' },
            ]}
          />
          <TcPlatform />
        </div>
      </ChannelProvider>
    </>
  );
}

PlatformConfigurations.pageLayout = defaultLayout;

export default PlatformConfigurations;
