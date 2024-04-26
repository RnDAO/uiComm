import { Box, CircularProgress, Paper, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IntegrationPlatform } from '../../../utils/enums';
import TcText from '../../shared/TcText';
import TcCommunityPlatformIcon from '../communityPlatforms/TcCommunityPlatformIcon';
import useAppStore from '../../../store/useStore';
import {
    IDiscordModifiedCommunity,
    IModuleProps,
    IPlatformProps,
} from '../../../utils/interfaces';
import { StorageService } from '../../../services/StorageService';
import TcAvatar from '../../shared/TcAvatar';
import { conf } from '../../../configs';
import TcHivemindDiscordLearnings from './TcHivemindDiscordLearnings';
import TcHivemindDiscordAnswering from './TcHivemindDiscordAnswering';
import TcButton from '../../shared/TcButton';
import { useRouter } from 'next/router';
import SimpleBackdrop from '../../global/LoadingBackdrop';
import { useSnackbar } from '../../../context/SnackbarContext';

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

function HivemindSettings() {
    const { retrievePlatforms, reteriveModules, patchModule } = useAppStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [activePlatform, setActivePlatform] = useState<number>(0);
    const [platform, setPlatform] = useState<number>(0);
    const [platforms, setPlatforms] = React.useState<IPlatformProps[]>([]);
    const [hivemindModule, setHivemindModule] = useState<IModuleProps>();

    const { showMessage } = useSnackbar();

    let hivemindPayload = {};

    const router = useRouter();

    const fetchPlatformsByType = async () => {
        const communityId =
            StorageService.readLocalStorage<IDiscordModifiedCommunity>(
                'community'
            )?.id;

        const hivemindModules = await reteriveModules({
            community: communityId,
            name: 'hivemind',
        });

        switch (activePlatform) {
            case 0:
                const { results } = await retrievePlatforms({
                    name: 'discord',
                    community: communityId,
                });
                const discordHivemindModule = hivemindModules.results.find(
                    (hivemindModule: IModuleProps) =>
                        hivemindModule.community === communityId
                );

                setHivemindModule(discordHivemindModule);
                setPlatforms(results);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        fetchPlatformsByType();
    }, [platform]);

    const handleLearningConfigUpdate = (config: {
        selectedChannels: string[];
        fromDate: string;
    }) => {
        hivemindPayload = {
            ...hivemindPayload,
            learning: {
                ...config,
            },
        };
    };

    const handleAnsweringConfigUpdate = (config: {
        selectedChannels: string[];
    }) => {
        hivemindPayload = {
            ...hivemindPayload,
            answering: {
                ...config,
            },
        };
    };

    const handlePatchModule = async () => {
        try {
            if (!hivemindModule) return;
            setLoading(true);
            const patchPayload = {
                platforms: [
                    {
                        platform: platforms[platform].id,
                        name: 'discord',
                        metadata: {
                            ...hivemindPayload,
                        },
                    },
                ],
            };

            const data = await patchModule({
                moduleId: hivemindModule.id,
                payload: patchPayload,
            });
            if (data) {
                showMessage('Hivemind module updated successfully', 'success')
                await fetchPlatformsByType()
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='bg-gray-100 py-4'>
                <Tabs
                    orientation='horizontal'
                    variant='scrollable'
                    value={activePlatform}
                    onChange={(event, newValue) => setActivePlatform(newValue)}
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
            </div>
            <div className='bg-gray-100 py-4'>
                <Tabs
                    orientation='horizontal'
                    variant='scrollable'
                    value={platform}
                    onChange={(event, newValue) => setPlatform(newValue)}
                >
                    {platforms.map((platform, index) => (
                        <Tab
                            className='mr-3 max-h-[6rem] max-w-[10rem] rounded-sm bg-white shadow-lg'
                            key={index}
                            label={
                                <div className='flex flex-col items-center space-x-2'>
                                    <TcAvatar
                                        src={`${conf.DISCORD_CDN}icons/${platform.metadata.id}/${platform.metadata.icon}`}
                                        sizes='small'
                                    />
                                    <TcText text={platform.metadata.name} variant='body2' />
                                </div>
                            }
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </div>

            <Paper className='shadow-none'>
                {activePlatform === 0 && (
                    <TabPanel value={activePlatform} index={0}>
                        <div className='flex items-center justify-between space-x-5'>
                            <TcHivemindDiscordLearnings
                                platform={
                                    platforms &&
                                    platforms.filter(
                                        (platform) => platform.disconnectedAt === null
                                    )[0]
                                }
                                defaultLearningModuleConfig={
                                    hivemindModule?.options?.platforms[0]?.metadata?.learning
                                }
                                handleModuleConfigChange={handleLearningConfigUpdate}
                            />
                            <TcHivemindDiscordAnswering
                                platform={
                                    platforms &&
                                    platforms.filter(
                                        (platform) => platform.disconnectedAt === null
                                    )[0]
                                }
                                defaultAnsweringModuleConfig={
                                    hivemindModule?.options?.platforms[0]?.metadata?.answering
                                }
                                handleModuleConfigChange={handleAnsweringConfigUpdate}
                            />
                        </div>
                        <div className='mt-6 flex items-center justify-between'>
                            <TcButton
                                text='Cancel'
                                variant='outlined'
                                className='w-1/4'
                                onClick={() => router.push('/community-settings')}
                            />
                            <TcButton
                                text={
                                    loading ? (
                                        <CircularProgress size={20} color='inherit' />
                                    ) : (
                                        'Save Changes')
                                }
                                variant='contained'
                                className='w-1/4'
                                onClick={() => handlePatchModule()}
                            />
                        </div>
                    </TabPanel>
                )}
            </Paper>
        </>
    );
}

export default HivemindSettings;
