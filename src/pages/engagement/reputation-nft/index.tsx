import React, { useState } from 'react';
import SEO from '../../../components/global/SEO';
import { defaultLayout } from '../../../layouts/defaultLayout';
import { withRoles } from '../../../utils/withRoles';
import TcBoxContainer from '../../../components/shared/TcBox/TcBoxContainer';
import { Typography } from '@mui/material';
import TcButton from '../../../components/shared/TcButton';
import { useRouter } from 'next/router';

function Index() {
    const [isMinted, setIsMinted] = useState<boolean>(false);
    const router = useRouter()

    const handleMint = () => {
        router.push('/engagement/reputation-nft/12332/mint');
        setIsMinted(true);
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
                                <Typography variant='h5'>Reputation Score</Typography>
                                <Typography variant="body2" color="initial">
                                    Here’s your soulbound Reputation NFT, this is non-transferrable and that you may earn rewards by minting & owning one
                                </Typography>
                            </div>
                            <div className='flex justify-center items-center pb-12'>
                                <div className='relative w-3/5 my-12 rounded-xl shadow-lg text-center h-[42rem]'>
                                    <div className={`absolute inset-0 ${isMinted ? 'backdrop-blur-2xl' : ''} nft-background rounded-xl`}></div>
                                    <div className='relative z-10 p-4'>
                                        <div className='w-1/3 space-y-3 mx-auto text-center translate-y-1/2'>
                                            <Typography variant='h6' className='text-white'>Your Engagement Score:</Typography>
                                            <Typography variant='h1' className='text-white'>{isMinted ? '100' : 'N/A'}</Typography>
                                            <div className='space-y-1.5 text-white'>
                                                <Typography variant='body2'>Mint your reputation on-chain for potential rewards, governance and more</Typography>
                                                {isMinted ? (
                                                    <TcButton text={"Show More"} variant='contained' fullWidth onClick={handleRedirect} />
                                                ) : (
                                                    <TcButton text={"Mint Reputation NFT"} variant='contained' fullWidth onClick={handleMint} />
                                                )}
                                                <Typography variant='caption'>Minting will occur on Arbitrum, make sure you have enough for network fees</Typography>
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
