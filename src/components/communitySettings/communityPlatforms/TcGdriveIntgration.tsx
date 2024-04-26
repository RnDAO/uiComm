import { Paper } from '@mui/material'
import React from 'react'
import { BiPlus } from 'react-icons/bi'
import TcButton from '../../shared/TcButton'
import TcCommunityPlatformIcon from './TcCommunityPlatformIcon'

function TcGdriveIntgration() {
    return (
        <div className='flex items-center space-x-3 bg-secondary bg-opacity-5 p-5 rounded-sm'>
            <Paper className='flex flex-col items-center justify-center shadow-none w-[10rem] h-[6rem] rounded-sm py-2'>
                <span className='mx-auto'>
                    <TcCommunityPlatformIcon platform='GDrive' />
                </span>
                <div className='w-10/12 mx-auto text-center'>
                    <TcButton text='Connect' variant='text' color='primary' startIcon={<BiPlus />} />
                </div>
            </Paper>
        </div>
    )
}

export default TcGdriveIntgration