import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import TcCommunityIntegrations from '../../components/communitySettings/communityIntegrations/TcCommunityIntegrations';
import TcRolesAndPermissions from '../../components/communitySettings/rolesAndPermissions';
import TcSwitchCommunity from '../../components/communitySettings/switchCommunity/TcSwitchCommunity';
import SimpleBackdrop from '../../components/global/LoadingBackdrop';
import SEO from '../../components/global/SEO';
import TcIntegrationDialog from '../../components/pages/communitySettings/TcIntegrationDialog';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcText from '../../components/shared/TcText';
import { defaultLayout } from '../../layouts/defaultLayout';
import { withRoles } from '../../utils/withRoles';
import TcCommunityPlatforms from '../../components/communitySettings/communityPlatforms';

function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    bodyContent: <></>,
    dialogButtonText: '',
  });

  useEffect(() => {
    setLoading(true);
    if (router.query.platform) {
      setShowDialog(true);
      if (router.query.platform === 'Discord') {
        setDialogContent({
          title: 'Welcome to TogetherCrew!',
          bodyContent: <>To see the data, please connect your community</>,
          dialogButtonText: 'I Understand!',
        });
      }
    } else {
      setShowDialog(false);
    }
    setLoading(false);
  }, [router.query]);

  const handleClose = () => {
    setShowDialog(false);
    router.push(router.pathname);
  };

  if (loading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <SEO titleTemplate='Community Settings' />
      <div className='container flex flex-col px-4 py-4 md:px-12'>
        <TcBoxContainer
          contentContainerChildren={
            <div className='space-y-4 px-4 pt-4 pb-[4rem] md:px-10'>
              <TcText text='Community Settings' variant='h5' />
              <div className='space-y-2'>
                {/* <TcSwitchCommunity /> */}
                {/* <TcCommunityIntegrations /> */}
                <TcCommunityPlatforms />
                <TcRolesAndPermissions />
              </div>
            </div>
          }
        />
      </div>
      <TcIntegrationDialog
        title={dialogContent.title}
        bodyContent={dialogContent.bodyContent}
        buttonText={dialogContent.dialogButtonText}
        onClose={handleClose}
        showDialog={showDialog}
      />
    </>
  );
}

Index.pageLayout = defaultLayout;

export default withRoles(Index, ['admin']);
