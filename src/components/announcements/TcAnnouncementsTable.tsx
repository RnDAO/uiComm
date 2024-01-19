import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Menu,
  Chip,
} from '@mui/material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Router from 'next/router';
import TcDialog from '../shared/TcDialog';
import TcButton from '../shared/TcButton';
import { AiOutlineClose } from 'react-icons/ai';
import TcText from '../shared/TcText';
import useAppStore from '../../store/useStore';
import { useSnackbar } from '../../context/SnackbarContext';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import Loading from '../global/Loading';
import { truncateCenter } from '../../helpers/helper';

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
  handleRefreshList: () => void;
}

function TcAnnouncementsTable({
  announcements,
  isLoading,
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

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell
            colSpan={6}
            style={{ textAlign: 'center' }}
            sx={{ borderBottom: 'none' }}
            className="min-h-[70vh] pt-[14rem]"
            data-testid="loading-indicator"
          >
            <Loading />
          </TableCell>
        </TableRow>
      );
    }

    return announcements.map((announcement, index) => (
      <TableRow
        key={announcement.id}
        className={`my-5 ${
          index % 2 === 0
            ? 'bg-gray-100'
            : 'border-1 border-solid border-gray-700'
        }`}
      >
        <TableCell sx={{ borderBottom: 'none' }}>
          <div className="flex flex-col">
            <TcText
              text={
                <>
                  <span
                    style={{
                      height: '8px',
                      width: '8px',
                      background: announcement.draft ? '#3A9E2B' : '#FF9022',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '5px',
                    }}
                  />
                  {truncateCenter(announcement.data[0].template, 20)}
                </>
              }
              variant="subtitle2"
            />
            <span className="flex space-x-1">
              {announcement.data
                .reduce((unique: string[], item: AnnouncementData) => {
                  const itemType = item.type;
                  if (!unique.includes(itemType)) {
                    unique.push(itemType);
                  }
                  return unique;
                }, [] as string[])
                .map((type, index) => (
                  <Chip
                    key={index}
                    variant="outlined"
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
                    size="small"
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
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>
          <div className="flex flex-row overflow-hidden whitespace-nowrap">
            <TcText
              text={announcement.data
                .map((item, dataIndex) => {
                  const channels = item.options.channels;
                  if (channels && channels.length > 0) {
                    const displayedChannels = channels
                      .slice(0, 2)
                      .map((channel) => `#${channel.name}`)
                      .join(', ');
                    const moreChannelsIndicator =
                      channels.length > 2 ? '...' : '';
                    return dataIndex > 0
                      ? `, ${displayedChannels}${moreChannelsIndicator}`
                      : `${displayedChannels}${moreChannelsIndicator}`;
                  }
                  return '';
                })
                .filter((text) => text !== '')
                .join('')}
              variant="subtitle2"
            />
          </div>
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>
          <div className="flex flex-row overflow-hidden whitespace-nowrap">
            <TcText
              text={announcement.data
                .map((item) => {
                  const users = item.options.users;
                  if (users && users.length > 0) {
                    const displayedUsers = users
                      .slice(0, 2)
                      .map((user) => `@${user.ngu}`)
                      .join(', ');
                    const moreUsersIndicator = users.length > 2 ? '...' : '';
                    return `${displayedUsers}${moreUsersIndicator}`;
                  }
                  return '';
                })
                .filter((text) => text !== '')
                .join(', ')}
              variant="subtitle2"
            />
          </div>
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>
          <div className="flex flex-row overflow-hidden whitespace-nowrap">
            <TcText
              text={announcement.data
                .map((item) => {
                  const roles = item.options.roles;
                  if (roles && roles.length > 0) {
                    const displayedRoles = roles
                      .slice(0, 2)
                      .map((role) => role.name)
                      .join(', ');
                    const moreRolesIndicator = roles.length > 2 ? '...' : '';
                    return `${displayedRoles}${moreRolesIndicator}`;
                  }
                  return '';
                })
                .filter((text) => text !== '')
                .join(', ')}
              variant="subtitle2"
            />
          </div>
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>
          <div className="flex flex-row overflow-hidden whitespace-nowrap">
            <TcText
              text={new Date(announcement.scheduledAt).toLocaleString()}
              variant="subtitle2"
            />
          </div>
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            size="small"
            onClick={(event) => handleClick(event, announcement.id)}
          >
            <BsThreeDotsVertical />
          </IconButton>
          <Menu
            id="long-menu"
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
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Table className="border-separate border-spacing-y-2">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className="uppercase text-gray-400"
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align="left"
            >
              <TcText text="Announcements" variant="body2" />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className="uppercase text-gray-400"
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align="left"
            >
              <TcText text="Channels" variant="body2" />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className="uppercase text-gray-400"
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align="left"
            >
              <TcText text="Handle" variant="body2" />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className="uppercase text-gray-400"
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align="left"
            >
              <TcText text="Role" variant="body2" />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className="uppercase text-gray-400"
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align="left"
            >
              <TcText text="Date" variant="body2" />
            </TableCell>
            <TableCell
              sx={{ borderBottom: 'none' }}
              className="uppercase"
              style={{
                width: '20%',
                borderBottom: 'none',
                whiteSpace: 'nowrap',
                padding: '0 1rem',
              }}
              align="right"
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody> {renderTableBody()}</TableBody>
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
            <div className="flex justify-end p-4">
              <AiOutlineClose
                data-testid="close-icon"
                className="cursor-pointer"
                size={24}
                onClick={() => setDeleteConfirmDialogOpen(false)}
              />
            </div>
            <div className="flex flex-col mx-auto py-1">
              <TcText
                text="Confirm Delete Announcements"
                variant="h6"
                className="pb-4  text-center"
              />
              <div className="space-y-4 pb-6">
                <TcText
                  text="Are you sure you want to delete schaduled announcements?"
                  variant="body2"
                />
                <div className="flex items-center space-x-3 py-3">
                  <TcButton
                    text={'Cancel'}
                    className="w-full"
                    variant="outlined"
                    onClick={() => setDeleteConfirmDialogOpen(false)}
                  />
                  <TcButton
                    text={'Confirm'}
                    className="w-full"
                    variant="contained"
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
