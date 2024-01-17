import React from 'react';
import { defaultLayout } from '../../../layouts/defaultLayout';
import SEO from '../../../components/global/SEO';
import router from 'next/router';
import TcPrivateMessaageContainer from '../../../components/announcements/create/privateMessaageContainer';
import TcPublicMessaageContainer from '../../../components/announcements/create/publicMessageContainer';
import TcScheduleAnnouncement from '../../../components/announcements/create/scheduleAnnouncement';
import TcSelectPlatform from '../../../components/announcements/create/selectPlatform';
import TcBoxContainer from '../../../components/shared/TcBox/TcBoxContainer';
import TcBreadcrumbs from '../../../components/shared/TcBreadcrumbs';
import TcButton from '../../../components/shared/TcButton';
import TcConfirmSchaduledAnnouncementsDialog from '../../../components/announcements/TcConfirmSchaduledAnnouncementsDialog';
import { FlattenedChannel } from '../../../components/announcements/create/publicMessageContainer/TcPublicMessageContainer';
import { IRoles, IUser } from '../../../utils/interfaces';

function Index() {
  return (
    <>
      <SEO titleTemplate="Edit Announcement" />
      <div className="flex flex-col container px-4 md:px-12 py-4 space-y-3">
        <TcBreadcrumbs
          items={[
            { label: 'Announcement Scheduling', path: '/announcements' },
            { label: 'Edit Announcement' },
          ]}
        />
        <TcBoxContainer
          contentContainerChildren={
            <div className="flex flex-col justify-between p-4 md:p-10 min-h-[92dvh]">
              <div className="space-y-4">
                <TcSelectPlatform isEdit={true} />
                <TcPublicMessaageContainer
                  handlePublicAnnouncements={function ({
                    message,
                    selectedChannels,
                  }: {
                    message: string;
                    selectedChannels: FlattenedChannel[];
                  }): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <TcPrivateMessaageContainer
                  handlePrivateAnnouncements={function ({
                    message,
                    selectedRoles,
                    selectedUsers,
                  }: {
                    message: string;
                    selectedRoles?: IRoles[] | undefined;
                    selectedUsers?: IUser[] | undefined;
                  }): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <TcScheduleAnnouncement
                  handleSchaduledDate={function ({
                    selectedTime,
                  }: {
                    selectedTime: string;
                  }): void {
                    throw new Error('Function not implemented.');
                  }}
                />
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
                  <TcConfirmSchaduledAnnouncementsDialog
                    buttonLabel={'Save'}
                    selectedChannels={[]}
                    schaduledDate={''}
                    isDisabled={false}
                    handleCreateAnnouncements={function (
                      isDrafted: boolean
                    ): void {
                      throw new Error('Function not implemented.');
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

Index.pageLayout = defaultLayout;

export default Index;
