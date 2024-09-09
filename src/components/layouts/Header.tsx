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
import { ICommunityDiscordPlatfromProps } from '../../utils/interfaces';

const Header = React.memo(() => {
  const [platforms, setPlatforms] = useState<ICommunityDiscordPlatfromProps[]>(
    []
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string>(() => {
    return localStorage.getItem('SELECTED_PLATFORM') || '';
  });
  const { community } = useToken();

  useEffect(() => {
    const fetchedPlatforms =
      community?.platforms.filter((platform) => {
        return (
          (platform.name.includes('discord') ||
            platform.name.includes('discourse')) &&
          platform.disconnectedAt === null
        );
      }) || [];
    setPlatforms(fetchedPlatforms);

    if (fetchedPlatforms.length > 0) {
      const storedPlatform = localStorage.getItem('SELECTED_PLATFORM');
      const defaultPlatform = storedPlatform || fetchedPlatforms[0].id;
      setSelectedPlatform(defaultPlatform);
    } else {
      setSelectedPlatform('');
    }
  }, [community]);

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

  const handlePlatformChange = (event: SelectChangeEvent<string>) => {
    const newPlatform = event.target.value;
    setSelectedPlatform(newPlatform);
    localStorage.setItem('SELECTED_PLATFORM', newPlatform);
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
              const selectedPlatform = platforms.find(
                (platform) => platform.id === selected
              );
              return selectedPlatform ? (
                <Box display='flex' alignItems='center'>
                  <TcCommunityPlatformIcon
                    size={28}
                    platform={
                      capitalizeFirstChar(selectedPlatform.name) as string
                    }
                  />
                  <ListItemText className='pl-2'>
                    {capitalizeFirstChar(selectedPlatform.name)}
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
});

export default Header;
