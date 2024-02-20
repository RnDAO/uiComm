import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineAnnouncement } from 'react-icons/md';

import TcPublicMessageContainer from '../../components/announcements/create/publicMessageContainer/TcPublicMessageContainer';
import TcScheduleAnnouncement from '../../components/announcements/create/scheduleAnnouncement/';
import TcSelectPlatform from '../../components/announcements/create/selectPlatform';
import TcIconContainer from '../../components/announcements/create/TcIconContainer';
import TcConfirmSchaduledAnnouncementsDialog from '../../components/announcements/TcConfirmSchaduledAnnouncementsDialog';
import SimpleBackdrop from '../../components/global/LoadingBackdrop';
import SEO from '../../components/global/SEO';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcBreadcrumbs from '../../components/shared/TcBreadcrumbs';
import TcButton from '../../components/shared/TcButton';
import TcText from '../../components/shared/TcText';
import { ChannelContext } from '../../context/ChannelContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { useToken } from '../../context/TokenContext';
import { defaultLayout } from '../../layouts/defaultLayout';
import useAppStore from '../../store/useStore';
import { IRoles, IUser } from '../../utils/interfaces';

export type CreateAnnouncementsPayloadDataOptions =
  | { channelIds: string[]; userIds?: string[]; roleIds?: string[] }
  | { channelIds?: string[]; userIds: string[]; roleIds?: string[] }
  | { channelIds?: string[]; userIds?: string[]; roleIds: string[] };

export interface CreateAnnouncementsPayloadData {
  platformId: string;
  template: string;
  options: CreateAnnouncementsPayloadDataOptions;
}
export interface CreateAnnouncementsPayload {
  title: string;
  communityId: string;
  scheduledAt: string;
  draft: boolean;
  data: CreateAnnouncementsPayloadData[];
}

