import React, { useEffect, useMemo, useState } from 'react';
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

import TcCommunityPlatformIcon from '../communitySettings/communityPlatforms/TcCommunityPlatformIcon';
import TcIconWithTooltip from '../shared/TcIconWithTooltip';
import { useToken } from '../../context/TokenContext';
import { capitalizeFirstChar } from '../../helpers/helper';
import { StorageService } from '../../services/StorageService';
import { ICommunityPlatfromProps } from '../../utils/interfaces';

const SwitchPlatform = () => {
  const { community, selectedPlatform, handleSwitchPlatform } = useToken();
  const [platforms, setPlatforms] = useState<ICommunityPlatfromProps[]>([]);

  useEffect(() => {
    const fetchedPlatforms =
      community?.platforms.filter(
        ({ name, disconnectedAt }) =>
          ['discord', 'discourse', 'telegram'].some((platform) => name.includes(platform)) && !disconnectedAt
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
    <Stack direction='row' className='w-full space-x-1.5'>
      <FormControl className='ml-auto flex flex-row items-center space-x-2'>
        <Select
          variant='filled'
          size='small'
          value={selectedPlatform}
          onChange={handlePlatformChange}
          autoWidth
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
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
        <TcIconWithTooltip tooltipText='Choose a platform to view community-related metrics for that platform.' />
      </FormControl>
    </Stack>
  );
};

export default SwitchPlatform;
