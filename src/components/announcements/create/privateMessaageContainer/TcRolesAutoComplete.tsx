import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TcAutocomplete from '../../../shared/TcAutocomplete';
import useAppStore from '../../../../store/useStore';
import { FetchedData, IRoles } from '../../../../utils/interfaces';
import { useToken } from '../../../../context/TokenContext';
import { debounce, hexToRGBA, isDarkColor } from '../../../../helpers/helper';

interface ITcRolesAutoCompleteProps {
  isDisabled: boolean;
  handleSelectedUsers: (roles: IRoles[]) => void;
}

function TcRolesAutoComplete({
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

  const fetchDiscordRoles = async (
    platformId: string,
    page?: number,
    limit?: number,
    name?: string
  ) => {
    try {
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
    } catch (error) {}
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

      debouncedFetchDiscordRoles(platformId, 1, 8);
    } else {
      debouncedFetchDiscordRoles(platformId, 1, 8, inputValue);
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

  return (
    <TcAutocomplete
      options={fetchedRoles.results}
      getOptionLabel={(option) => option.name}
      label={'Select Role(s)'}
      multiple={true}
      disabled={isDisabled}
      value={selectedRoles}
      onChange={handleChange}
      onInputChange={handleSearchChange}
      disableCloseOnSelect
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.name}
            size="small"
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
