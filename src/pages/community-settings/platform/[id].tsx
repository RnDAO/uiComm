import SEO from '../../../components/global/SEO';
import TcPlatform from '../../../components/communitySettings/platform';
import { defaultLayout } from '../../../layouts/defaultLayout';
import { ChannelProvider } from '../../../context/ChannelContext';

function PlatformConfigurations() {
  return (
    <>
      <ChannelProvider>
        <SEO titleTemplate="Community Platform" />
        <div className="flex flex-col container px-4 md:px-12 py-4">
          <TcPlatform />
        </div>
      </ChannelProvider>
    </>
  );
}

PlatformConfigurations.pageLayout = defaultLayout;

export default PlatformConfigurations;
