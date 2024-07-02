import React from 'react'
import TcBoxContainer from '../../shared/TcBox/TcBoxContainer';
import { Avatar, Stack, Typography } from '@mui/material';
import TcButton from '../../shared/TcButton';
import { useAccount } from 'wagmi';
import TcIconWithTooltip from '../../shared/TcIconWithTooltip';


interface ITcMintTokenContainer {
    tokenDetails: {
        name: string;
        description: string;
    }
}


function TcMintTokenContainer({ tokenDetails }: ITcMintTokenContainer) {
    const { address, isConnected } = useAccount();

    return (
        <TcBoxContainer
            contentContainerChildren={
                <div className={`relative space-y-4 p-4 ${!isConnected ? 'blur-sm' : ''}`}>
                    <Stack className='flex flex-row space-x-2 items-center'>
                        <span className='text-white bg-secondary rounded-full flex items-center justify-center h-8 w-8'>3</span>
                        <Typography variant='h6' fontWeight="bold">
                            Mint your Reputation Score NFT
                        </Typography>
                    </Stack>
                    <Typography variant='body2' className='flex items-center'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, ducimus dolorem! Nisi consectetur delectus at. Error similique sint neque velit dignissimos distinctio consectetur illum perferendis, a omnis id, explicabo est.
                    </Typography>
                    <Stack className='flex flex-row justify-end space-x-2 items-center'>
                        <TcButton text={'Mint'} variant='contained' />
                    </Stack>
                </div>
            }
        />
    )
}

export default TcMintTokenContainer;