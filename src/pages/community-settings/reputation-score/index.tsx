import React, { useState, useEffect, useRef } from 'react';
import { defaultLayout } from '../../../layouts/defaultLayout';
import { withRoles } from '../../../utils/withRoles';
import SEO from '../../../components/global/SEO';
import TcBoxContainer from '../../../components/shared/TcBox/TcBoxContainer';
import TcBreadcrumbs from '../../../components/shared/TcBreadcrumbs';
import TcText from '../../../components/shared/TcText';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FormControl, TextField, Typography, IconButton, Button, Avatar, Grid, Paper } from '@mui/material';
import { useAccount } from 'wagmi';
import { AiOutlineDelete } from "react-icons/ai";

function Index() {
    const { address, isConnected } = useAccount();
    const [connected, setConnected] = useState<boolean>(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [hover, setHover] = useState<boolean>(false);
    const fileInputRef = useRef(null);

    const [tokenName, setTokenName] = useState('');
    const [tokenDescription, setTokenDescription] = useState('');
    const [issuedToken, setIssuedToken] = useState<{ name: string, description: string, image: string, id: string } | null>(null);

    useEffect(() => {
        setConnected(isConnected);
    }, [isConnected]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const removeImage = () => {
        setUploadedImage(null);
    };

    const generateTokenId = () => {
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIssuedToken({
            name: tokenName,
            description: tokenDescription,
            image: uploadedImage,
            id: generateTokenId(),
        });
    };

    console.log(issuedToken);


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
                                            text='lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
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
                                            <TextField
                                                label="Token Name"
                                                variant="outlined"
                                                fullWidth
                                                required
                                                value={tokenName}
                                                onChange={(e) => setTokenName(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth margin="normal">
                                            <TextField
                                                label="Token Description"
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                                fullWidth
                                                required
                                                value={tokenDescription}
                                                onChange={(e) => setTokenDescription(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth margin="normal">
                                            <Typography variant="body1" gutterBottom>
                                                Token Logo
                                            </Typography>
                                            <div
                                                style={{
                                                    border: '1px dashed #ccc',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    height: '200px',
                                                    width: '200px',
                                                    position: 'relative',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                onClick={triggerFileInput}
                                                onMouseEnter={() => setHover(true)}
                                                onMouseLeave={() => setHover(false)}
                                                className={hover ? 'blurred' : ''}
                                            >
                                                {uploadedImage ? (
                                                    <>
                                                        <div
                                                            style={{
                                                                height: '100%',
                                                                width: '100%',
                                                                backgroundImage: `url(${uploadedImage})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                filter: hover ? 'blur(3px)' : 'none',
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                            }}
                                                        ></div>
                                                        {hover && (
                                                            <IconButton
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    backgroundColor: 'rgba(255, 0, 0, 0.7)',
                                                                    color: 'white',
                                                                }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeImage();
                                                                }}
                                                            >
                                                                <AiOutlineDelete />
                                                            </IconButton>
                                                        )}
                                                    </>
                                                ) : (
                                                    <Typography variant="body2" color="textSecondary">
                                                        Click to upload image
                                                    </Typography>
                                                )}
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept='image/*'
                                                    ref={fileInputRef}
                                                    onChange={handleImageUpload}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormControl fullWidth margin="normal">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                            >
                                                Issue community Token
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
                                                <Typography variant="body2">ID: 12332193821</Typography>
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
