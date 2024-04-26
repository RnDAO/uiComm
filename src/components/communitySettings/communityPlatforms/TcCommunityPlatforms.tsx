import { Box, CircularProgress, Paper, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import TcCommunityPlatformIcon from './TcCommunityPlatformIcon';
import TcDiscordIntgration from './TcDiscordIntgration';
import TcGdriveIntgration from './TcGdriveIntgration';
import TcButton from '../../shared/TcButton';
import TcCard from '../../shared/TcCard';
import TcText from '../../shared/TcText';
import { StorageService } from '../../../services/StorageService';
import useAppStore from '../../../store/useStore';
import { IntegrationPlatform } from '../../../utils/enums';
import {
  IDiscordModifiedCommunity,
  IPlatformProps,
} from '../../../utils/interfaces';

interface TcTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TcTabPanelProps) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function TcCommunityPlatforms() {
  const { retrievePlatforms, reteriveModules, createModule } = useAppStore();
  const [platforms, setPlatforms] = useState<IPlatformProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hivemindManageIsLoading, setHivemindManageIsLoading] =
    useState<boolean>(false);
  const router = useRouter();

  const communityId =
    StorageService.readLocalStorage<IDiscordModifiedCommunity>('community')?.id;

  const fetchPlatformsByType = async () => {
    switch (activeTab) {
      case 0:
        setIsLoading(true);
        const { results } = await retrievePlatforms({
          name: 'discord',
          community: communityId,
        });
        setPlatforms(results);
        setIsLoading(false);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    fetchPlatformsByType();
  }, [activeTab]);

  const handleManageHivemindModule = async () => {
    try {
      setHivemindManageIsLoading(true);
      const hivemindModules = await reteriveModules({
        community: communityId,
        name: 'hivemind',
      });

      if (hivemindModules.results.length > 0) {
        router.push('/community-settings/hivemind');
      } else {
        await createModule({ name: 'hivemind', community: communityId });
        router.push('/community-settings/hivemind');
      }
      setHivemindManageIsLoading(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setHivemindManageIsLoading(false);
    }
  };

  const handleUpdateCommunityPlatoform = async () => {
    await fetchPlatformsByType();
  };

  return (
    <div>
      <div className='flex flex-col md:flex-row'>
        <TcText text='Platforms & Modules' variant='h6' />
        <TcText
          text='Configure the following by adding/removing platforms and enabling/disabling access settings within each module'
          variant='body2'
        />
      </div>

      <Paper className='rounded-none bg-gray-100 p-4 shadow-none'>
        <div className='flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-3'>
          <TcText text='Platforms' variant='h6' fontWeight='bold' />
          <TcText
            text='Connect platforms to their respective modules'
            variant='body1'
          />
        </div>
        <Box>
          <Tabs
            orientation='horizontal'
            variant='scrollable'
            value={activeTab}
            onChange={(event, newValue) => setActiveTab(newValue)}
          >
            {Object.keys(IntegrationPlatform).map((platform, index) => (
              <Tab
                className='mr-3 min-h-[6rem] min-w-[10rem] rounded-sm bg-white shadow-lg'
                key={index}
                label={
                  <div className='flex flex-col items-center space-x-2'>
                    <TcCommunityPlatformIcon platform={platform} />
                    <TcText text={platform} variant='body2' />
                  </div>
                }
                disabled={!['Discord'].includes(platform)}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
          {activeTab === 0 && (
            <TabPanel value={activeTab} index={0}>
              <TcDiscordIntgration
                isLoading={isLoading}
                platformType='discord'
                connectedPlatforms={platforms}
                handleUpdateCommunityPlatoform={handleUpdateCommunityPlatoform}
              />
            </TabPanel>
          )}
          {activeTab === 1 && (
            <TabPanel value={activeTab} index={1}>
              <TcGdriveIntgration />
            </TabPanel>
          )}
        </Box>

        <div className='flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-3'>
          <TcText text='Modules' variant='h6' fontWeight='bold' />
          <TcText
            text='Manage the following modules and their access setting'
            variant='body1'
          />
        </div>

        <TcCard
          className='min-h-[6rem] max-w-[10rem]'
          children={
            <div className='flex flex-col items-center justify-center space-y-2 py-4'>
              <TcText text='Hivemind' variant='subtitle1' fontWeight='bold' />
              <TcButton
                text={
                  hivemindManageIsLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    'Manage'
                  )
                }
                disabled={platforms.length === 0}
                variant='text'
                onClick={() => handleManageHivemindModule()}
              />
            </div>
          }
        />
      </Paper>
    </div>
  );
}

export default TcCommunityPlatforms;
