import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import TcPrivateMessageContainer from '../../components/announcements/create/privateMessaageContainer/TcPrivateMessageContainer';
import TcPublicMessageContainer from '../../components/announcements/create/publicMessageContainer/TcPublicMessageContainer';
import TcScheduleAnnouncement from '../../components/announcements/create/scheduleAnnouncement/';
import TcSelectPlatform from '../../components/announcements/create/selectPlatform';
import TcConfirmSchaduledAnnouncementsDialog from '../../components/announcements/TcConfirmSchaduledAnnouncementsDialog';
import SimpleBackdrop from '../../components/global/LoadingBackdrop';
import SEO from '../../components/global/SEO';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcBreadcrumbs from '../../components/shared/TcBreadcrumbs';
import TcButton from '../../components/shared/TcButton';
import { ChannelContext } from '../../context/ChannelContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { useToken } from '../../context/TokenContext';
import { defaultLayout } from '../../layouts/defaultLayout';
import useAppStore from '../../store/useStore';
import { IRoles, IUser } from '../../utils/interfaces';
import { withRoles } from '../../utils/withRoles';

export type CreateAnnouncementsPayloadDataOptions = {
  channelIds?: string[];
  userIds?: string[];
  roleIds?: string[];
  engagementCategories?: string[];
  safetyMessageChannelId?: string;
};

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
  const [engagementCategories, setEngagementCategories] = useState<string[]>(
    []
  );
  const [safetyMessageChannelId, setSafetyMessageChannelId] =
    useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDateValid, setIsDateValid] = useState<boolean>(true);

  const platformId = community?.platforms.find(
    (platform) =>
      platform.disconnectedAt === null && platform.name === 'discord'
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

    const data = publicAnnouncements ? [publicAnnouncements] : [];

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

      const data = await createNewAnnouncements(
        platformId,
        announcementsPayload
      );
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

  const isPayloadValid = () => {
    if (!privateAnnouncements || privateAnnouncements.length === 0) {
      return !!publicAnnouncements?.template;
    }

    const options = privateAnnouncements[0].options;

    if (!options) {
      return false;
    }

    const hasUserIds =
      Array.isArray(options.userIds) && options.userIds.length > 0;
    const hasRoleIds =
      Array.isArray(options.roleIds) && options.roleIds.length > 0;
    const hasEngagementCategories =
      Array.isArray(options.engagementCategories) &&
      options.engagementCategories.length > 0;

    return (
      hasUserIds ||
      hasRoleIds ||
      hasEngagementCategories ||
      !!publicAnnouncements?.template
    );
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

                    if (selectedChannels.length > 0) {
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
                    } else {
                      setChannels([]);
                      setPublicAnnouncements(undefined);
                    }
                  }}
                />
                <TcPrivateMessageContainer
                  handlePrivateAnnouncements={({
                    message,
                    selectedUsers,
                    selectedRoles,
                    selectedEngagementCategory,
                    safetyChannelIds,
                  }) => {
                    if (!platformId) return;

                    const commonData = {
                      platformId: platformId,
                      template: message,
                    };

                    const privateAnnouncementsOptions: {
                      roleIds: string[];
                      userIds: string[];
                      engagementCategories?: string[];
                      safetyMessageChannelId?: string;
                    } = {
                      roleIds: [],
                      userIds: [],
                      engagementCategories: [],
                      safetyMessageChannelId: '',
                    };

                    if (selectedRoles && selectedRoles.length > 0) {
                      setRoles(selectedRoles);
                      privateAnnouncementsOptions.roleIds = selectedRoles.map(
                        (role) => role.roleId.toString()
                      );
                    } else {
                      setRoles([]);
                    }

                    if (selectedUsers && selectedUsers.length > 0) {
                      setUsers(selectedUsers);
                      privateAnnouncementsOptions.userIds = selectedUsers.map(
                        (user) => user.discordId
                      );
                    } else {
                      setUsers([]);
                    }

                    if (
                      selectedEngagementCategory &&
                      selectedEngagementCategory.length > 0
                    ) {
                      setEngagementCategories(selectedEngagementCategory);
                      privateAnnouncementsOptions.engagementCategories =
                        selectedEngagementCategory.map((category) => category);
                    } else {
                      setEngagementCategories([]);
                    }

                    if (safetyChannelIds) {
                      setSafetyMessageChannelId(safetyMessageChannelId);
                      privateAnnouncementsOptions.safetyMessageChannelId =
                        safetyChannelIds;
                    } else {
                      setSafetyMessageChannelId('');
                    }

                    if (
                      privateAnnouncementsOptions.roleIds.length > 0 ||
                      privateAnnouncementsOptions.userIds.length > 0 ||
                      (privateAnnouncementsOptions.engagementCategories &&
                        privateAnnouncementsOptions.engagementCategories
                          ?.length > 0) ||
                      privateAnnouncementsOptions.safetyMessageChannelId
                    ) {
                      const combinedPrivateAnnouncement = {
                        ...commonData,
                        options: privateAnnouncementsOptions,
                      };

                      setPrivateAnnouncements([combinedPrivateAnnouncement]);
                    }
                  }}
                />
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
                    disabled={!scheduledAt || !isDateValid || !isPayloadValid()}
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
                    selectedEngagementCategories={engagementCategories}
                    schaduledDate={scheduledAt || ''}
                    handleCreateAnnouncements={(e) =>
                      handleCreateAnnouncements(e)
                    }
                    isDisabled={
                      !scheduledAt || !isDateValid || !isPayloadValid()
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

export default withRoles(CreateNewAnnouncements, ['admin']);
