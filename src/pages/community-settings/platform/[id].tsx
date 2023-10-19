import { defaultLayout } from '../../../layouts/defaultLayout';
import SEO from '../../../components/global/SEO';
import TcPlatform from '../../../components/communitySettings/platform';

function PlatformConfigurations() {
  return (
    <>
      <SEO titleTemplate="Community Platform" />
      <div className="flex flex-col container px-4 md:px-12 py-4">
        <TcPlatform />
      </div>
    </>
  );
}

PlatformConfigurations.pageLayout = defaultLayout;

export default PlatformConfigurations;
