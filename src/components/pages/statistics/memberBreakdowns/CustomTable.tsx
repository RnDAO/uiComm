import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdSearch,
} from 'react-icons/md';
import moment from 'moment';

import {
  Column,
  IRoles,
  Row,
  IActivityCompositionOptions,
} from '../../../../utils/interfaces';
import { IUser } from '../../../../utils/types';
import { conf } from '../../../../configs';
import Loading from '../../../global/Loading';
import useAppStore from '../../../../store/useStore';
import { StorageService } from '../../../../services/StorageService';
import CustomDialogDetail from './CustomDialogDetail';

interface CustomTableProps {
  data: Row[];
  columns: Column[];
  isLoading: boolean;
  activityCompositionOptions: IActivityCompositionOptions[];
  handleRoleSelectionChange: (selectedRoles: string[]) => void;
  handleActivityOptionSelectionChange: (selectedRoles: string[]) => void;
  handleJoinedAtChange: (joinedAt: string) => void;
  handleUsernameChange: (userName: string) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  isLoading,
  handleRoleSelectionChange,
  handleActivityOptionSelectionChange,
  handleJoinedAtChange,
  handleUsernameChange,
  activityCompositionOptions,
}) => {
  const { getRoles, roles } = useAppStore();
  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');

    if (!user) {
      return;
    }

    const { guild } = user;
    getRoles(guild.guildId);
  }, []);

  const [anchorElRoles, setAnchorElRoles] = useState<HTMLButtonElement | null>(
    null
  );
  const [anchorElActivity, setAnchorElActivity] =
    useState<HTMLButtonElement | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  useEffect(() => {
    setSelectedRoles(roles.map((role: IRoles) => role.roleId));
  }, [roles]);
  const [selectAllRoles, setSelectAllRoles] = useState(true);
  const [selectedActivityOptions, setSelectedActivityOptions] = useState<
    string[]
  >(activityCompositionOptions.map((option) => option.value));
  const [selectAllActivityOptions, setSelectAllActivityOptions] =
    useState(true);

  const handleOpenRolesPopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElRoles(event.currentTarget);
  };

  const handleOpenActivityPopup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElActivity(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorElRoles(null);
    setAnchorElActivity(null);
    setAnchorElJoinedAt(null);
  };

  const isRolesPopupOpen = Boolean(anchorElRoles);
  const isActivityPopupOpen = Boolean(anchorElActivity);

  const handleSelectAllRoles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allRoleNames = roles.map((role: IRoles) => role.roleId);
      setSelectedRoles(allRoleNames);
    } else {
      setSelectedRoles([]);
    }
    setSelectAllRoles(event.target.checked);
  };

  const handleSelectRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roleName = event.target.value;
    const updatedSelectedRoles = selectedRoles.includes(roleName)
      ? selectedRoles.filter((role) => role !== roleName)
      : [...selectedRoles, roleName];

    setSelectedRoles(updatedSelectedRoles);
    setSelectAllRoles(updatedSelectedRoles.length === roles.length);
  };

  useEffect(() => {
    handleRoleSelectionChange(selectedRoles);
  }, [selectedRoles, handleRoleSelectionChange]);

  useEffect(() => {
    handleActivityOptionSelectionChange(selectedActivityOptions);
  }, [selectedActivityOptions, handleActivityOptionSelectionChange]);

  const handleSelectAllActivityOptions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setSelectedActivityOptions(
        activityCompositionOptions.map((option) => option.value)
      );
    } else {
      setSelectedActivityOptions([]);
    }
    setSelectAllActivityOptions(event.target.checked);
  };

  const handleSelectActivityOption = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const optionValue = event.target.value;
    const updatedSelectedOptions = selectedActivityOptions.includes(optionValue)
      ? selectedActivityOptions.filter((option) => option !== optionValue)
      : [...selectedActivityOptions, optionValue];

    setSelectedActivityOptions(updatedSelectedOptions);
    setSelectAllActivityOptions(
      updatedSelectedOptions.length === activityCompositionOptions.length
    );
  };

  const formatDate = (date: string) => {
    return moment(date).format('DD MMM YYYY');
  };

  const [anchorElJoinedAt, setAnchorElJoinedAt] =
    useState<HTMLButtonElement | null>(null);
  const [selectedSortOption, setSelectedSortOption] = useState<string>('');

  const handleOpenJoinedAtPopup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElJoinedAt(event.currentTarget);
  };

  const isJoinedAtPopupOpen = Boolean(anchorElJoinedAt);

  const handleSortOptionClick = (optionValue: string) => {
    setSelectedSortOption(optionValue);
    handleJoinedAtChange(optionValue);
    handleClosePopup();
  };

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);

    if (value.length >= 3) {
      handleUsernameChange(value);
    }
  };

  const [open, setOpen] = useState(false);
  const [rowDetail, setRowDetail] = useState<Row | undefined>();
  const handleShowDetails = (rowData: Row) => {
    setOpen(true);
    setRowDetail(rowData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Table className="border-separate border-spacing-y-2">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                style={{
                  width: `${100 / columns.length}%`,
                  borderBottom: 'none',
                  padding: '0 0',
                  whiteSpace: 'nowrap',
                }}
              >
                {column.id === 'roles' ? (
                  <>
                    <Button
                      onClick={handleOpenRolesPopup}
                      size="small"
                      variant="text"
                      sx={{ color: 'black' }}
                      endIcon={
                        isRolesPopupOpen ? (
                          <MdOutlineKeyboardArrowUp />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )
                      }
                    >
                      Roles
                    </Button>
                    <Popover
                      open={isRolesPopupOpen}
                      anchorEl={anchorElRoles}
                      onClose={handleClosePopup}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <div className="px-1 py-3">
                        <FormControlLabel
                          className="px-4 py-1"
                          control={
                            <Checkbox
                              color="secondary"
                              checked={selectAllRoles}
                              onChange={handleSelectAllRoles}
                            />
                          }
                          label={'All Roles'}
                        />
                        <p className="px-4 py-2">Show members with tags:</p>
                        {roles.map((role: IRoles) => (
                          <ListItem key={role.name}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  color="secondary"
                                  checked={selectedRoles.includes(role.roleId)}
                                  onChange={handleSelectRole}
                                  value={role.roleId}
                                />
                              }
                              label={
                                <div className="flex items-center border border-[#D1D1D1] rounded-md px-3">
                                  <span
                                    className={'w-2 h-2 rounded-full mr-2'}
                                    style={{
                                      backgroundColor:
                                        role.color !== 0
                                          ? `#${role.color
                                              .toString(16)
                                              .padStart(6, '0')}`
                                          : '#96A5A6',
                                      flexShrink: 0,
                                    }}
                                  />
                                  <div className="text-sm">{role.name}</div>
                                </div>
                              }
                            />
                          </ListItem>
                        ))}
                      </div>
                    </Popover>
                  </>
                ) : column.id === 'activityComposition' ? (
                  <>
                    <Button
                      onClick={handleOpenActivityPopup}
                      size="small"
                      variant="text"
                      sx={{ color: 'black' }}
                      endIcon={
                        isActivityPopupOpen ? (
                          <MdOutlineKeyboardArrowUp />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )
                      }
                    >
                      Activity composition
                    </Button>
                    <Popover
                      open={isActivityPopupOpen}
                      anchorEl={anchorElActivity}
                      onClose={handleClosePopup}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <div className="px-1 py-3">
                        <FormControlLabel
                          className="px-4 py-1"
                          control={
                            <Checkbox
                              color="secondary"
                              checked={selectAllActivityOptions}
                              onChange={handleSelectAllActivityOptions}
                            />
                          }
                          label={<div className="text-base">All</div>}
                        />
                        {activityCompositionOptions.map(
                          (option: IActivityCompositionOptions) => (
                            <ListItem key={option.name}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="secondary"
                                    checked={selectedActivityOptions.includes(
                                      option.value
                                    )}
                                    onChange={handleSelectActivityOption}
                                    value={option.value}
                                  />
                                }
                                label={
                                  <div className="flex items-center">
                                    <span
                                      className="w-4 h-4 rounded-full mr-1"
                                      style={{
                                        backgroundColor: option.color,
                                        flexShrink: 0,
                                      }}
                                    />
                                    <div className="text-base">
                                      {option.name}
                                    </div>
                                  </div>
                                }
                              />
                            </ListItem>
                          )
                        )}
                      </div>
                    </Popover>
                  </>
                ) : column.id === 'joinedAt' ? (
                  <>
                    <Button
                      onClick={handleOpenJoinedAtPopup}
                      size="small"
                      variant="text"
                      sx={{ color: 'black' }}
                      endIcon={
                        isJoinedAtPopupOpen ? (
                          <MdOutlineKeyboardArrowUp />
                        ) : (
                          <MdOutlineKeyboardArrowDown />
                        )
                      }
                    >
                      {column.label}
                    </Button>
                    <Popover
                      open={isJoinedAtPopupOpen}
                      anchorEl={anchorElJoinedAt}
                      onClose={handleClosePopup}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <List>
                        <ListItem
                          button
                          onClick={() => handleSortOptionClick('desc')}
                          selected={selectedSortOption === 'desc'}
                        >
                          <ListItemText primary="Newest members" />
                        </ListItem>
                        <ListItem
                          button
                          onClick={() => handleSortOptionClick('asc')}
                          selected={selectedSortOption === 'asc'}
                        >
                          <ListItemText primary="Oldest members" />
                        </ListItem>
                      </List>
                    </Popover>
                  </>
                ) : column.id === 'username' ? (
                  <div className="flex flex-row items-center">
                    <span>Name</span>
                    <TextField
                      variant="standard"
                      placeholder={'Search member'}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: <MdSearch color="disabled" size={25} />,
                        sx: {
                          backgroundColor: '#F5F5F5',
                          padding: '0 0.4rem',
                          borderRadius: '4px',
                        },
                      }}
                      value={searchText}
                      onChange={handleSearchChange}
                      sx={{ marginLeft: '8px' }}
                    />
                  </div>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                key={columns.length}
                colSpan={columns.length}
                align="center"
                sx={{ border: 'none' }}
              >
                <div className="flex items-center justify-center h-40">
                  <Loading />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data && data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={`my-5 ${
                      index % 2 === 0
                        ? 'bg-gray-100'
                        : 'border-1 border-solid border-gray-700'
                    }`}
                  >
                    {columns.map((column, columnIndex) => (
                      <TableCell
                        key={column.id}
                        style={{
                          width: `${100 / columns.length}%`,
                          border:
                            index % 2 === 0 ? 'none' : '1px solid #F5F5F5',
                        }}
                        className={`px-1 first:px-3 py-4 first:rounded-l-md first:border-r-0 last:rounded-r-md last:border-l-0 ${
                          columnIndex === 1 || columnIndex === 2
                            ? 'border-l-0 border-r-0'
                            : ''
                        }`}
                      >
                        {column.id === 'username' ? (
                          <div className="flex items-center space-x-4">
                            <Avatar
                              src={`${conf.DISCORD_CDN}avatars/${row.discordId}/${row?.avatar}.png`}
                              alt="User Avatar"
                            />
                            <span className="ml-2 font-semibold text-base">
                              {row[column.id]}
                            </span>
                          </div>
                        ) : column.id === 'roles' ? (
                          <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row flex-wrap md:space-x-1">
                            {row.roles.length > 0 ? (
                              <>
                                {row.roles.slice(0, 1).map((role: IRoles) => (
                                  <div
                                    key={role.roleId}
                                    className="flex flex-row flex-wrap"
                                    style={{ whiteSpace: 'nowrap' }}
                                  >
                                    <span
                                      className="bg-white p-1 px-2 rounded-[4px] border border-[#D1D1D1] text-xs"
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor:
                                          role.color !== 0
                                            ? `#${role.color
                                                .toString(16)
                                                .padStart(6, '0')}`
                                            : '#96A5A6',
                                      }}
                                    >
                                      <span
                                        className="w-2 h-2 rounded-full mr-1"
                                        style={{
                                          backgroundColor:
                                            role.color !== 0
                                              ? `#${role.color
                                                  .toString(16)
                                                  .padStart(6, '0')}`
                                              : '#96A5A6',
                                          flexShrink: 0,
                                        }}
                                      />
                                      {role.name}
                                    </span>
                                  </div>
                                ))}
                                {row.roles.length > 1 && (
                                  <div
                                    className="flex flex-row flex-wrap"
                                    onClick={() => handleShowDetails(row)}
                                  >
                                    <span
                                      className="bg-white p-1 rounded-[4px] border border-[#D1D1D1] text-xs cursor-pointer"
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#AAAAAA',
                                      }}
                                    >
                                      +{row.roles.length - 1}
                                    </span>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="flex flex-row flex-wrap">
                                <span
                                  className="bg-white p-1 px-2 rounded-[4px] border border-[#D1D1D1] text-xs"
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: '#AAAAAA',
                                  }}
                                >
                                  <span className="w-2 h-2 rounded-full mr-1" />
                                  None
                                </span>
                              </div>
                            )}
                          </div>
                        ) : column.id === 'activityComposition' ? (
                          <div className="flex flex-row flex-wrap">
                            {row.activityComposition &&
                            row.activityComposition.length > 0 ? (
                              <>
                                {row.activityComposition
                                  .slice(0, 1)
                                  .map((composition: string) => {
                                    const matchedOption =
                                      activityCompositionOptions.find(
                                        (option) => option.name === composition
                                      );
                                    const backgroundColor = matchedOption
                                      ? matchedOption.color
                                      : '#96A5A6';

                                    return (
                                      <div
                                        key={composition}
                                        className="flex flex-row flex-wrap items-center mr-1 mb:2 md:mb-0 whitespace-nowrap"
                                      >
                                        <span
                                          className="bg-white p-1 px-2 rounded-[4px] border border-[#D1D1D1] text-xs mb-1 md:mb-0 flex items-center"
                                          style={{
                                            backgroundColor: backgroundColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <span
                                            className="w-2 h-2 rounded-full mr-2"
                                            style={{
                                              backgroundColor: backgroundColor,
                                              flexShrink: 0,
                                            }}
                                          />
                                          {composition}
                                        </span>
                                      </div>
                                    );
                                  })}
                                {row.activityComposition.length > 1 && (
                                  <div
                                    className="flex flex-row flex-wrap"
                                    onClick={() => handleShowDetails(row)}
                                  >
                                    <span
                                      className="bg-white px-1 rounded-[4px] border border-[#D1D1D1] text-xs flex items-center cursor-pointer"
                                      style={{
                                        backgroundColor: '#96A5A6',
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      +{row.activityComposition.length - 1}
                                    </span>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="flex flex-row flex-wrap items-center">
                                <span
                                  className="bg-white p-1 px-2 rounded-[4px] border border-[#D1D1D1] text-xs flex items-center"
                                  style={{
                                    backgroundColor: '#96A5A6',
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <span
                                    className="w-2 h-2 rounded-full mr-2"
                                    style={{
                                      backgroundColor: '#96A5A6',
                                      flexShrink: 0,
                                    }}
                                  />
                                  other
                                </span>
                              </div>
                            )}
                          </div>
                        ) : column.id === 'joinedAt' ? (
                          formatDate(row.joinedAt)
                        ) : (
                          row[column.id]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    key={columns.length}
                    colSpan={columns.length}
                    align="center"
                    style={{
                      border: 'none',
                    }}
                    className="bg-gray-100 py-8 rounded-md font-semibold"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <CustomDialogDetail
        sx={{
          '& .MuiDialog-container': {
            verticalAlign: 'top',
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '650px',
              borderRadius: '10px',
            },
          },
        }}
        open={open}
        onClose={handleClose}
        rowDetail={rowDetail}
        options={activityCompositionOptions}
      />
    </>
  );
};

export default CustomTable;
