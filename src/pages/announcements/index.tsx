import React from 'react';
import { defaultLayout } from '../../layouts/defaultLayout';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import SEO from '../../components/global/SEO';
import TcText from '../../components/shared/TcText';
import TcButton from '../../components/shared/TcButton';
import { BsPlus } from 'react-icons/bs';
import TcTableContainer from '../../components/shared/TcTableContainer';
import router from 'next/router';

const bodyRowItems = [
  { Name: 'Alice', Age: 28, Location: 'New York' },
  { Name: 'Bob', Age: 34, Location: 'San Francisco' },
  { Name: 'Carol', Age: 23, Location: 'Miami' },
];

function Index() {
  return (
    <>
      <SEO titleTemplate="Announcements" />
      <div className="flex flex-col container px-4 md:px-12 py-4">
        <TcBoxContainer
          contentContainerChildren={
            <div className="p-4 md:p-10 space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <TcText text="Announcement Scheduling" variant="h5" />
                <TcButton
                  text="Create Announcement"
                  startIcon={<BsPlus />}
                  variant="outlined"
                  onClick={() =>
                    router.push('/announcements/create-new-announcements')
                  }
                />
              </div>
              <TcTableContainer bodyRowItems={bodyRowItems} />
            </div>
          }
        />
      </div>
    </>
  );
}

Index.pageLayout = defaultLayout;

export default Index;
