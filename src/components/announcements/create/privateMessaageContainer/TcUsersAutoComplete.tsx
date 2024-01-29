import React, { useEffect, useState } from 'react';
import { useToken } from '../../../../context/TokenContext';
import useAppStore from '../../../../store/useStore';
import { FetchedData, IUser } from '../../../../utils/interfaces';
import { debounce, truncateCenter } from '../../../../helpers/helper';
import TcAutocomplete from '../../../shared/TcAutocomplete';
import { Chip, CircularProgress } from '@mui/material';
import TcAvatar from '../../../shared/TcAvatar';
import TcText from '../../../shared/TcText';
import { conf } from '../../../../configs';

interface ITcUsersAutoCompleteProps {
  isEdit?: boolean;
  privateSelectedUsers?: IUser[];
  isDisabled: boolean;
  handleSelectedUsers: (users: IUser[]) => void;
}

function TcUsersAutoComplete({
  isEdit = false,
  privateSelectedUsers,
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
  const [filteredUsersByName, setFilteredUsersByName] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDiscordUsers = async (
    platformId: string,
    page?: number,
    limit?: number,
    ngu?: string
  ) => {
    try {
      setIsLoading(true);

      const fetchedUsers = await retrievePlatformProperties({
        platformId,
        ngu: ngu,
        property: 'guildMember',
        page: page,
        limit: limit,
      });

      if (ngu) {
        setFilteredUsersByName(ngu);
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
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!platformId) return;
    fetchDiscordUsers(platformId, fetchedUsers.page, fetchedUsers.limit);
  }, []);

  const debouncedFetchDiscordUsers = debounce(fetchDiscordUsers, 700);

  const handleClearAll = () => {
    if (!platformId) return;
    fetchDiscordUsers(platformId, fetchedUsers.page, fetchedUsers.limit);
  };

  const handleSearchChange = (event: React.SyntheticEvent<Element, Event>) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;

    if (!platformId) return;

    if (inputValue === '') {
      setFilteredUsersByName('');
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

  useEffect(() => {
    if (isEdit && !isInitialized) {
      if (privateSelectedUsers !== undefined) {
        setSelectedUsers(privateSelectedUsers);
      } else {
        setSelectedUsers([]);
      }
      setIsInitialized(true);
    }
  }, [privateSelectedUsers, isEdit, isInitialized]);

  return (
    <TcAutocomplete
      options={fetchedUsers.results}
      getOptionLabel={(option) => option.ngu}
      label={'Select User(s)'}
      multiple={true}
      loading={isLoading}
      loadingText={
        <div className="text-center">
          <CircularProgress size={24} />
        </div>
      }
      disabled={isDisabled}
      value={selectedUsers}
      onChange={handleChange}
      onInputChange={(event, value, reason) => {
        if (reason === 'clear') {
          handleClearAll();
        } else {
          handleSearchChange(event);
        }
      }}
      isOptionEqualToValue={(option, value) =>
        option.discordId === value.discordId
      }
      disableCloseOnSelect
      renderOption={(props, option) => (
        <li {...props} key={option.discordId}>
          <div className="flex items-center space-x-2">
            <TcAvatar
              sx={{ height: '28px', width: '28px' }}
              src={
                option.discordId && option?.avatar
                  ? `${conf.DISCORD_CDN}avatars/${option.discordId}/${option?.avatar}.png`
                  : ''
              }
              alt="User Avatar"
            />
            <TcText text={option.ngu} />
            <TcText
              text={`${
                option.username ? '@' + truncateCenter(option.username, 10) : ''
              }`}
              className="text-gray-500"
            />
          </div>
        </li>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={
              <div className="flex items-center space-x-1">
                <div>
                  <span
                    style={{
                      height: '8px',
                      width: '8px',
                      backgroundColor: '#96A5A6',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '5px',
                    }}
                  />
                  <TcText text={option.ngu} variant="caption" />
                </div>
                <TcText
                  text={`${
                    option.username
                      ? '@' + truncateCenter(option.username, 10)
                      : ''
                  }`}
                  variant="caption"
                  className="text-gray-500"
                />
              </div>
            }
            size="small"
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

export default TcUsersAutoComplete;
