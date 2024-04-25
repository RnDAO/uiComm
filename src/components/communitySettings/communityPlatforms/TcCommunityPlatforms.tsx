import React, { useEffect } from 'react'
import TcText from '../../shared/TcText'
import { Box, Paper, Tab, Tabs } from '@mui/material'
import { IntegrationPlatform } from '../../../utils/enums';
import TcCommunityPlatformIcon from './TcCommunityPlatformIcon';
import TcDiscordIntgration from './TcDiscordIntgration';
import useAppStore from '../../../store/useStore';
import { useToken } from '../../../context/TokenContext';
import { StorageService } from '../../../services/StorageService';
import { IDiscordModifiedCommunity, IPlatformProps } from '../../../utils/interfaces';

interface TcTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function TabPanel({ children, value, index, ...other }: TcTabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
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
    const { retrievePlatforms } = useAppStore()
    const [platforms, setPlatforms] = React.useState<IPlatformProps[]>([]);
    const [activeTab, setActiveTab] = React.useState(0);

    const fetchPlatformsByType = async () => {
        const communityId =
            StorageService.readLocalStorage<IDiscordModifiedCommunity>(
                'community'
            )?.id;

        switch (activeTab) {
            case 0:
                const { results } = await retrievePlatforms({
                    name: 'discord',
                    community: communityId
                });
                setPlatforms(results);
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        fetchPlatformsByType()
    }, [activeTab])

    return (
        <div>
            <TcText text="Platforms & Modules" variant='h6' />
            <TcText text="Configure the following by adding/removing platforms and enabling/disabling access settings within each module" variant='body2' />

            <Paper className='shadow-none bg-gray-100 rounded-none p-4'>
                <div className='flex items-center space-x-3'>
                    <TcText text="Platforms" variant='h6' fontWeight="bold" />
                    <TcText text="Connect platforms to their respective modules" variant='body1' />
                </div>
                <Box
                >
                    <Tabs
                        orientation="horizontal"
                        variant="scrollable"
                        value={activeTab}
                        onChange={(event, newValue) => setActiveTab(newValue)}
                    >
                        {
                            Object.keys(IntegrationPlatform).map((platform, index) => (
                                <Tab
                                    className='bg-white shadow-lg rounded-sm mr-3 min-w-[10rem] min-h-[6rem]'
                                    key={index}
                                    label={
                                        <div className='flex flex-col items-center space-x-2'>
                                            <TcCommunityPlatformIcon platform={platform} />
                                            <TcText text={platform} variant='body2' />
                                        </div>
                                    }
                                    {...a11yProps(index)}
                                />
                            ))

                        }
                    </Tabs>
                    {
                        activeTab === 0 && <TabPanel value={activeTab} index={0}>
                            <TcDiscordIntgration platformType={'discord'} connectedPlatforms={platforms} />
                        </TabPanel>
                    }
                </Box>
            </Paper>
        </div>
    )
}

export default TcCommunityPlatforms