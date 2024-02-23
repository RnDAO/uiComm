import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import { CreateAnnouncementsPayloadData } from '../create-new-announcements';
import TcPublicMessaageContainer from '../../../components/announcements/create/publicMessageContainer';
import TcScheduleAnnouncement from '../../../components/announcements/create/scheduleAnnouncement';
import TcSelectPlatform from '../../../components/announcements/create/selectPlatform';
import TcConfirmSchaduledAnnouncementsDialog from '../../../components/announcements/TcConfirmSchaduledAnnouncementsDialog';
import SimpleBackdrop from '../../../components/global/LoadingBackdrop';
import SEO from '../../../components/global/SEO';
import TcBoxContainer from '../../../components/shared/TcBox/TcBoxContainer';
import TcBreadcrumbs from '../../../components/shared/TcBreadcrumbs';
import { ChannelContext } from '../../../context/ChannelContext';
import { useSnackbar } from '../../../context/SnackbarContext';
import { useToken } from '../../../context/TokenContext';
import { defaultLayout } from '../../../layouts/defaultLayout';
import useAppStore from '../../../store/useStore';
import { IRoles, IUser } from '../../../utils/interfaces';
import TcPrivateMessageContainer from '../../../components/announcements/create/privateMessaageContainer/TcPrivateMessageContainer';

export interface DiscordChannel {
  channelId: string;
  name: string;
}

interface DiscordUser {
  discordId: string;
  ngu: string;
}

interface DiscordPublicOptions {
  channels: DiscordChannel[];
}

export interface DiscordPrivateOptions {
  roles?: IRoles[];
  users?: DiscordUser[];
  safetyMessageChannel?: { channelId: string; name: string };
  engagementCategories?: string[];
}

type DiscordOptions = DiscordPublicOptions | DiscordPrivateOptions;

export interface DiscordData {
  platform: string;
  template: string;
  options: DiscordOptions;
  type: 'discord_public' | 'discord_private';
}

export interface AnnouncementsDiscordResponseProps {
  id: string;
  scheduledAt: string;
  draft: boolean;
  data: DiscordData[];
  community: string;
}

function Index() {
  const { retrieveAnnouncementById, patchExistingAnnouncement } = useAppStore();

  const router = useRouter();

  const { community } = useToken();

  const channelContext = useContext(ChannelContext);
  const { refreshData } = channelContext;

  const { showMessage } = useSnackbar();

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
    (platform) => platform.disconnectedAt === null
  )?.id;

  const [publicAnnouncements, setPublicAnnouncements] =
    useState<CreateAnnouncementsPayloadData>();

  const [privateAnnouncements, setPrivateAnnouncements] =
    useState<CreateAnnouncementsPayloadData[]>();

  const [fetchedAnnouncements, setFetchedAnnouncements] =
    useState<AnnouncementsDiscordResponseProps>();

  const id = router.query.announcementsId as string;

  const [scheduledAt, setScheduledAt] = useState<string>();

  const publicSelectedAnnouncements = useMemo(() => {
    return fetchedAnnouncements?.data.filter(
      (item) => item.type === 'discord_public'
    )[0];
  }, [fetchedAnnouncements]);

  const privateSelectedAnnouncements = useMemo(() => {
    return fetchedAnnouncements?.data.filter(
      (item) => item.type === 'discord_private'
    );
  }, [fetchedAnnouncements]);

  const fetchPlatformChannels = async () => {
    try {
      setLoading(true);
      if (platformId) {
        let channelIds: string[] = [];

        if (
          publicSelectedAnnouncements?.type === 'discord_public' &&
          'channels' in publicSelectedAnnouncements.options
        ) {
          channelIds = publicSelectedAnnouncements.options.channels.map(
            (channel) => channel.channelId
          );
        }

        await refreshData(platformId, 'channel', channelIds, undefined, false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchAnnouncement = async () => {
      const data = await retrieveAnnouncementById(id);

      setFetchedAnnouncements(data);
      setScheduledAt(data.scheduledAt);
    };

    fetchAnnouncement();
  }, [id]);

  useEffect(() => {
    fetchPlatformChannels();
  }, [fetchedAnnouncements]);

  const handleEditAnnouncements = async (isDrafted: boolean) => {
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

      const data = await patchExistingAnnouncement({
        id,
        announcementsPayload,
      });

      if (data) {
        showMessage('Announcement updated successfully', 'success');
        router.push('/announcements');
      } else {
        fetchPlatformChannels();
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
      <SEO titleTemplate='Edit Announcement' />
      <div className='container flex flex-col space-y-3 px-4 py-4 md:px-12'>
        <TcBreadcrumbs
          items={[
            { label: 'Announcement Scheduling', path: '/announcements' },
            { label: 'Edit Announcement' },
          ]}
        />
        <TcBoxContainer
          contentContainerChildren={
            <div className='flex min-h-[92dvh] flex-col justify-between p-4 md:p-10'>
              <div className='space-y-4'>
                <TcSelectPlatform isEdit={true} />
                <TcScheduleAnnouncement
                  isEdit={true}
                  preSelectedTime={scheduledAt}
                  handleSchaduledDate={({ selectedTime }) => {
                    setScheduledAt(selectedTime);
                  }}
                  isDateValid={isDateValid}
                  setIsDateValid={setIsDateValid}
                />
                <TcPublicMessaageContainer
                  isEdit={true}
                  publicAnnouncementsData={publicSelectedAnnouncements}
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
                <TcPrivateMessageContainer
                  isEdit={true}
                  privateAnnouncementsData={privateSelectedAnnouncements}
                  handlePrivateAnnouncements={({
                    message,
                    selectedUsers,
                    selectedRoles,
                    selectedEngagementCategory,
                    safetyChannelIds,
                  }) => {
                    if (!platformId) return;

                    if (
                      !message &&
                      (!selectedUsers || selectedUsers.length === 0) &&
                      (!selectedRoles || selectedRoles.length === 0) &&
                      (!selectedEngagementCategory ||
                        selectedEngagementCategory.length === 0) &&
                      !safetyChannelIds
                    ) {
                      setPrivateAnnouncements([]);
                      return;
                    }

                    const commonData = {
                      platformId: platformId,
                      template: message,
                    };

                    let privateAnnouncementsOptions: {
                      roleIds: string[];
                      userIds: string[];
                      engagementCategories: string[];
                      safetyMessageChannelId: string;
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
                    }

                    if (selectedUsers && selectedUsers.length > 0) {
                      setUsers(selectedUsers);
                      privateAnnouncementsOptions.userIds = selectedUsers.map(
                        (user) => user.discordId
                      );
                    }

                    if (
                      selectedEngagementCategory &&
                      selectedEngagementCategory.length > 0
                    ) {
                      setEngagementCategories(selectedEngagementCategory);
                      privateAnnouncementsOptions.engagementCategories =
                        selectedEngagementCategory.map((category) => category);
                    }

                    if (safetyChannelIds) {
                      setSafetyMessageChannelId(safetyMessageChannelId);
                      privateAnnouncementsOptions.safetyMessageChannelId =
                        safetyChannelIds;
                    }

                    if (
                      privateAnnouncementsOptions.roleIds.length > 0 ||
                      privateAnnouncementsOptions.userIds.length > 0 ||
                      privateAnnouncementsOptions.engagementCategories.length >
                        0 ||
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
              <div className='flex flex-col items-center justify-end space-y-3 pt-6 md:flex-row md:pt-12'>
                <TcConfirmSchaduledAnnouncementsDialog
                  buttonLabel='Save'
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
                  handleCreateAnnouncements={(e) => handleEditAnnouncements(e)}
                />
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
