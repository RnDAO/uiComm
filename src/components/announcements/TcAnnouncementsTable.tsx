import {
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import Router from 'next/router';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import Loading from '../global/Loading';
import TcButton from '../shared/TcButton';
import TcDialog from '../shared/TcDialog';
import TcText from '../shared/TcText';
import { useSnackbar } from '../../context/SnackbarContext';
import { capitalizeFirstChar, truncateCenter } from '../../helpers/helper';
import useAppStore from '../../store/useStore';

interface Channel {
  channelId: string;
  name: string;
}

interface User {
  discordId: string;
  ngu: string;
}

interface Role {
  roleId: string;
  color: string;
  name: string;
}

interface AnnouncementData {
  platform: string;
  template: string;
  type: 'discord_public' | 'discord_private';
  options: {
    channels: Channel[];
    users?: User[];
    roles?: Role[];
  };
}

interface Announcement {
  id: string;
  title: string;
  scheduledAt: string;
  draft: boolean;
  data: AnnouncementData[];
  community: string;
}

interface AnnouncementsTableProps {
  announcements: Announcement[];
  isLoading: boolean;
  selectedZone: string;
  handleRefreshList: () => void;
}

function TcAnnouncementsTable({
  announcements,
  isLoading,
  selectedZone,
  handleRefreshList,
}: AnnouncementsTableProps) {
  const { deleteAnnouncements } = useAppStore();
  const { showMessage } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<
    string | null
  >(null);

  const formatDateBasedOnTimezone = (
    date: string | number | Date,
    timezone: string
  ) => {
    return moment(date).tz(timezone).format('DD/MM/YYYY, h:mm:ss a');
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAnnouncementId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedAnnouncementId(null);
  };

  const handleEdit = (id: string) => {
    Router.push(`/announcements/edit-announcements/?announcementsId=${id}`);
    handleClose();
  };

  const handleDelete = () => {
    setDeleteConfirmDialogOpen(true);
  };

  const handleDeleteAnnouncements = async (id: string) => {
    try {
      await deleteAnnouncements(id);
      handleRefreshList();
      showMessage('Scheduled announcement removed successfully.', 'success');
    } catch (error) {
      console.error('Error deleting announcement:', error);
      showMessage('Error occurred while deleting the announcement.', 'error');
    } finally {
      setDeleteConfirmDialogOpen(false);
      setSelectedAnnouncementId(null);
    }
  };

  const getAnnouncementTypeLabel = (type: string) => {
    if (type === 'discord_public') {
      return 'Public';
    } else if (type === 'discord_private') {
      return 'Private';
    }
    return 'Unknown';
  };

  const renderTableCell = (
    announcement: {
      draft: any;
      data: any[];
      scheduledAt: string | number | Date;
      id: string;
    },
    cellType: any
  ) => {
    switch (cellType) {
      case 'title':
        return (
          <div className='flex flex-col'>
            <TcText
              text={
                <>
                  <span
                    style={{
                      height: '8px',
                      width: '8px',
                      background: !announcement.draft ? '#3A9E2B' : '#FF9022',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '5px',
                    }}
                  />
                  {announcement &&
                  announcement.data &&
                  announcement.data[0] &&
                  announcement.data[0].template
                    ? truncateCenter(announcement.data[0]?.template, 20)
                    : ''}
                </>
              }
              variant='subtitle2'
            />
            <span className='flex space-x-1'>
              {announcement.data
                .reduce((unique: string[], item: AnnouncementData) => {
                  const itemType = item.type;
                  if (!unique.includes(itemType)) {
                    unique.push(itemType);
                  }
                  return unique;
                }, [] as string[])
                .map((type: string, index: React.Key | null | undefined) => (
                  <Chip
                    key={index}
                    variant='outlined'
                    label={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span
                          style={{
                            height: '8px',
                            width: '8px',
                            background:
                              type === 'discord_public' ? '#E91E63' : '#673AB7',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '5px',
                          }}
                        />
                        {getAnnouncementTypeLabel(type)}
                      </div>
                    }
                    size='small'
                    sx={{
                      borderRadius: '4px',
                      borderColor: '#D1D1D1',
                      backgroundColor: 'white',
                      color: 'black',
                    }}
                  />
                ))}
            </span>
          </div>
        );
      case 'channels':
        return (
          <div className='flex flex-row overflow-hidden whitespace-nowrap'>
            <TcText
              text={announcement.data
                .map(
                  (item: { options: { channels: any } }, dataIndex: number) => {
                    const channels = item.options.channels;
                    if (channels && channels.length > 0) {
                      const displayedChannels = channels
                        .slice(0, 2)
                        .map((channel: { name: any }) => `#${channel.name}`)
                        .join(', ');
                      const moreChannelsIndicator =
                        channels.length > 2 ? '...' : '';
                      return dataIndex > 0
                        ? `, ${displayedChannels}${moreChannelsIndicator}`
                        : `${displayedChannels}${moreChannelsIndicator}`;
                    }
                    return '';
                  }
                )
                .filter((text: string) => text !== '')
                .join('')}
              variant='subtitle2'
            />
          </div>
        );
      case 'users':
        return (
          <div className='flex flex-row overflow-hidden whitespace-nowrap'>
            <TcText
              text={announcement.data
                .map((item: { options: { users: any } }) => {
                  const users = item.options.users;
                  if (users && users.length > 0) {
                    const displayedUsers = users
                      .slice(0, 2)
                      .map((user: { ngu: any }) => `@${user.ngu}`)
                      .join(', ');
                    const moreUsersIndicator = users.length > 2 ? '...' : '';
                    return `${displayedUsers}${moreUsersIndicator}`;
                  }
                  return '';
                })
                .filter((text: string) => text !== '')
                .join(', ')}
              variant='subtitle2'
            />
          </div>
        );
      case 'roles':
        return (
          <div className='flex flex-row overflow-hidden whitespace-nowrap'>
            <TcText
              text={announcement.data
                .map((item: { options: { roles: any } }) => {
                  const roles = item.options.roles;
                  if (roles && roles.length > 0) {
                    const displayedRoles = roles
                      .slice(0, 2)
                      .map((role: { name: any }) => role.name)
                      .join(', ');
                    const moreRolesIndicator = roles.length > 2 ? '...' : '';
                    return `${displayedRoles}${moreRolesIndicator}`;
                  }
                  return '';
                })
                .filter((text: string) => text !== '')
                .join(', ')}
              variant='subtitle2'
            />
          </div>
        );
      case 'engagementCategories':
        return (
          <div className='flex flex-row overflow-hidden whitespace-nowrap'>
            <TcText
              text={announcement.data
                .map((item: { options: { engagementCategories: any } }) => {
                  const engagementCategories =
                    item.options.engagementCategories;
                  if (engagementCategories && engagementCategories.length > 0) {
                    const displayedRoles = engagementCategories
                      .slice(0, 2)
                      .map(
                        (role: string) =>
                          '#' + capitalizeFirstChar(role.replaceAll('_', ' '))
                      )
                      .join(', ');
                    const moreRolesIndicator =
                      engagementCategories.length > 2 ? '...' : '';
                    return `${displayedRoles}${moreRolesIndicator}`;
                  }
                  return '';
                })
                .filter((text: string) => text !== '')
                .join(', ')}
              variant='subtitle2'
            />
          </div>
        );
      case 'scheduledAt':
        return (
          <div className='flex flex-row overflow-hidden whitespace-nowrap'>
            <TcText
              text={formatDateBasedOnTimezone(
                announcement.scheduledAt,
                selectedZone
              )}
              variant='subtitle2'
            />
          </div>
        );
      case 'actions':
        return (
          <>
            <IconButton
              aria-label='more'
              aria-controls='long-menu'
              aria-haspopup='true'
              size='small'
              onClick={(event) => handleClick(event, announcement.id)}
            >
              <BsThreeDotsVertical />
            </IconButton>
            <Menu
              id='long-menu'
              anchorEl={anchorEl}
              keepMounted
              open={
                Boolean(anchorEl) && selectedAnnouncementId === announcement.id
              }
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleEdit(announcement.id)}>
                <MdModeEdit />
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <MdDelete />
                Delete
              </MenuItem>
            </Menu>
          </>
        );
      default:
        return null;
    }
  };

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              style={{ textAlign: 'center' }}
              sx={{ borderBottom: 'none' }}
              className='min-h-[70vh] pt-[25dvh]'
              data-testid='loading-indicator'
            >
              <Loading />
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {announcements.map((announcement, index) => (
          <TableRow
            key={announcement.id}
            className={`my-5 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
          >
            {[
              'title',
              'channels',
              'users',
              'roles',
              'engagementCategories',
              'scheduledAt',
              'actions',
            ].map((cellType, cellIndex, array) => (
              <TableCell
                key={cellType}
                sx={{
                  padding: '14px 16px',
                  borderBottom: index % 2 !== 0 ? '1px solid #f3f4f6' : 'none',
                  borderTop: index % 2 !== 0 ? '1px solid #f3f4f6' : 'none',
                  borderLeft:
                    cellIndex === 0 && index % 2 !== 0
                      ? '1px solid #f3f4f6'
                      : 'none',
                  borderRight:
                    cellIndex === array.length - 1 && index % 2 !== 0
                      ? '1px solid #f3f4f6'
                      : 'none',
                  borderTopLeftRadius: cellIndex === 0 ? '5px' : '0',
                  borderBottomLeftRadius: cellIndex === 0 ? '5px' : '0',
                  borderTopRightRadius:
                    cellIndex === array.length - 1 ? '5px' : '0',
                  borderBottomRightRadius:
                    cellIndex === array.length - 1 ? '5px' : '0',
                }}
              >
                {renderTableCell(announcement, cellType)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <>
      <Table className='border-separate border-spacing-y-2'>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className='uppercase text-gray-400'
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align='left'
            >
              <TcText text='Announcements' variant='body2' />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className='uppercase text-gray-400'
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align='left'
            >
              <TcText text='Channels' variant='body2' />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className='uppercase text-gray-400'
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align='left'
            >
              <TcText text='Handle' variant='body2' />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className='uppercase text-gray-400'
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align='left'
            >
              <TcText text='Role' variant='body2' />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className='uppercase text-gray-400'
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align='left'
            >
              <TcText text='Engagement Categories' variant='body2' />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className='uppercase text-gray-400'
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align='left'
            >
              <TcText text='Date' variant='body2' />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className='uppercase'
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align='right'
            ></TableCell>
          </TableRow>
        </TableHead>
        {renderTableBody()}
      </Table>
      <TcDialog
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '470px',
              borderRadius: '10px',
            },
          },
        }}
        children={
          <>
            <div className='flex justify-end p-4'>
              <AiOutlineClose
                data-testid='close-icon'
                className='cursor-pointer'
                size={24}
                onClick={() => setDeleteConfirmDialogOpen(false)}
              />
            </div>
            <div className='mx-auto flex flex-col py-1'>
              <TcText
                text='Confirm Delete Announcements'
                variant='h6'
                className='pb-4  text-center'
              />
              <div className='space-y-4 pb-6'>
                <TcText
                  text='Are you sure you want to delete schaduled announcements?'
                  variant='body2'
                />
                <div className='flex items-center space-x-3 py-3'>
                  <TcButton
                    text='Cancel'
                    className='w-full'
                    variant='outlined'
                    onClick={() => setDeleteConfirmDialogOpen(false)}
                  />
                  <TcButton
                    text='Confirm'
                    className='w-full'
                    variant='contained'
                    onClick={() =>
                      selectedAnnouncementId &&
                      handleDeleteAnnouncements(selectedAnnouncementId)
                    }
                  />
                </div>
              </div>
            </div>
          </>
        }
        open={deleteConfirmDialogOpen}
      />
    </>
  );
}

export default TcAnnouncementsTable;
