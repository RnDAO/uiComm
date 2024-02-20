import {
  Autocomplete,
  Chip,
  FormControl,
  FormControlLabel,
  ListItem,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';

import Loading from '../Loading';
import { IRolesPayload } from '../../pages/statistics/memberBreakdowns/CustomTable';
import TcButton from '../../shared/TcButton';
import TcCheckbox from '../../shared/TcCheckbox';
import TcInput from '../../shared/TcInput';
import TcPopover from '../../shared/TcPopover';
import TcText from '../../shared/TcText';
import { useToken } from '../../../context/TokenContext';
import { debounce, hexToRGBA, isDarkColor } from '../../../helpers/helper';
import useAppStore from '../../../store/useStore';
import { FetchedData, IRoles } from '../../../utils/interfaces';

function createPayload(
  includeExclude: 'include' | 'exclude',
  selectedRoles: string[]
): IRolesPayload {
  if (!Array.isArray(selectedRoles)) {
    throw new Error('selectedRoles must be an array of strings');
  }

  const payload: IRolesPayload = {
    allRoles: false,
  };

  if (includeExclude === 'exclude') {
    payload.exclude = selectedRoles;
  } else {
    payload.include = selectedRoles;
  }

  return payload;
}

interface IFilterRolesPopover {
  handleSelectedRoles: (payload: IRolesPayload) => void;
}

function FilterRolesPopover({ handleSelectedRoles }: IFilterRolesPopover) {
  const [isRolesPopupOpen, setIsRolesPopupOpen] = useState<boolean>(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsRolesPopupOpen(true);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClosePopover = () => {
    setIsRolesPopupOpen(false);
    setAnchorEl(null);
  };

  const [includeExclude, setIncludeExclude] = useState<'include' | 'exclude'>(
    'include'
  );

  const handleIncludeExcludeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;

    if (newValue === 'include' || newValue === 'exclude') {
      setIncludeExclude(newValue);
    }
  };

  const { retrievePlatformProperties } = useAppStore();
  const { community } = useToken();

  const platformId = community?.platforms.find(
    (platform) => platform.disconnectedAt === null
  )?.id;

  const [loading, setLoading] = useState<boolean>(false);

  const [fetchedRoles, setFetchedRoles] = useState<FetchedData>({
    limit: 8,
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  });
  const [page, setPage] = useState<number>(1);
  const [filteredRolesByName, setFilteredRolesByName] = useState<string>('');

  const fetchDiscordRoles = async (
    platformId: string,
    page?: number,
    limit?: number,
    name?: string
  ) => {
    try {
      setLoading(true);
      const fetchedRoles = await retrievePlatformProperties({
        platformId,
        name: name,
        property: 'role',
        page: page,
        limit: limit,
      });

      if (name) {
        setFilteredRolesByName(name);
        setFetchedRoles(fetchedRoles);
      } else {
        setFetchedRoles((prevData) => {
          const updatedResults = [
            ...prevData.results,
            ...fetchedRoles.results,
          ].filter(
            (role, index, self) =>
              index === self.findIndex((r) => r.id === role.id)
          );

          return {
            ...prevData,
            ...fetchedRoles,
            results: updatedResults,
          };
        });
      }
      setLoading(false);
    } catch (error) {}
  };

  const handleClearAll = () => {
    if (!platformId) return;
    fetchDiscordRoles(platformId, fetchedRoles.page, fetchedRoles.limit);
  };

  const debouncedFetchDiscordRoles = debounce(fetchDiscordRoles, 700);

  useEffect(() => {
    if (!platformId) return;
    fetchDiscordRoles(platformId, fetchedRoles.page, fetchedRoles.limit);
  }, []);

  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const element = scrollableDivRef.current;
    if (!element) return;

    const hasReachedBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;

    const hasMoreRolesToLoad =
      fetchedRoles.page * fetchedRoles.limit <= fetchedRoles.totalResults;

    if (!platformId) return;

    if (hasReachedBottom && hasMoreRolesToLoad) {
      const nextPage = fetchedRoles.page + 1;
      if (filteredRolesByName) {
        fetchDiscordRoles(
          platformId,
          nextPage,
          fetchedRoles.limit,
          filteredRolesByName
        );
      } else {
        fetchDiscordRoles(platformId, nextPage, fetchedRoles.limit);
      }
      setPage(nextPage);
    }
  };

  const [selectedRoles, setSelectedRoles] = useState<IRoles[]>([]);

  useEffect(() => {
    let payload;

    if (selectedRoles.length !== 0) {
      const roleIds = selectedRoles.map((role) => role.roleId.toString());

      payload = createPayload(includeExclude, roleIds);
    } else {
      payload = { allRoles: true };
    }

    handleSelectedRoles(payload);
  }, [selectedRoles, includeExclude]);

  const toggleRole = (role: IRoles) => {
    setSelectedRoles((prevSelectedRoles) => {
      const isRoleSelected = prevSelectedRoles.some(
        (selectedRole) => selectedRole.id === role.id
      );

      if (isRoleSelected) {
        return prevSelectedRoles.filter(
          (selectedRole) => selectedRole.id !== role.id
        );
      } else {
        return [...prevSelectedRoles, role];
      }
    });
    setFilteredRolesByName('');
  };

  const [isAutocompleteOpen, setAutocompleteOpen] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (!platformId) return;

    if (inputValue === '') {
      setFilteredRolesByName('');
      setFetchedRoles({
        limit: 8,
        page: 1,
        results: [],
        totalPages: 0,
        totalResults: 0,
      });

      debouncedFetchDiscordRoles(platformId, 1, 8);
    } else {
      debouncedFetchDiscordRoles(platformId, 1, 100, inputValue);
    }
  };

  return (
    <div>
      <TcButton
        text='Roles'
        className='text-black'
        endIcon={
          isRolesPopupOpen ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )
        }
        sx={{
          width: 'auto',
        }}
        onClick={handleButtonClick}
      />
      <TcPopover
        open={isRolesPopupOpen}
        anchorEl={anchorEl}
        sx={{ maxWidth: '340px' }}
        content={
          <div className='flex flex-col space-y-2 px-4 py-2'>
            {selectedRoles.length > 0 && (
              <FormControl component='fieldset'>
                <RadioGroup
                  row
                  aria-label='role-filter'
                  name='role-filter'
                  value={includeExclude}
                  onChange={handleIncludeExcludeChange}
                >
                  <FormControlLabel
                    value='include'
                    control={<Radio />}
                    label={<TcText text='Include' variant='body2' />}
                    className='w-1/2'
                  />
                  <FormControlLabel
                    value='exclude'
                    control={<Radio />}
                    label={<TcText text='Exclude' variant='body2' />}
                  />
                </RadioGroup>
              </FormControl>
            )}
            <FormControl>
              <Autocomplete
                multiple
                id='tags-filled'
                options={fetchedRoles.results}
                freeSolo
                open={isAutocompleteOpen}
                sx={{
                  minWidth: 'auto',
                }}
                value={selectedRoles}
                onChange={(event, newValue) => {
                  setSelectedRoles(newValue);
                  if (newValue.length === 0) {
                    handleClearAll();
                  }
                }}
                onInputChange={(event, value, reason) => {
                  if (reason === 'clear') {
                    handleClearAll();
                  }
                }}
                getOptionLabel={(option) => option.name}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant='outlined'
                      label={option.name}
                      size='small'
                      sx={{
                        borderRadius: '4px',
                        borderColor: hexToRGBA(
                          option.color !== 0
                            ? `#${option.color.toString(16).padStart(6, '0')}`
                            : '#96A5A6',
                          1
                        ),
                        backgroundColor: hexToRGBA(
                          option.color !== 0
                            ? `#${option.color.toString(16).padStart(6, '0')}`
                            : '#96A5A6',
                          0.8
                        ),
                        color: isDarkColor(option.color) ? 'white' : 'black',
                      }}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TcInput
                    sx={{
                      minWidth: 'auto',
                    }}
                    {...params}
                    variant='filled'
                    label='Roles'
                    placeholder='Select one or more roles'
                    value={filteredRolesByName}
                    onChange={handleSearchChange}
                  />
                )}
              />
            </FormControl>
            <div
              ref={scrollableDivRef}
              className='max-h-[300px] min-w-[250px] overflow-y-auto overflow-x-hidden rounded-md border border-gray-200 p-1'
              onScroll={handleScroll}
            >
              {fetchedRoles && fetchedRoles.results.length > 0 ? (
                <>
                  <TcText text='Show members with roles:' className='p-1' />
                  {fetchedRoles?.results?.map((role: IRoles) => (
                    <ListItem
                      key={`${role.id}-${role.name}`}
                      className='w-full'
                    >
                      <FormControlLabel
                        control={
                          <TcCheckbox
                            color='secondary'
                            checked={selectedRoles.some(
                              (selectedRole) => selectedRole.id === role.id
                            )}
                            onChange={() => toggleRole(role)}
                          />
                        }
                        label={
                          role ? (
                            <Chip
                              variant='outlined'
                              label={role.name}
                              size='small'
                              sx={{
                                borderRadius: '4px',
                                borderColor: hexToRGBA(
                                  role.color !== 0
                                    ? `#${role.color
                                        .toString(16)
                                        .padStart(6, '0')}`
                                    : '#96A5A6',
                                  1
                                ),
                                backgroundColor: hexToRGBA(
                                  role.color !== 0
                                    ? `#${role.color
                                        .toString(16)
                                        .padStart(6, '0')}`
                                    : '#96A5A6',
                                  0.8
                                ),
                                color: isDarkColor(role.color)
                                  ? 'white'
                                  : 'black',
                              }}
                            />
                          ) : (
                            ''
                          )
                        }
                        className='flex w-full justify-start'
                      />
                    </ListItem>
                  ))}
                </>
              ) : (
                <TcText text='Role not found' className='py-5 text-center' />
              )}
              {loading ? <Loading height='20' size={20} /> : ''}
            </div>
          </div>
        }
        onClose={handleClosePopover}
      />
    </div>
  );
}

export default FilterRolesPopover;
