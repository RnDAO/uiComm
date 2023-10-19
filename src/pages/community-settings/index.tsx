import React, { useEffect, useState } from 'react';
import { defaultLayout } from '../../layouts/defaultLayout';
import SEO from '../../components/global/SEO';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcText from '../../components/shared/TcText';
import TcCommunityIntegrations from '../../components/communitySettings/communityIntegrations/TcCommunityIntegrations';
import TcIntegrationDialog from '../../components/pages/communitySettings/TcIntegrationDialog';
import { useRouter } from 'next/router';
import TcLink from '../../components/shared/TcLink';

function index() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    bodyContent: <></>,
    dialogButtonText: '',
  });

  useEffect(() => {
    if (router.query.platform) {
      setShowDialog(true);
      if (router.query.platform === 'Twitter') {
        setDialogContent({
          title: 'How to connect your community’s Twitter account',
          bodyContent: (
            <div className="py-2">
              <ol className="space-y-8">
                <li>
                  <TcText
                    text={
                      <p>
                        1 / Go to{' '}
                        <TcLink
                          className="text-secondary underline cursor-pointer font-bold"
                          to={'https://twitter.com/home?lang=en'}
                          target="_blank"
                        >
                          Twitter
                        </TcLink>
                        . Ensure you’re connected with your{' '}
                        <b>community’s Twitter account</b> and leave this window
                        open.
                      </p>
                    }
                    variant={'body2'}
                  />
                </li>
                <li>
                  <TcText
                    text={
                      <p>
                        2 / Once you are connected, click on the button below
                        “Connect Twitter account” and approve the access.
                      </p>
                    }
                    variant={'body2'}
                  />
                </li>
              </ol>
            </div>
          ),
          dialogButtonText: 'Connect Twitter account',
        });
      } else if (router.query.platform === 'Discord') {
        setDialogContent({
          title: 'Welcome to TogetherCrew!',
          bodyContent: <>To see the data, please connect your community</>,
          dialogButtonText: 'Connect community',
        });
      }
    } else {
      setShowDialog(false);
    }
  }, [router.query]);

  const handleClose = () => {
    setShowDialog(false);
    router.push(router.pathname);
  };

  return (
    <>
      <SEO titleTemplate="Community Settings" />
      <div className="flex flex-col container px-4 md:px-12 py-4">
        <TcBoxContainer
          contentContainerChildren={
            <div className="px-4 md:px-10 pt-4 pb-[4rem] space-y-4">
              <TcText text="Community Settings" variant={'h5'} />
              <div className="space-y-2">
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
    </>
  );
}

index.pageLayout = defaultLayout;

export default index;
