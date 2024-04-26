import React, { useEffect, useState } from 'react'
import TcIconWithTooltip from '../../shared/TcIconWithTooltip'
import TcText from '../../shared/TcText'
import { TreeView, TreeItem } from '@mui/lab'
import { MdExpandMore, MdChevronRight } from 'react-icons/md'
import { Channel } from '../../../context/ChannelContext'
import { FormControlLabel } from '@mui/material'
import TcSwitch from '../../shared/TcSwitch'
import { IPlatformProps } from '../../../utils/interfaces'
import useAppStore from '../../../store/useStore'
import Loading from '../../global/Loading'
import TcButton from '../../shared/TcButton'
import { TbRefresh } from 'react-icons/tb'

interface TcHivemindDiscordAnsweringProps {
    platform: IPlatformProps;
    defaultAnsweringModuleConfig?: {
        selectedChannels: string[];
    } | null;
    handleModuleConfigChange: (config: {
        selectedChannels: string[];
    }) => void;
}

function TcHivemindDiscordAnswering({ platform, defaultAnsweringModuleConfig, handleModuleConfigChange }: TcHivemindDiscordAnsweringProps) {
    const { retrievePlatformProperties } = useAppStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
    const [discordPlatformChannels, setDiscordPlatformChannels] = useState<Channel[]>([]);

    const fetchDiscordPlatformProperties = async () => {
        try {
            if (!platform) return;
            setIsLoading(true);
            const { selectedChannels } = platform.metadata;

            setSelectedChannels(selectedChannels);

            if (defaultAnsweringModuleConfig) {
                setSelectedChannels(defaultAnsweringModuleConfig.selectedChannels);
            }

            const data = await retrievePlatformProperties({
                platformId: platform.id
            })

            setDiscordPlatformChannels(data)
            setIsLoading(false);
        } catch (error) {
            console.log('Error fetching discord platform properties', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDiscordPlatformProperties();
    }, [platform])

    const handleToggleAllSubChannels = (channelId: string, checked: boolean) => {
        const channelIndex = discordPlatformChannels.findIndex(channel => channel.channelId === channelId);
        const subChannels = discordPlatformChannels[channelIndex].subChannels;
        const subChannelIds = subChannels.map(subChannel => subChannel.channelId);

        if (checked) {
            setSelectedChannels([...selectedChannels, ...subChannelIds]);
        } else {
            setSelectedChannels(selectedChannels.filter(channelId => !subChannelIds.includes(channelId)));
        }
    }

    const handleToggleChannelSubChannel = (channelId: string, subChannelId: string, checked: boolean) => {
        if (checked) {
            setSelectedChannels([...selectedChannels, subChannelId]);
        } else {
            setSelectedChannels(selectedChannels.filter(channelId => channelId !== subChannelId));
        }
    }

    useEffect(() => {
        console.log('selectedChannels', selectedChannels);

        handleModuleConfigChange({
            selectedChannels,
        });

    }, [selectedChannels])

    return (
        <div className='w-1/2'>
            <div className='flex items-center'>
                <TcText text="Answering" variant='h6' />
                <TcIconWithTooltip
                    tooltipText='select the channels in which community members can ask questions to Hivemind using slash command /question do you also need the dat extraction period tooltip?'
                />
            </div>
            <div className='bg-gray-50 rounded-md p-4 border border-gray-400 h-[23rem] overflow-y-scroll'>
                <TcText text="Select the data extraction period" variant='h6' />
                <div className='flex items-center justify-between'>
                    <TcText text="Sync the following data sources" variant='h6' />
                    <TcButton text="Refresh List" variant='outlined' className='bg-white' startIcon={<TbRefresh />} onClick={() => fetchDiscordPlatformProperties()} />

                </div>
                {
                    isLoading ? (
                        <div className='flex justify-center items-center h-60'>
                            <Loading />
                        </div>
                    ) : (
                        <TreeView
                            defaultCollapseIcon={<MdExpandMore />}
                            defaultExpandIcon={<MdChevronRight />}
                        >
                            {
                                discordPlatformChannels.map((channel, index) => (
                                    <TreeItem key={index} nodeId={channel.channelId} label={
                                        <div className='flex justify-between items-center'>
                                            <TcText text={channel.title} variant='h6' fontWeight='bold' />
                                            <FormControlLabel
                                                control={<TcSwitch checked={
                                                    channel.subChannels.every(subChannel => selectedChannels.includes(subChannel.channelId))
                                                }
                                                    disabled={
                                                        channel.subChannels.some(subChannel => !subChannel.canReadMessageHistoryAndViewChannel)
                                                    }
                                                    onChange={(e) => handleToggleAllSubChannels(channel.channelId, e.target.checked)}
                                                />}
                                                label="Enable All"
                                            />
                                        </div>
                                    } >
                                        {
                                            channel.subChannels.map((subChannel, index) => (
                                                <TreeItem key={index} nodeId={subChannel.channelId} label={
                                                    <div className='flex justify-between items-center'>
                                                        <TcText text={subChannel.name} variant='subtitle1' />
                                                        <FormControlLabel
                                                            control={<TcSwitch
                                                                checked={selectedChannels.includes(subChannel.channelId)}
                                                                disabled={!subChannel.canReadMessageHistoryAndViewChannel}
                                                                onChange={(e) => handleToggleChannelSubChannel(channel.channelId, subChannel.channelId, e.target.checked)}
                                                            />}
                                                            label="Enable"
                                                        />
                                                    </div>
                                                } />
                                            ))
                                        }
                                    </TreeItem>
                                ))
                            }
                        </TreeView>
                    )
                }
            </div>
        </div>
    )
}

export default TcHivemindDiscordAnswering