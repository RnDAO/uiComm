import React from 'react';
import { defaultLayout } from '../../layouts/defaultLayout';
import SEO from '../../components/global/SEO';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcPublicMessaageContainer from '../../components/announcements/create/publicMessageContainer';
import TcPrivateMessaageContainer from '../../components/announcements/create/privateMessaageContainer';
import TcButton from '../../components/shared/TcButton';
import TcScheduleAnnouncement from '../../components/announcements/create/scheduleAnnouncement/';
import TcSelectPlatform from '../../components/announcements/create/selectPlatform';
import TcBreadcrumbs from '../../components/shared/TcBreadcrumbs';
import router from 'next/router';

function CreateNewAnnouncements() {
  return (
    <>
      <SEO titleTemplate="Create Announcement" />
      <div className="flex flex-col container px-4 md:px-12 py-4 space-y-3">
        <TcBreadcrumbs
          items={[
            { label: 'Announcement Scheduling', path: '/announcements' },
            { label: 'Create Announcement' },
          ]}
        />
        <TcBoxContainer
          contentContainerChildren={
            <div className="flex flex-col justify-between p-4 md:p-10 min-h-[92dvh]">
              <div className="space-y-4">
                <TcSelectPlatform />
                <TcPublicMessaageContainer />
                <TcPrivateMessaageContainer />
                <TcScheduleAnnouncement />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center space-y-3 pt-6 md:pt-12">
                <TcButton
                  text="Cancel"
                  onClick={() => router.push('/announcements')}
                  variant="outlined"
                  sx={{
                    maxWidth: {
                      xs: '100%',
                      sm: '8rem',
                    },
                  }}
                />
                <div className="flex flex-col md:flex-row items-center md:space-x-3 w-full space-y-3 md:space-y-0 md:w-auto">
                  <TcButton
                    text="Save as Draft"
                    variant="outlined"
                    sx={{
                      maxWidth: {
                        xs: '100%',
                        sm: 'auto',
                      },
                    }}
                  />
                  <TcButton
                    text="Create Announcement"
                    variant="contained"
                    sx={{
                      maxWidth: {
                        xs: '100%',
                        sm: 'auto',
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

CreateNewAnnouncements.pageLayout = defaultLayout;

export default CreateNewAnnouncements;
