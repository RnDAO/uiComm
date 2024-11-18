import { Alert, Button, Stack, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAccount, useReadContract } from 'wagmi';

import sepoliachain from '@/lib/contracts/engagement/sepoliaChain.json';

import SEO from '@/components/global/SEO';
import TcBoxContainer from '@/components/shared/TcBox/TcBoxContainer';

import useAppStore from '@/store/useStore';

import dynamicNft from '@/assets/dynamic-nft.webp';
import { defaultLayout } from '@/layouts/defaultLayout';
import { withRoles } from '@/utils/withRoles';

function ReputationScore() {
  const { isConnected, address } = useAccount();
  const { dynamicNFTModuleInfo } = useAppStore();
  const router = useRouter();

  const { data: hasMinted } = useReadContract({
    address: sepoliachain.contractAddress as `0x${string}`,
    abi: sepoliachain.contractABI,
    functionName: 'balanceOf',
    args: [address, dynamicNFTModuleInfo?.metadata[0]?.tokenId],
  });

  return (
    <>
      <SEO titleTemplate='Reputation Score' />
      <div className='container flex flex-col px-4 py-4 md:px-12'>
        <TcBoxContainer
          contentContainerChildren={
            <div className='flex flex-col justify-between space-y-4 p-4 md:p-10'>
              <Stack
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='h5' fontWeight='bold'>
                  Reputation Score
                </Typography>
                <ConnectButton />
              </Stack>
              <Typography variant='body2'>
                Reputation Score is a number between 0 and 100 that represents
                the trustworthiness of a user. It is calculated based on the
                user's activity on the platform. The higher the score, the more
                trustworthy the user is.
              </Typography>
              <div className='relative'>
                {!isConnected && (
                  <Stack className='absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm'>
                    <Alert severity='warning' className='rounded-md'>
                      <Typography variant='body2'>
                        Please connect your wallet to view this section.
                      </Typography>
                    </Alert>
                  </Stack>
                )}
                <Stack className='mx-auto w-1/3 p-2' spacing={2}>
                  <Image
                    src={dynamicNft}
                    width={500}
                    height={300}
                    alt='dynamic-nft'
                    className='rounded-xl shadow-xl'
                  />
                  {typeof hasMinted === 'bigint' && hasMinted >= BigInt(1) ? (
                    <>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() =>
                          router.push(
                            `/reputation-score/${dynamicNFTModuleInfo?.metadata[0]?.tokenId}/${address}/score`
                          )
                        }
                        disabled={!isConnected}
                      >
                        See Score
                      </Button>
                      <Button
                        variant='outlined'
                        onClick={() => router.push('/reputation-score/mint')}
                        disabled={!isConnected}
                      >
                        Mint NFT
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => router.push('/reputation-score/mint')}
                      disabled={!isConnected}
                    >
                      Mint NFT
                    </Button>
                  )}
                </Stack>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

ReputationScore.pageLayout = defaultLayout;

export default withRoles(ReputationScore, ['view', 'admin']);
