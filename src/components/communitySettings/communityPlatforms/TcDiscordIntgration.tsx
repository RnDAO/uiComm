import { CircularProgress, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TcCommunityPlatformIcon from './TcCommunityPlatformIcon'
import TcButton from '../../shared/TcButton'
import { BiPlus } from 'react-icons/bi'
import useAppStore from '../../../store/useStore'
import { IPlatformProps } from '../../../utils/interfaces'
import { conf } from '../../../configs'
import TcAvatar from '../../shared/TcAvatar'
import TcDiscordIntegrationSettingsDialog from './TcDiscordIntegrationSettingsDialog'

interface TcDiscordIntgrationProps {
    platformType: string;
    isLoading: boolean;
    connectedPlatforms: IPlatformProps[];
    handleUpdateCommunityPlatoform: () => void;
}

function TcDiscordIntgration({ platformType, isLoading, connectedPlatforms, handleUpdateCommunityPlatoform }: TcDiscordIntgrationProps) {
    const { connectNewPlatform } = useAppStore()

    const handleConnect = () => {
        connectNewPlatform(platformType)
    }

    return (
        <div className='flex items-center space-x-3 bg-secondary bg-opacity-5 p-5 rounded-sm'>
            <Paper className='flex flex-col items-center justify-center shadow-none w-[10rem] h-[6rem] rounded-sm py-2'>
                <span className='mx-auto'>
                    <TcCommunityPlatformIcon platform='Discord' />
                </span>
                <div className='w-10/12 mx-auto text-center'>
                    <TcButton text='Connect' variant='text' color='primary' startIcon={<BiPlus />} onClick={() => handleConnect()} />
                </div>
            </Paper>
            {
                isLoading ? <CircularProgress size={30} /> :
                    connectedPlatforms.map((platform, index) => (
                        <Paper className='flex flex-col items-center justify-center shadow-none overflow-hidden w-[10rem] h-[6rem] rounded-sm py-2 space-y-1.5' key={index}>
                            <TcAvatar
                                src={`${conf.DISCORD_CDN}icons/${platform.metadata.id}/${platform.metadata.icon}`}
                                sizes='small'
                            />
                            <TcDiscordIntegrationSettingsDialog platform={platform} handleUpdateCommunityPlatoform={handleUpdateCommunityPlatoform} />
                        </Paper>
                    ))
            }
        </div>
    )
}

export default TcDiscordIntgration