import React from 'react';
import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import TcText from '../components/twitter/shared/TcText';
import TcBoxContainer from '../components/twitter/shared/TcBox/TcBoxContainer';
import TcAccountActivity from '../components/twitter/growth/accountActivity/TcAccountActivity';
import TcYourAccountActivity from '../components/twitter/growth/yourAccountActivity/TcYourAccountActivity';

function growth() {
  return (
    <>
      <SEO titleTemplate="Twitter Growth" />
      <div className="flex flex-col container px-4 md:px-12 py-4">
        <TcBoxContainer
          titleContainerChildren={
            <div className="bg-info text-white px-8 py-3">
              <TcText
                text={'Twitter analysis'}
                variant={'h4'}
                fontWeight="bold"
              />
            </div>
          }
          contentContainerChildren={
            <div className="px-6 py-4">
              <TcAccountActivity />
              <TcYourAccountActivity />
            </div>
          }
        />
      </div>
    </>
  );
}

growth.pageLayout = defaultLayout;

export default growth;
