'use client';
import TcPlatform from '../../../components/communitySettings/platform';
import SEO from '../../../components/global/SEO';
import TcBreadcrumbs from '../../../components/shared/TcBreadcrumbs';
import { defaultLayout } from '../../../layouts/defaultLayout';
import { withRoles } from '../../withRoles';

function Index() {
  return (
    <>
      <SEO titleTemplate='Community Platform' />
      <div className='container flex flex-col px-4 py-4 md:px-12'>
        <TcBreadcrumbs
          items={[
            { label: 'Community Settings', path: '/community-settings' },
            { label: 'Platform' },
          ]}
        />
        <TcPlatform />
      </div>
    </>
  );
}

Index.pageLayout = defaultLayout;

export default withRoles(Index, ['admin']);
