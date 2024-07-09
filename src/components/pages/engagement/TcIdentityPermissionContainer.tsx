import React, { useState } from 'react';
import TcBoxContainer from '../../shared/TcBox/TcBoxContainer';
import { Stack, Typography, Button, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useAccount } from 'wagmi';
import TcButton from '../../shared/TcButton';
import TcCommunityPlatformIcon from '../../communitySettings/communityPlatforms/TcCommunityPlatformIcon';

interface Credential {
    name: string;
    granted: boolean;
    connected: boolean;
}

function TcIdentityPermissionContainer() {
    const { address, isConnected } = useAccount();
    const [attestations, setAttestations] = useState<number>(0);
    const [credentials, setCredentials] = useState<Credential[]>([
        { name: 'Telegram', granted: false, connected: false },
        { name: 'Discord', granted: false, connected: false },
    ]);

    const handleConnect = (index: number, grant = false) => {
        const newCredentials = [...credentials];
        newCredentials[index].connected = true;
        if (grant) {
            newCredentials[index].granted = true;
        }
        setCredentials(newCredentials);
    };

    const handleRevoke = (index: number) => {
        const newCredentials = [...credentials];
        newCredentials[index].connected = false;
        newCredentials[index].granted = false;
        setCredentials(newCredentials);
    };

    return (
        <TcBoxContainer
            contentContainerChildren={
                <div className={`relative space-y-4 p-4 ${!isConnected ? 'blur-sm' : ''}`}>
                    <Stack className='flex flex-row space-x-2 items-center'>
                        <span className='text-white bg-secondary rounded-full flex items-center justify-center h-8 w-8'>2</span>
                        <Typography variant='h6' fontWeight="bold">
                            {attestations === 0 ? 'Sign-up On-chain' : 'Your Attestations'}
                        </Typography>
                    </Stack>
                    <Typography variant='body2'>
                        TogetherCrew has partnered with <strong>OnchainID</strong> to securely create on-chain
                        attestations of user credentials. With <strong>OnchainID</strong>, you own your credentials and
                        get to decide which apps can view them.
                    </Typography>
                    {attestations === 0 ? (
                        <>
                            <Typography variant='body2'>
                                To mint a new token, you need to create a profile on <a href='https://onchainid.com?publicKey=togetherCrewPublicKey' target='_blank' rel='noopener noreferrer'>OnchainID</a>.
                            </Typography>
                            <Stack className='flex flex-row justify-end space-x-2 items-center'>
                                <TcButton text={'Register on OnchainID'} variant='contained' onClick={() => setAttestations(1)} />
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Typography variant='body2'>
                                You have the following credentials attested:
                            </Typography>
                            <List>
                                {credentials.map((credential, index) => (
                                    <ListItem key={index} divider>
                                        <ListItemIcon>
                                            <TcCommunityPlatformIcon platform={credential.name} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={credential.name}
                                            secondary={`Granted: ${credential.granted ? 'Yes' : 'No'}`}
                                        />
                                        <div className='space-x-3'>
                                            <TcButton
                                                text="Connect"
                                                variant='outlined'
                                                onClick={() => handleConnect(index)}
                                                disabled={credential.connected}
                                            />
                                            <TcButton
                                                text="Connect & Grant"
                                                variant='contained'
                                                onClick={() => handleConnect(index, true)}
                                                disabled={credential.connected && credential.granted}
                                            />
                                            <TcButton
                                                text="Revoke"
                                                variant='contained'
                                                className='bg-error-500'
                                                onClick={() => handleRevoke(index)}
                                                disabled={!credential.connected}
                                            />
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}
                </div >
            }
        />
    );
}

export default TcIdentityPermissionContainer;
