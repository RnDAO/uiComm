import {
  AppBar,
  Box,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import TcCommunityPlatformIcon from '../communitySettings/communityPlatforms/TcCommunityPlatformIcon';
import TcIconWithTooltip from '../shared/TcIconWithTooltip';
import { useToken } from '../../context/TokenContext';
import { capitalizeFirstChar } from '../../helpers/helper';
import { StorageService } from '../../services/StorageService';
import { ICommunityPlatfromProps } from '../../utils/interfaces';

const Header = () => {
  const { community, selectedPlatform, handleSwitchPlatform } = useToken();
  const [platforms, setPlatforms] = useState<ICommunityPlatfromProps[]>([]);

  useEffect(() => {
    const fetchedPlatforms =
      community?.platforms.filter(
        ({ name, disconnectedAt }) =>
          (name.includes('discord') || name.includes('discourse')) &&
          !disconnectedAt
      ) || [];

    setPlatforms(fetchedPlatforms);

    if (fetchedPlatforms.length > 0) {
      const storedPlatform = StorageService.readLocalStorage<string>(
        'SELECTED_PLATFORM',
        'string'
      );

      if (
        storedPlatform &&
        fetchedPlatforms.some((p) => p.id === storedPlatform)
      ) {
        handleSwitchPlatform(storedPlatform);
      } else {
        handleSwitchPlatform(fetchedPlatforms[0].id);
      }
    }
  }, [community, selectedPlatform, handleSwitchPlatform]);

  const platformOptions = useMemo(() => {
    return platforms.map((platform) => {
      const platformName = capitalizeFirstChar(platform.name) as string;
      return (
        <MenuItem
          key={platform.id}
          value={platform.id}
          className='flex items-center'
        >
          <Box display='flex' alignItems='center'>
            <ListItemIcon>
              <TcCommunityPlatformIcon size={28} platform={platformName} />
            </ListItemIcon>
            <ListItemText>{platformName}</ListItemText>
          </Box>
        </MenuItem>
      );
    });
  }, [platforms]);

  // Handle platform change from the dropdown
  const handlePlatformChange = (event: SelectChangeEvent<string>) => {
    const newPlatform = event.target.value;
    handleSwitchPlatform(newPlatform);
  };

  return (
    <AppBar
      position='sticky'
      className='flex hidden flex-col rounded-br-xl bg-gray-background px-4 py-2 text-inherit shadow-inner md:block md:px-12'
    >
      <Stack direction='row' className='w-full space-x-1.5'>
        <FormControl className='ml-auto flex flex-row items-center space-x-2'>
          <Typography variant='caption' fontWeight='bold'>
            Select Platform:
          </Typography>
          <TcIconWithTooltip tooltipText='Choose a platform to view community-related metrics for that platform.' />
          <Select
            variant='filled'
            size='small'
            value={selectedPlatform}
            onChange={handlePlatformChange}
            autoWidth
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: 'white',
              '.MuiSelect-select': {
                paddingTop: '8px',
                paddingBottom: '8px',
              },
            }}
            disableUnderline
            renderValue={(selected) => {
              const selectedPlatformObj = platforms.find(
                (platform) => platform.id === selected
              );
              return selectedPlatformObj ? (
                <Box display='flex' alignItems='center'>
                  <TcCommunityPlatformIcon
                    size={28}
                    platform={
                      capitalizeFirstChar(selectedPlatformObj.name) as string
                    }
                  />
                  <ListItemText className='pl-2'>
                    {capitalizeFirstChar(selectedPlatformObj.name)}
                  </ListItemText>
                </Box>
              ) : (
                'Select Platform'
              );
            }}
          >
            {platformOptions}
          </Select>
        </FormControl>
      </Stack>
    </AppBar>
  );
};

export default Header;
