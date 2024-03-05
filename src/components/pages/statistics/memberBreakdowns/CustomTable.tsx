import {
  Avatar,
  Button,
  Checkbox,
  ClickAwayListener,
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
  Tooltip,
} from '@mui/material';
import moment from 'moment';
import router from 'next/router';
import { useEffect, useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdSearch,
} from 'react-icons/md';

import CustomDialogDetail from './CustomDialogDetail';
import { conf } from '../../../../configs';
import useAppStore from '../../../../store/useStore';
import {
  Column,
  IActivityCompositionOptions,
  IRoles,
  Row,
} from '../../../../utils/interfaces';
import FilterRolesPopover from '../../../global/FilterPopover/FilterRolesPopover';
import Loading from '../../../global/Loading';

export interface IRolesPayload {
  allRoles: boolean;
  exclude?: string[];
  include?: string[];
}

interface CustomTableProps {
  data: Row[];
  columns: Column[];
  isLoading: boolean;
  breakdownName?: string;
  activityCompositionOptions: IActivityCompositionOptions[];
  handleRoleSelectionChange: (rolesPayload: IRolesPayload) => void;
  handleActivityOptionSelectionChange: (selectedRoles: string[]) => void;
  handleJoinedAtChange: (joinedAt: string) => void;
  handleUsernameChange: (userName: string) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  isLoading,
  breakdownName,
  handleActivityOptionSelectionChange,
  handleRoleSelectionChange,
  handleJoinedAtChange,
  handleUsernameChange,
  activityCompositionOptions,
}) => {
  const { roles } = useAppStore();

  const [anchorElRoles, setAnchorElRoles] = useState<HTMLButtonElement | null>(
    null
  );
  const [anchorElActivity, setAnchorElActivity] =
    useState<HTMLButtonElement | null>(null);

  const [selectedActivityOptions, setSelectedActivityOptions] = useState<
    string[]
  >(activityCompositionOptions.map((option) => option.value));
  const [selectAllActivityOptions, setSelectAllActivityOptions] =
    useState(true);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

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

  const isActivityPopupOpen = Boolean(anchorElActivity);

  const handleSelectedRoles = (payload: IRolesPayload) => {
    handleRoleSelectionChange(payload);
  };

  useEffect(() => {
    handleActivityOptionSelectionChange(selectedActivityOptions);
  }, [selectedActivityOptions]);

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
    handleUpdateRouterQueries();
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
    handleUpdateRouterQueries();
  };

  const handleUpdateRouterQueries = () => {
    const queries = router.query;

    if (queries.filter && typeof queries.filter === 'string') {
      const filters = JSON.parse(queries?.filter);
      const updatedFilters = filters.filter(
        (el: any) => el.filterType !== breakdownName
      );
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            filter: JSON.stringify(updatedFilters),
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
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
    } else if (value.length === 0) {
      handleUsernameChange('');
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

  useEffect(() => {
    const queries = router.query;
    if (queries.filter && typeof queries.filter === 'string') {
      const filter = JSON.parse(queries?.filter);
      if (filter) {
        // Search for the first element that matches the 'filterType'
        const matchedFilter = filter.find(
          (el: any) => el.filterType === breakdownName
        );

        if (matchedFilter) {
          const matchedLabel = matchedFilter.label.toLowerCase();

          // Search for the first 'option' that matches the 'label' in 'matchedFilter'
          const matchedOption = activityCompositionOptions.find(
            (activityCompositionOption) =>
              activityCompositionOption.name.toLowerCase() === matchedLabel
          );

          if (matchedOption) {
            const matchedValue = matchedOption.value;

            setSelectedActivityOptions([matchedValue]);
          }
          setSelectAllActivityOptions(false);
        }
      }
    }
  }, [router.query]);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  return (
    <>
      <Table className='border-separate border-spacing-y-2'>
        <TableHead>
          <TableRow>
            {columns.map((column, columnIndex) => (
              <TableCell
                key={column.id}
                style={{
                  width:
                    columnIndex === 0 ? '40%' : `${60 / (columns.length - 1)}%`,
                  borderBottom: 'none',
                  padding: '0 0',
                  whiteSpace: 'nowrap',
                }}
              >
                {column.id === 'roles' ? (
                  <>
                    <FilterRolesPopover
                      handleSelectedRoles={handleSelectedRoles}
                    />
                  </>
                ) : column.id === 'activityComposition' ? (
                  <>
                    <Button
                      onClick={handleOpenActivityPopup}
                      size='small'
                      variant='text'
                      sx={{ color: 'black', minWidth: '64px' }}
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
                      <div className='px-1 py-3'>
                        <FormControlLabel
                          className='px-4 py-1'
                          control={
                            <Checkbox
                              color='secondary'
                              checked={selectAllActivityOptions}
                              onChange={handleSelectAllActivityOptions}
                            />
                          }
                          label={<div className='text-base'>All</div>}
                        />
                        {activityCompositionOptions.map(
                          (option: IActivityCompositionOptions) => (
                            <ListItem key={`${option.name}${option.name}`}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color='secondary'
                                    checked={selectedActivityOptions.includes(
                                      option.value
                                    )}
                                    onChange={handleSelectActivityOption}
                                    value={option.value}
                                  />
                                }
                                label={
                                  <div className='flex items-center'>
                                    <span
                                      className='mr-1 h-4 w-4 rounded-full'
                                      style={{
                                        backgroundColor: option.color,
                                        flexShrink: 0,
                                      }}
                                    />
                                    <div className='text-base'>
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
                      size='small'
                      variant='text'
                      sx={{ color: 'black', minWidth: '64px' }}
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
                          key='desc'
                          onClick={() => handleSortOptionClick('desc')}
                          selected={selectedSortOption === 'desc'}
                        >
                          <ListItemText primary='Newest members' />
                        </ListItem>
                        <ListItem
                          button
                          key='asc'
                          onClick={() => handleSortOptionClick('asc')}
                          selected={selectedSortOption === 'asc'}
                        >
                          <ListItemText primary='Oldest members' />
                        </ListItem>
                      </List>
                    </Popover>
                  </>
                ) : column.id === 'username' ? (
                  <div className='flex flex-row items-center'>
                    <span>Name</span>
                    <TextField
                      variant='standard'
                      placeholder='Search member'
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: <MdSearch color='disabled' size={25} />,
                        sx: {
                          backgroundColor: '#F5F5F5',
                          padding: '0 0.4rem',
                          borderRadius: '4px',
                        },
                      }}
                      value={searchText}
                      onChange={handleSearchChange}
                      sx={{ marginLeft: '8px', minWidth: 'auto' }}
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
                align='center'
                sx={{ border: 'none' }}
              >
                <div className='flex h-40 items-center justify-center'>
                  <Loading />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data && data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow
                    key={`${row.id} ${index}`}
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
                          width:
                            columnIndex === 0
                              ? '40%'
                              : `${60 / (columns.length - 1)}%`,
                          border:
                            index % 2 === 0 ? 'none' : '1px solid #F5F5F5',
                        }}
                        className={`px-1 py-4 first:rounded-l-md first:border-r-0 first:px-3 last:rounded-r-md last:border-l-0 ${
                          columnIndex === 1 || columnIndex === 2
                            ? 'border-l-0 border-r-0'
                            : ''
                        }`}
                      >
                        {column.id === 'username' ? (
                          <div className='flex items-center space-x-4'>
                            <Avatar
                              src={
                                row.discordId && row?.avatar
                                  ? `${conf.DISCORD_CDN}avatars/${row.discordId}/${row?.avatar}.png`
                                  : ''
                              }
                              alt='User Avatar'
                            />
                            <p className='flex flex-row space-x-1.5 whitespace-nowrap'>
                              <span className='text-base font-semibold'>
                                {row.ngu}
                              </span>
                              {row[column.id].length > 10 ? (
                                <ClickAwayListener
                                  onClickAway={handleTooltipClose}
                                >
                                  <Tooltip
                                    title={row[column.id]}
                                    placement='top'
                                    enterTouchDelay={0}
                                  >
                                    <span className='cursor-pointer text-base text-gray-subtitle'>
                                      {`${row[column.id].slice(0, 3)}...${row[
                                        column.id
                                      ].slice(-4)}`}
                                    </span>
                                  </Tooltip>
                                </ClickAwayListener>
                              ) : (
                                <span className='text-base text-gray-subtitle'>
                                  {row[column.id]}
                                </span>
                              )}
                            </p>
                          </div>
                        ) : column.id === 'roles' ? (
                          <div className='flex flex-col flex-wrap space-y-1 md:flex-row md:space-y-0'>
                            {row.roles.length > 0 ? (
                              <>
                                {row.roles.slice(0, 1).map((role: IRoles) => (
                                  <div
                                    key={role.roleId}
                                    className='flex flex-row flex-wrap'
                                    style={{ whiteSpace: 'nowrap' }}
                                  >
                                    <span
                                      className='mb-1 mr-1 rounded-[4px] border border-[#D1D1D1] bg-white p-1 px-2 text-xs'
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
                                        className='mr-1 h-2 w-2 rounded-full'
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
                                    className='flex flex-row flex-wrap'
                                    onClick={() => handleShowDetails(row)}
                                  >
                                    <span
                                      className='mb-1 mr-1 cursor-pointer rounded-[4px] border border-[#D1D1D1] bg-white p-1 text-xs'
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
                              <div className='flex flex-row flex-wrap'>
                                <span
                                  className='rounded-[4px] border border-[#D1D1D1] bg-white p-1 px-2 text-xs'
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: '#AAAAAA',
                                  }}
                                >
                                  <span className='mr-1 h-2 w-2 rounded-full' />
                                  None
                                </span>
                              </div>
                            )}
                          </div>
                        ) : column.id === 'activityComposition' ? (
                          <div className='flex flex-row flex-wrap'>
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
                                        className='mb:2 mr-1 flex flex-row flex-wrap items-center whitespace-nowrap md:mb-0'
                                      >
                                        <span
                                          className='mb-1 flex items-center rounded-[4px] border border-[#D1D1D1] bg-white p-1 px-2 text-xs md:mb-0'
                                          style={{
                                            backgroundColor: backgroundColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <span
                                            className='mr-2 h-2 w-2 rounded-full'
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
                                    className='flex flex-row flex-wrap'
                                    onClick={() => handleShowDetails(row)}
                                  >
                                    <span
                                      className='flex cursor-pointer items-center rounded-[4px] border border-[#D1D1D1] bg-white px-1 text-xs'
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
                              <div className='flex flex-row flex-wrap items-center'>
                                <span
                                  className='flex items-center rounded-[4px] border border-[#D1D1D1] bg-white p-1 px-2 text-xs'
                                  style={{
                                    backgroundColor: '#96A5A6',
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <span
                                    className='mr-2 h-2 w-2 rounded-full'
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
                    align='center'
                    style={{
                      border: 'none',
                    }}
                    className='rounded-md bg-gray-100 py-8 font-semibold'
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
