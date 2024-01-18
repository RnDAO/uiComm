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
  handleRefreshList: () => void;
}

function TcAnnouncementsTable({
  announcements,
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
      const data = await deleteAnnouncements(id);

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
              }}
              align="right"
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {announcements.map((announcement, index) => (
            <TableRow
              key={announcement.id}
              className={`my-5 ${
                index % 2 === 0
                  ? 'bg-gray-100'
                  : 'border-1 border-solid border-gray-700'
              }`}
            >
              <TableCell sx={{ borderBottom: 'none' }}>
                {announcement.data[0].template}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                {announcement.data.map(
                  (item) =>
                    item.options.channels &&
                    item.options.channels
                      .map((channel) => `#${channel.name}`)
                      .join(', ')
                )}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                {announcement.data.map((item) =>
                  item.options.users
                    ? item.options.users
                        .map((user) => `@${user.ngu}`)
                        .join(', ')
                    : ''
                )}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                {announcement.data.map((item) =>
                  item.options.roles
                    ? item.options.roles.map((role) => role.name).join(', ')
                    : ''
                )}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                {new Date(announcement.scheduledAt).toLocaleString()}
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
                    Boolean(anchorEl) &&
                    selectedAnnouncementId === announcement.id
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
          ))}
        </TableBody>
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