function CreateNewAnnouncements() {
  const router = useRouter();
  const { createNewAnnouncements, retrievePlatformById } = useAppStore();

  const { community } = useToken();

  const channelContext = useContext(ChannelContext);
  const { showMessage } = useSnackbar();

  const { refreshData } = channelContext;

  const [channels, setChannels] = useState<any[]>([]);
  const [roles, setRoles] = useState<IRoles[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDateValid, setIsDateValid] = useState<boolean>(true);

  const platformId = community?.platforms.find(
    (platform) => platform.disconnectedAt === null
  )?.id;

  const [publicAnnouncements, setPublicAnnouncements] =
    useState<CreateAnnouncementsPayloadData>();

  const [privateAnnouncements, setPrivateAnnouncements] =
    useState<CreateAnnouncementsPayloadData[]>();

  const [scheduledAt, setScheduledAt] = useState<string>();

  const fetchPlatformChannels = async () => {
    setLoading(true);
    try {
      if (platformId) {
        await retrievePlatformById(platformId);
        await refreshData(platformId, 'channel', undefined, undefined, false);
      }
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!platformId) {
      return;
    }

    fetchPlatformChannels();
  }, [platformId]);

  const handleCreateAnnouncements = async (isDrafted: boolean) => {
    if (!community) return;

    const data = [publicAnnouncements];

    if (privateAnnouncements && privateAnnouncements.length > 0) {
      data.push(...privateAnnouncements);
    }

    const announcementsPayload = {
      communityId: community.id,
      draft: isDrafted,
      scheduledAt: scheduledAt,
      data: data,
    };

    try {
      setLoading(true);
      const data = await createNewAnnouncements(announcementsPayload);
      if (data) {
        showMessage('Announcement created successfully', 'success');
        router.push('/announcements');
      }
    } catch (error) {
      showMessage('Failed to create announcement', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <SEO titleTemplate='Create Announcement' />
      <div className='container flex flex-col space-y-3 px-4 py-4 md:px-12'>
        <TcBreadcrumbs
          items={[
            { label: 'Announcement Scheduling', path: '/announcements' },
            { label: 'Create Announcement' },
          ]}
        />
        <TcBoxContainer
          contentContainerChildren={
            <div className='flex min-h-[92dvh] flex-col justify-between p-4 md:px-10'>
              <div className='space-y-4'>
                <TcSelectPlatform isEdit={false} />
                <TcScheduleAnnouncement
                  handleSchaduledDate={({ selectedTime }) => {
                    setScheduledAt(selectedTime);
                  }}
                  isDateValid={isDateValid}
                  setIsDateValid={setIsDateValid}
                />
                <TcPublicMessageContainer
                  handlePublicAnnouncements={({
                    message,
                    selectedChannels,
                  }) => {
                    if (!platformId) return;
                    setChannels(selectedChannels);
                    setPublicAnnouncements({
                      platformId: platformId,
                      template: message,
                      options: {
                        channelIds: selectedChannels.map(
                          (channel) => channel.id
                        ),
                      },
                    });
                  }}
                />
                <div className='flex flex-row items-center space-x-3'>
                  <TcIconContainer>
                    <MdOutlineAnnouncement size={20} />
                  </TcIconContainer>
                  <TcText
                    text='Smart Announcements'
                    variant='body1'
                    fontWeight='700'
                  />
                  <TcText text='Coming Soon...' variant='subtitle1' />
                </div>
                {/* <TcPrivateMessageContainer
                  handlePrivateAnnouncements={({
                    message,
                    selectedUsers,
                    selectedRoles,
                  }) => {
                    if (!platformId) return;

                    const commonData = {
                      platformId: platformId,
                      template: message,
                    };

                    let privateAnnouncementsOptions: {
                      roleIds: string[];
                      userIds: string[];
                    } = {
                      roleIds: [],
                      userIds: [],
                    };

                    if (selectedRoles && selectedRoles.length > 0) {
                      setRoles(selectedRoles);
                      privateAnnouncementsOptions.roleIds = selectedRoles.map(
                        (role) => role.roleId.toString()
                      );
                    }

                    if (selectedUsers && selectedUsers.length > 0) {
                      setUsers(selectedUsers);
                      privateAnnouncementsOptions.userIds = selectedUsers.map(
                        (user) => user.discordId
                      );
                    }

                    if (
                      privateAnnouncementsOptions.roleIds.length > 0 ||
                      privateAnnouncementsOptions.userIds.length > 0
                    ) {
                      const combinedPrivateAnnouncement = {
                        ...commonData,
                        options: privateAnnouncementsOptions,
                      };

                      setPrivateAnnouncements([combinedPrivateAnnouncement]);
                    }
                  }}
                /> */}
              </div>
              <div className='flex flex-col items-center justify-between space-y-3 pt-6 md:flex-row md:pt-8'>
                <TcButton
                  text='Cancel'
                  onClick={() => router.push('/announcements')}
                  variant='outlined'
                  sx={{
                    maxWidth: {
                      xs: '100%',
                      sm: '8rem',
                    },
                  }}
                />
                <div className='flex w-full flex-col items-center space-y-3 md:w-auto md:flex-row md:space-x-3 md:space-y-0'>
                  <TcButton
                    text='Save as Draft'
                    variant='outlined'
                    disabled={
                      !scheduledAt ||
                      !isDateValid ||
                      publicAnnouncements?.template == '' ||
                      publicAnnouncements?.options.channelIds?.length === 0
                    }
                    sx={{
                      maxWidth: {
                        xs: '100%',
                        sm: 'auto',
                      },
                    }}
                    onClick={() => handleCreateAnnouncements(true)}
                  />
                  <TcConfirmSchaduledAnnouncementsDialog
                    buttonLabel='Create Announcement'
                    selectedChannels={channels}
                    selectedRoles={roles}
                    selectedUsernames={users}
                    schaduledDate={scheduledAt || ''}
                    isDisabled={
                      !scheduledAt ||
                      !isDateValid ||
                      publicAnnouncements?.template == '' ||
                      publicAnnouncements?.options.channelIds?.length === 0
                    }
                    handleCreateAnnouncements={(e) =>
                      handleCreateAnnouncements(e)
                    }
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
