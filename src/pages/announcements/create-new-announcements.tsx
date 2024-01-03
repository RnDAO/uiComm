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

function CreateNewAnnouncements() {
  return (
    <>
      <SEO titleTemplate="Create Announcement" />
      <div className="flex flex-col container px-4 md:px-12 py-4">
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
              <div className="flex justify-between items-center pt-12">
                <TcButton
                  text="Cancel"
                  variant="outlined"
                  sx={{ maxWidth: '8rem' }}
                />
                <div className="flex items-center space-x-3">
                  <TcButton
                    text="Save as Draft"
                    variant="outlined"
                    sx={{ maxWidth: 'auto' }}
                  />
                  <TcButton
                    text="Create Announcement"
                    variant="contained"
                    sx={{ maxWidth: 'auto' }}
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
