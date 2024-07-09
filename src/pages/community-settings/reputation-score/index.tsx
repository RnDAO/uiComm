import React, { useState, useEffect } from 'react';
import { defaultLayout } from '../../../layouts/defaultLayout';
import { withRoles } from '../../../utils/withRoles';
import SEO from '../../../components/global/SEO';
import TcBoxContainer from '../../../components/shared/TcBox/TcBoxContainer';
import TcBreadcrumbs from '../../../components/shared/TcBreadcrumbs';
import TcText from '../../../components/shared/TcText';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FormControl, Typography, Button, Avatar, Grid, Paper } from '@mui/material';
import { useAccount } from 'wagmi';
import { useToken } from '../../../context/TokenContext';
import { conf } from '../../../configs';

function Index() {
    const { address, isConnected } = useAccount();
    const { community } = useToken();
    const [connected, setConnected] = useState<boolean>(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [tokenName, setTokenName] = useState('');
    const [tokenDescription, setTokenDescription] = useState('');
    const [issuedToken, setIssuedToken] = useState<{ name: string, description: string, image: string, id: string, platform: any } | null>(null);

    useEffect(() => {
        setConnected(isConnected);
    }, [isConnected]);

    const generateTokenId = () => {
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    };

    const platform = community?.platforms.find(
        (platform) =>
            platform.disconnectedAt === null && platform.name === 'discord'
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!platform) {
            alert('No active platform found');
            return;
        }
        setIssuedToken({
            name: platform?.metadata?.name,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            image: `${conf.DISCORD_CDN}icons/${platform.metadata.id}/${platform.metadata.icon}`,
            id: generateTokenId(),
            platform: platform
        });
    };

    return (
        <>
            <SEO titleTemplate='Hivemind Settings' />
            <div className='container flex flex-col space-y-3 px-4 py-4 md:px-12'>
                <TcBreadcrumbs
                    items={[
                        {
                            label: 'Community Settings',
                            path: '/community-settings',
                        },
                        {
                            label: 'Reputation Settings',
                            path: '/community-settings/reputation-score/',
                        },
                    ]}
                />
                <TcBoxContainer
                    contentContainerChildren={
                        <div className='relative space-y-4'>
                            <div className={`space-y-4 px-4 pt-4 pb-[1rem] md:px-10 ${!connected ? 'blur-sm' : ''}`}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <TcText
                                            text='Reputation Score'
                                            variant='h6'
                                            fontWeight='bold'
                                        />
                                        <TcText
                                            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                            variant='body2'
                                        />
                                    </div>
                                    {connected && (
                                        <div className="text-right">
                                            <ConnectButton />
                                        </div>
                                    )}
                                </div>
                                {!issuedToken ? (
                                    <form onSubmit={handleSubmit}>
                                        <FormControl fullWidth margin="normal">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                            >
                                                Issue Community Token
                                            </Button>
                                        </FormControl>
                                    </form>
                                ) : (
                                    <Paper elevation={0} style={{ padding: '5px', borderRadius: '18px' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Avatar
                                                    alt="Token Logo"
                                                    src={issuedToken.image}
                                                    sx={{ width: 56, height: 56 }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h6">{issuedToken.name}</Typography>
                                                <Typography variant="body2">NFT ID: {issuedToken.id}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="body1" style={{ marginTop: '10px' }}>
                                            {issuedToken.description}
                                        </Typography>
                                    </Paper>
                                )}
                            </div>
                            {!connected && (
                                <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75'>
                                    <ConnectButton />
                                </div>
                            )}
                        </div>
                    }
                />
            </div>
        </>
    );
}

Index.pageLayout = defaultLayout;

export default withRoles(Index, ['admin']);
