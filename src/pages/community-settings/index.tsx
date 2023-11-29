import React, { useEffect, useState } from 'react';
import { defaultLayout } from '../../layouts/defaultLayout';
import SEO from '../../components/global/SEO';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcText from '../../components/shared/TcText';
import TcCommunityIntegrations from '../../components/communitySettings/communityIntegrations/TcCommunityIntegrations';
import TcIntegrationDialog from '../../components/pages/communitySettings/TcIntegrationDialog';
import { useRouter } from 'next/router';
import TcLink from '../../components/shared/TcLink';
import TcSwitchCommunity from '../../components/communitySettings/switchCommunity/TcSwitchCommunity';
import SimpleBackdrop from '../../components/global/LoadingBackdrop';
import { ChannelProvider } from '../../context/ChannelContext';

function index() {
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
      <ChannelProvider>
        <SEO titleTemplate="Community Settings" />
        <div className="flex flex-col container px-4 md:px-12 py-4">
          <TcBoxContainer
            contentContainerChildren={
              <div className="px-4 md:px-10 pt-4 pb-[4rem] space-y-4">
                <TcText text="Community Settings" variant={'h5'} />
                <div className="space-y-2">
                  <TcSwitchCommunity />
                  <TcCommunityIntegrations />
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
      </ChannelProvider>
    </>
  );
}

index.pageLayout = defaultLayout;

export default index;
