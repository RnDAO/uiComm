'use client';
import dynamic from 'next/dynamic';
import SEO from '../../../components/global/SEO';
import TcBreadcrumbs from '../../../components/shared/TcBreadcrumbs';
import { ChannelProvider } from '../../../context/ChannelContext';
import { defaultLayout } from '../../../layouts/defaultLayout';
const TcPlatform = dynamic(
  () => import('../../../components/communitySettings/platform'),
  { ssr: false }
);

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
