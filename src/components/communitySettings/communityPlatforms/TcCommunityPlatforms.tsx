import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Paper, Tab, Tabs } from '@mui/material';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import TcCommunityPlatformIcon from './TcCommunityPlatformIcon';
import TcDiscordIntgration from './TcDiscordIntgration';
import TcDiscourse from './TcDiscourse';
import TcGdriveIntegration from './TcGdriveIntegration';
import TcGithubIntegration from './TcGithubIntegration';
import TcMediaWiki from './TcMediaWiki';
import TcNotionIntegration from './TcNotionIntegration';
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
  const { retrievePlatforms, retrieveModules, createModule } = useAppStore();
  const [platforms, setPlatforms] = useState<IPlatformProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hivemindManageIsLoading, setHivemindManageIsLoading] =
    useState<boolean>(false);
  const [
    violationDetectionManageIsLoading,
    setViolationDetectionManageIsLoading,
  ] = useState<boolean>(false);
  const [reputationScoreManageIsLoading, setReputationScoreManageIsLoading] =
    useState<boolean>(false);
  const router = useRouter();

  const communityId =
    StorageService.readLocalStorage<IDiscordModifiedCommunity>('community')?.id;

  const fetchPlatformsByType = async () => {
    const platformNames = [
      'discord',
      'google',
      'github',
      'notion',
      'mediaWiki',
      'discourse',
    ];

    const platformName = platformNames[activeTab];

    if (!platformName) {
      return;
    }

    setIsLoading(true);
    try {
      const { results } = await retrievePlatforms({
        name: platformName,
        community: communityId,
      });
      setPlatforms(results || []);
    } catch (error) {
      console.error('Error fetching platforms:', error);
      setPlatforms([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatformsByType();
  }, [activeTab]);

  const handleManageHivemindModule = async () => {
    try {
      setHivemindManageIsLoading(true);
      const hivemindModules = await retrieveModules({
        community: communityId,
        name: 'hivemind',
      });

      if (hivemindModules.results.length > 0) {
        router.push('/community-settings/ai-assistant');
      } else {
        await createModule({ name: 'hivemind', community: communityId });
        router.push('/community-settings/ai-assistant');
      }
      setHivemindManageIsLoading(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setHivemindManageIsLoading(false);
    }
  };

  const handleViolationDetectionModule = async () => {
    try {
      setViolationDetectionManageIsLoading(true);
      const hivemindModules = await retrieveModules({
        community: communityId,
        name: 'violationDetection',
      });

      if (hivemindModules.results.length > 0) {
        router.push('/community-settings/violation-detection');
      } else {
        await createModule({
          name: 'violationDetection',
          community: communityId,
        });
        router.push('/community-settings/violation-detection');
      }
      setViolationDetectionManageIsLoading(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setViolationDetectionManageIsLoading(false);
    }
  };

  const handleReputationScoreModule = async () => {
    try {
      setReputationScoreManageIsLoading(true);
      const reputationScoreModule = await retrieveModules({
        community: communityId,
        name: 'dynamicNft',
      });

      if (reputationScoreModule.results.length > 0) {
        router.push('/community-settings/reputation-score');
      } else {
        await createModule({
          name: 'dynamicNft',
          community: communityId,
        });
        router.push('/community-settings/reputation-score');
      }
      setReputationScoreManageIsLoading(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      setReputationScoreManageIsLoading(false);
    }
  };

  const handleUpdateCommunityPlatform = async () => {
    await fetchPlatformsByType();
  };

  return (
    <div>
      <Paper className='rounded-none bg-gray-100 p-4 shadow-none'>
        <div className='flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-3'>
          <TcText text='Platforms' variant='h6' fontWeight='bold' />
          <TcText text='Add/remove platform integrations' variant='body1' />
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
                className={clsx(
                  'mr-3 min-h-[6rem] min-w-[10rem] rounded-sm shadow-lg',
                  activeTab === index
                    ? 'bg-secondary/80 text-white'
                    : ![
                          'Discord',
                          'Discourse',
                          'Github',
                          'Notion',
                          'MediaWiki',
                        ].includes(platform)
                      ? 'bg-white'
                      : 'bg-white text-black'
                )}
                key={index}
                label={
                  <div className='flex flex-col items-center space-x-2'>
                    <TcCommunityPlatformIcon platform={platform} />
                    <TcText text={platform} variant='body2' />
                    {platform === 'GDrive' && (
                      <TcText
                        variant='caption'
                        className='text-gray-300'
                        text='Coming soon'
                      />
                    )}
                  </div>
                }
                disabled={
                  ![
                    'Discord',
                    'Discourse',
                    'Github',
                    'Notion',
                    'MediaWiki',
                  ].includes(platform)
                }
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
                handleUpdateCommunityPlatform={handleUpdateCommunityPlatform}
              />
            </TabPanel>
          )}
          {activeTab === 1 && (
            <TabPanel value={activeTab} index={1}>
              <TcGdriveIntegration
                isLoading={isLoading}
                connectedPlatforms={platforms}
                handleUpdateCommunityPlatform={handleUpdateCommunityPlatform}
              />
            </TabPanel>
          )}
          {activeTab === 2 && (
            <TabPanel value={activeTab} index={2}>
              <TcGithubIntegration
                isLoading={isLoading}
                connectedPlatforms={platforms}
                handleUpdateCommunityPlatform={handleUpdateCommunityPlatform}
              />
            </TabPanel>
          )}
          {activeTab === 3 && (
            <TabPanel value={activeTab} index={3}>
              <TcNotionIntegration
                isLoading={isLoading}
                connectedPlatforms={platforms}
                handleUpdateCommunityPlatform={handleUpdateCommunityPlatform}
              />
            </TabPanel>
          )}
          {activeTab === 4 && (
            <TabPanel value={activeTab} index={4}>
              <TcMediaWiki
                isLoading={isLoading}
                connectedPlatforms={platforms}
                handleUpdateCommunityPlatform={handleUpdateCommunityPlatform}
              />
            </TabPanel>
          )}
          {activeTab === 5 && (
            <TabPanel value={activeTab} index={5}>
              <TcDiscourse
                isLoading={isLoading}
                connectedPlatforms={platforms}
                handleUpdateCommunityPlatform={handleUpdateCommunityPlatform}
              />
            </TabPanel>
          )}
        </Box>
      </Paper>
      <div className='py-4'>
        <div className='flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-3'>
          <TcText text='Modules' variant='h6' fontWeight='bold' />
          <TcText
            text='Turn on/off modules and change their settings'
            variant='body1'
          />
        </div>

        <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
          <TcCard
            className='max-h-[6rem] min-h-[6rem] min-w-[10rem] max-w-[10rem] flex-grow'
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
                  variant='text'
                  onClick={() => handleManageHivemindModule()}
                />
              </div>
            }
          />
          <TcCard
            className='max-h-[6rem] min-h-[6rem] min-w-[10rem] max-w-[10rem] flex-grow'
            children={
              <div className='flex flex-col items-center justify-center space-y-2 py-4'>
                <TcText
                  text='Violation Detection'
                  variant='subtitle1'
                  fontWeight='bold'
                />
                <TcButton
                  text={
                    violationDetectionManageIsLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      'Manage'
                    )
                  }
                  variant='text'
                  onClick={() => handleViolationDetectionModule()}
                />
              </div>
            }
          />
          <TcCard
            className='max-h-[6rem] min-h-[6rem] min-w-[10rem] max-w-[10rem] flex-grow'
            children={
              <div className='flex flex-col items-center justify-center space-y-2 py-4'>
                <TcText
                  text='Reputation Score'
                  variant='subtitle1'
                  fontWeight='bold'
                />
                <TcButton
                  text={
                    reputationScoreManageIsLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      'Manage'
                    )
                  }
                  variant='text'
                  onClick={() => handleReputationScoreModule()}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default TcCommunityPlatforms;
