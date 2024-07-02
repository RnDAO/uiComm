import React, { useState } from 'react';
import SEO from '../../../components/global/SEO';
import { defaultLayout } from '../../../layouts/defaultLayout';
import { withRoles } from '../../../utils/withRoles';
import TcBoxContainer from '../../../components/shared/TcBox/TcBoxContainer';
import { Stack, Typography } from '@mui/material';
import TcButton from '../../../components/shared/TcButton';
import { useRouter } from 'next/router';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

function Index() {
    const { address, isConnected } = useAccount();
    const [isMinted, setIsMinted] = useState<boolean>(true);
    const router = useRouter();

    const handleMint = () => {
        router.push('/engagement/reputation-nft/12332/mint');
        // setIsMinted(true);
    };

    const handleRedirect = () => {
        router.push('/engagement/reputation-nft/12332/213');
    };

    return (
        <>
            <SEO titleTemplate='Reputation Score' />
            <div className='container flex flex-col justify-between px-4 py-3 md:px-12 space-y-4'>
                <TcBoxContainer
                    contentContainerChildren={
                        <div className="relative space-y-4 p-4">
                            <div className='space-y-3'>
                                <Stack className='flex flex-row justify-between space-x-2 items-center'>
                                    <Typography variant='h5'>Reputation Score</Typography>
                                    <ConnectButton />
                                </Stack>
                                <Typography variant="body2" color="initial">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi ipsum corrupti incidunt similique facere aperiam, et nulla, voluptates asperiores quidem laudantium doloribus ducimus ut. Iste vitae tenetur deserunt illum sapiente.
                                </Typography>
                            </div>
                            <div className={`flex justify-center items-center pb-12 ${!isConnected ? 'blur-sm' : ''}`}>
                                <div className='relative w-3/5 my-12 rounded-xl shadow-lg text-center h-[42rem]'>
                                    <div className={`absolute inset-0 ${isMinted ? 'backdrop-blur-2xl' : ''} nft-background rounded-xl`}></div>
                                    <div className='relative z-10 p-4'>
                                        <div className='w-1/3 space-y-3 mx-auto text-center translate-y-1/2'>
                                            <Typography variant='h6' className='text-white'>Your Engagement Score:</Typography>
                                            <Typography variant='h1' className='text-white'>{isMinted ? '100' : 'N/A'}</Typography>
                                            <div className='space-y-1.5 text-white'>
                                                <Typography variant='body2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Typography>
                                                {isMinted ? (
                                                    <>
                                                        <TcButton text={"More Details"} variant='contained' fullWidth onClick={handleRedirect} />
                                                        <TcButton text={"Settings"} variant='contained' className='bg-white text-black' fullWidth onClick={handleMint} />
                                                    </>
                                                ) : (
                                                    <TcButton text={"Mint Reputation NFT"} variant='contained' fullWidth onClick={handleMint} />
                                                )}
                                                <Typography variant='caption'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
        </>
    );
}

Index.pageLayout = defaultLayout;

export default withRoles(Index, ['view']);
