import React from 'react';
import TcBoxContainer from '../../shared/TcBox/TcBoxContainer';
import { Avatar, Link, Stack, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import TcIconWithTooltip from '../../shared/TcIconWithTooltip';
import Image from 'next/image';
import arbitrum from '../../../assets/svg/arbitrum-arb-logo.svg';

interface ICommunityToken {
    tokenDetails: {
        name: string;
        description: string;
    }
}

function TcWalletContainer({ tokenDetails }: ICommunityToken) {
    return (
        <TcBoxContainer
            contentContainerChildren={
                <div className='relative space-y-4 p-4'>
                    <Stack className='flex flex-row justify-between items-center'>
                        <Stack className='flex flex-row items-center space-x-2'>
                            <span className='text-white bg-secondary rounded-full flex items-center justify-center h-8 w-8'>1</span>
                            <Typography variant='h6' fontWeight="bold">
                                Connect your wallet
                            </Typography>
                        </Stack>
                        <Stack className='flex flex-row items-center space-x-2'>
                            <Typography variant='body1' fontWeight="bold" fontStyle="italic" className='flex items-center space-x-3'>
                                Powered by
                                <Link className='flex items-center ml-1 no-underline space-x-2' href='https://arbitrum.foundation/' target='_blank'>
                                    <Image src={arbitrum} alt='Arbitrum' width={30} height={30} />
                                    <span className='text-info'>
                                        Arbitrum
                                    </span>
                                </Link>
                            </Typography>
                        </Stack>
                    </Stack>
                    <Typography variant='body2' className='flex items-center'>
                        To mint a {" "}
                        <span className='flex items-center mx-3 space-x-1.5'>
                            <Avatar sx={{ width: 34, height: 34 }} />
                            <b className='text-secondary flex'>
                                {tokenDetails.name}
                                <TcIconWithTooltip tooltipText={tokenDetails.description} />
                            </b>
                        </span>
                        , you need to connect your wallet. Please connect your wallet to continue.
                    </Typography>
                    <Stack className='flex flex-row justify-end space-x-2 items-center'>
                        <ConnectButton />
                    </Stack>
                </div>
            }
        />
    );
}

export default TcWalletContainer;
