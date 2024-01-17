import React, { useEffect, useState } from 'react';
import { useToken } from '../../../../context/TokenContext';
import useAppStore from '../../../../store/useStore';
import { FetchedData, IUser } from '../../../../utils/interfaces';
import { debounce } from '../../../../helpers/helper';
import TcAutocomplete from '../../../shared/TcAutocomplete';
import { Chip } from '@mui/material';

interface ITcUsersAutoCompleteProps {
  isDisabled: boolean;
  handleSelectedUsers: (users: IUser[]) => void;
}

function TcUsersAutoComplete({
  isDisabled,
  handleSelectedUsers,
}: ITcUsersAutoCompleteProps) {
  const { community } = useToken();

  const platformId = community?.platforms.find(
    (platform) => platform.disconnectedAt === null
  )?.id;

  const { retrievePlatformProperties } = useAppStore();
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const [fetchedUsers, setFetchedUsers] = useState<FetchedData>({
    limit: 8,
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  });
  const [filteredRolesByName, setFilteredRolesByName] = useState<string>('');

  const fetchDiscordUsers = async (
    platformId: string,
    page?: number,
    limit?: number,
    name?: string
  ) => {
    try {
      const fetchedUsers = await retrievePlatformProperties({
        platformId,
        name: name,
        property: 'guildMember',
        page: page,
        limit: limit,
      });

      if (name) {
        setFilteredRolesByName(name);
        setFetchedUsers(fetchedUsers);
      } else {
        setFetchedUsers((prevData: { results: any }) => {
          const updatedResults = [
            ...prevData.results,
            ...fetchedUsers.results,
          ].filter(
            (role, index, self) =>
              index === self.findIndex((r) => r.discordId === role.discordId)
          );

          return {
            ...prevData,
            ...fetchedUsers,
            results: updatedResults,
          };
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!platformId) return;
    fetchDiscordUsers(platformId, fetchedUsers.page, fetchedUsers.limit);
  }, []);

  const debouncedFetchDiscordUsers = debounce(fetchDiscordUsers, 700);

  const handleSearchChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;

    if (!platformId) return;

    if (inputValue === '') {
      setFilteredRolesByName('');
      setFetchedUsers({
        limit: 8,
        page: 1,
        results: [],
        totalPages: 0,
        totalResults: 0,
      });

      debouncedFetchDiscordUsers(platformId, 1, 8);
    } else {
      debouncedFetchDiscordUsers(platformId, 1, 8, inputValue);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.clientHeight ===
      listboxNode.scrollHeight
    ) {
      const nextPage =
        Math.ceil(fetchedUsers.results.length / fetchedUsers.limit) + 1;
      if (fetchedUsers.totalPages >= nextPage) {
        if (!platformId) return;
        fetchDiscordUsers(platformId, nextPage, fetchedUsers.limit);
      }
    }
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any[]
  ): void => {
    setSelectedUsers(value);
  };

  useEffect(() => {
    if (!selectedUsers) return;
    handleSelectedUsers(selectedUsers);
  }, [selectedUsers]);

  return (
    <TcAutocomplete
      options={fetchedUsers.results}
      getOptionLabel={(option) => option.ngu}
      label={'Select Role(s)'}
      multiple={true}
      disabled={isDisabled}
      value={selectedUsers}
      onChange={handleChange}
      onInputChange={handleSearchChange}
      disableCloseOnSelect
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.ngu}
            size="small"
            sx={{
              borderRadius: '4px',
              borderColor: '#96A5A6',
              backgroundColor: '#96A5A6',
              color: 'white',
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

export default TcUsersAutoComplete;
