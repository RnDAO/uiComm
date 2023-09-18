import React from 'react';
import centricLayout from '../../layouts/centricLayout';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcText from '../../components/shared/TcText';
import TcButton from '../../components/shared/TcButton';
import router from 'next/router';

function Index() {
  return (
    <div>
      <TcBoxContainer
        bgcolor="white"
        className="rounded p-12 min-h-[37.5rem]"
        contentContainerChildren={
          <div className="space-y-8 py-12">
            <TcText
              variant="h4"
              color="initial"
              fontWeight="bold"
              text="Connect your Discord"
            />
            <div className="block">
              <TcButton
                text={'Connect your Discord'}
                variant="contained"
                onClick={() => router.push('/centric/tac')}
              />
            </div>
            <TcText
              variant="body1"
              color="initial"
              text="More log-in options comming soon."
            />
          </div>
        }
      />
    </div>
  );
}

Index.pageLayout = centricLayout;

export default Index;
