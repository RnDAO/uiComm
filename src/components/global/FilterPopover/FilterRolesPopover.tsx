import React, { useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import Loading from '../Loading';

import TcButton from '../../shared/TcButton';
import TcPopover from '../../shared/TcPopover';
import TcCheckbox from '../../shared/TcCheckbox';

import useAppStore from '../../../store/useStore';
import { useToken } from '../../../context/TokenContext';
import { FetchedData, IRoles } from '../../../utils/interfaces';
import TcText from '../../shared/TcText';
import { IRolesPayload } from '../../pages/statistics/memberBreakdowns/CustomTable';

interface Payload {
  allRoles: boolean;
  exclude?: string[];
  include?: string[];
}

function createPayload(
  includeExclude: 'include' | 'exclude',
  selectedRoles: string[]
): Payload {
  if (!Array.isArray(selectedRoles)) {
    throw new Error('selectedRoles must be an array of strings');
  }

  const payload: Payload = {
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
  const { retrievePlatformProperties } = useAppStore();
  const { community } = useToken();
  const platformId = community?.platforms[0]?.id;

  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<FetchedData>({
    limit: 8,
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  });
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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

  const isRolesPopupOpen = Boolean(anchorEl);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setPopoverOpen(false);
    setAnchorEl(null);
  };

  const loadMoreRoles = async () => {
    setLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);

    const fetchedRoles = await retrievePlatformProperties({
      platformId,
      property: 'role',
      page: nextPage,
      limit: roles.limit,
    });

    const newRoles = fetchedRoles.results.filter(
      (fetchedRole: IRoles) =>
        !roles.results.some((role) => role.id === fetchedRole.id)
    );

    setRoles((prevRoles) => ({
      ...fetchedRoles,
      results: [...prevRoles.results, ...newRoles],
    }));
    setLoading(false);
  };

  const fetchRoles = async (name?: string) => {
    const fetchedRoles = await retrievePlatformProperties({
      platformId,
      property: 'role',
      page: roles?.page,
      limit: roles?.limit,
    });
    setRoles(fetchedRoles);
  };

  const handleScroll = () => {
    const element = scrollableDivRef.current;
    if (!element) return;

    const hasReachedBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    const hasMoreRolesToLoad = roles.page * roles.limit <= roles.totalResults;

    if (hasReachedBottom && hasMoreRolesToLoad) {
      loadMoreRoles();
    }
  };

  const handleSelectedRole = (
    event: React.ChangeEvent<HTMLInputElement>,
    role: IRoles
  ) => {
    const roleId = role.roleId;
    setSelectedRoles((prev) =>
      event.target.checked
        ? [...prev, roleId]
        : prev.filter((id) => id !== roleId)
    );
  };

  const handleAutocompleteChange = (
    event: React.ChangeEvent<{}>,
    newValue: IRoles[]
  ) => {
    setSelectedRoles(newValue.map((role) => role.roleId));
  };

  useEffect(() => {
    let payload;

    if (selectedRoles.length !== 0) {
      payload = createPayload(includeExclude, selectedRoles);
    } else {
      payload = { allRoles: true };
    }

    handleSelectedRoles(payload);
  }, [selectedRoles, includeExclude]);

  useEffect(() => {
    if (!platformId) return;
    fetchRoles();
  }, [platformId]);

  const renderRoleItem = (option: IRoles) => (
    <div className="flex items-center border bg-white border-[#D1D1D1] rounded-md px-3">
      <span
        className="w-2 h-2 rounded-full mr-2"
        style={{
          backgroundColor:
            option.color !== 0
              ? `#${option.color.toString(16).padStart(6, '0')}`
              : '#96A5A6',
          flexShrink: 0,
        }}
      />
      <div className="text-sm whitespace-nowrap">{option.name}</div>
    </div>
  );

  return (
    <>
      <TcButton
        text={'Roles'}
        className="text-black"
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
        open={popoverOpen}
        anchorEl={anchorEl}
        sx={{ maxWidth: '340px' }}
        content={
          <div className="px-4 flex flex-col space-y-2">
            {selectedRoles.length > 0 ? (
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="role-filter"
                  name="role-filter"
                  value={includeExclude}
                  onChange={handleIncludeExcludeChange}
                >
                  <FormControlLabel
                    value="include"
                    control={<Radio />}
                    label={<TcText text="Include" variant="body2" />}
                    className="w-1/2"
                  />
                  <FormControlLabel
                    value="exclude"
                    control={<Radio />}
                    label={<TcText text="Exclude" variant="body2" />}
                  />
                </RadioGroup>
              </FormControl>
            ) : (
              <div className="py-2" />
            )}
            <FormControl className="bg-gray-100">
              <Autocomplete
                multiple
                id="tags-outlined"
                options={roles.results}
                getOptionLabel={(option) => option.name}
                value={roles.results.filter((role) =>
                  selectedRoles.includes(role.roleId)
                )}
                onChange={handleAutocompleteChange}
                renderOption={(props, option) => (
                  <li {...props}>{renderRoleItem(option)}</li>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => renderRoleItem(option))
                }
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ minWidth: 'auto' }}
                    label="Select one or more roles"
                  />
                )}
              />
            </FormControl>
            <div
              ref={scrollableDivRef}
              className="border max-h-[300px] overflow-y-auto border-gray-200 rounded-md p-1"
              onScroll={handleScroll}
            >
              <TcText text="Show members with roles:" className="p-1" />
              {roles?.results?.map((role: IRoles) => (
                <ListItem key={`${role.id}-${role.name}`}>
                  <FormControlLabel
                    control={
                      <TcCheckbox
                        color="secondary"
                        checked={selectedRoles.includes(role.roleId)}
                        onChange={(e) => handleSelectedRole(e, role)}
                      />
                    }
                    label={renderRoleItem(role)}
                  />
                </ListItem>
              ))}
              {loading ? <Loading /> : ''}
            </div>
          </div>
        }
        onClose={handleClosePopover}
      />
    </>
  );
}

export default FilterRolesPopover;
