import React, { useEffect, useState } from 'react';
import { useToken } from '../../../../context/TokenContext';
import useAppStore from '../../../../store/useStore';
import { FetchedData, IRoles } from '../../../../utils/interfaces';
import { debounce } from '../../../../helpers/helper';
import TcAutocomplete from '../../../shared/TcAutocomplete';
import { Chip, CircularProgress } from '@mui/material';

interface ITcRolesAutoCompleteProps {
  isEdit?: boolean;
  privateSelectedRoles?: IRoles[];
  isDisabled: boolean;
  handleSelectedUsers: (roles: IRoles[]) => void;
}

function TcRolesAutoComplete({
  isEdit = false,
  privateSelectedRoles,
  isDisabled,
  handleSelectedUsers,
}: ITcRolesAutoCompleteProps) {
  const { community } = useToken();

  const platformId = community?.platforms.find(
    (platform) => platform.disconnectedAt === null
  )?.id;

  const { retrievePlatformProperties } = useAppStore();
  const [selectedRoles, setSelectedRoles] = useState<IRoles[]>([]);

  const [fetchedRoles, setFetchedRoles] = useState<FetchedData>({
    limit: 8,
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  });
  const [filteredRolesByName, setFilteredRolesByName] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDiscordRoles = async (
    platformId: string,
    page?: number,
    limit?: number,
    name?: string
  ) => {
    try {
      setIsLoading(true);

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
        setFetchedRoles((prevData: { results: any }) => {
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
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!platformId) return;
    fetchDiscordRoles(platformId, fetchedRoles.page, fetchedRoles.limit);
  }, []);

  const debouncedFetchDiscordRoles = debounce(fetchDiscordRoles, 700);

  const handleSearchChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;

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

      debouncedFetchDiscordRoles(platformId, 1, 100);
    } else {
      debouncedFetchDiscordRoles(platformId, 1, 100, inputValue);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.clientHeight ===
      listboxNode.scrollHeight
    ) {
      const nextPage =
        Math.ceil(fetchedRoles.results.length / fetchedRoles.limit) + 1;
      if (fetchedRoles.totalPages >= nextPage) {
        if (!platformId) return;
        fetchDiscordRoles(platformId, nextPage, fetchedRoles.limit);
      }
    }
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any[]
  ): void => {
    setSelectedRoles(value);
  };

  useEffect(() => {
    if (!selectedRoles) return;
    handleSelectedUsers(selectedRoles);
  }, [selectedRoles]);

  useEffect(() => {
    if (isEdit && !isInitialized) {
      if (privateSelectedRoles !== undefined) {
        setSelectedRoles(privateSelectedRoles);
      } else {
        setSelectedRoles([]);
      }
      setIsInitialized(true);
    }
  }, [privateSelectedRoles, isEdit, isInitialized]);

  return (
    <TcAutocomplete
      options={fetchedRoles.results}
      getOptionLabel={(option) => option.name}
      label={'Select Role(s)'}
      multiple={true}
      loading={isLoading}
      loadingText={
        <div className='text-center'>
          <CircularProgress size={24} />
        </div>
      }
      disabled={isDisabled}
      value={selectedRoles}
      onChange={handleChange}
      onInputChange={handleSearchChange}
      isOptionEqualToValue={(option, value) => option.roleId === value.roleId}
      disableCloseOnSelect
      renderOption={(props, option) => (
        <li {...props} key={option.roleId}>
          {option.name}
        </li>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant='outlined'
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    height: '8px',
                    width: '8px',
                    backgroundColor:
                      option.color !== 0
                        ? `#${option.color.toString(16).padStart(6, '0')}`
                        : '#96A5A6',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '5px',
                  }}
                />
                {option.name}
              </div>
            }
            size='small'
            sx={{
              borderRadius: '4px',
              borderColor: '#D1D1D1',
              backgroundColor: 'white',
              color: 'black',
            }}
            {...getTagProps({ index })}
          />
        ))
      }
      textFieldProps={{ variant: 'filled' }}
      ListboxProps={{
        onScroll: handleScroll,
        style: {
          maxHeight: '280px',
          overflow: 'auto',
        },
      }}
    />
  );
}

export default TcRolesAutoComplete;
