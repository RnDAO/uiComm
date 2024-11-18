import { useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import sepoliachain from '@/lib/contracts/engagement/sepoliaChain.json';

import SEO from '@/components/global/SEO';
import TcBoxContainer from '@/components/shared/TcBox/TcBoxContainer';
import TcBreadcrumbs from '@/components/shared/TcBreadcrumbs';

import useAppStore from '@/store/useStore';

import { useToken } from '@/context/TokenContext';
import { defaultLayout } from '@/layouts/defaultLayout';

function Index() {
  const [moduleId, setModuleId] = useState<string | null>(null);
  const { dynamicNFTModuleInfo, retrieveModules, patchModule } = useAppStore();
  const { community } = useToken();

  const { isConnected } = useAccount();

  const fetchReputationScore = async () => {
    const reputationScoreModule = await retrieveModules({
      community: community?.id,
      name: 'dynamicNft',
    });

    setModuleId(reputationScoreModule?.results[0]?.id);
  };

  const handlePatchReputationScore = async (txId: string) => {
    const payload = {
      platforms: [
        {
          metadata: {
            transactionHash: txId,
          },
        },
      ],
    };
    await patchModule({
      moduleId: moduleId,
      payload,
    });
  };

  useEffect(() => {
    fetchReputationScore();
  }, []);

  const {
    data: transactionHash,
    writeContract,
    isPending,
  } = useWriteContract();

  const { isFetching: isWaiting } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  useEffect(() => {
    if (transactionHash) {
      handlePatchReputationScore(transactionHash);
    }
  }, [transactionHash]);

  return (
    <>
      <SEO titleTemplate='Reputation Score' />
      <div className='container flex flex-col space-y-3 px-4 py-4 md:px-12'>
        <TcBreadcrumbs
          items={[
            {
              label: 'Community Settings',
              path: '/community-settings',
            },
            {
              label: 'Reputation Score',
              path: '/community-settings/reputation-score',
            },
          ]}
        />
        <div className='relative'>
          {/* Blur Layer */}
          {dynamicNFTModuleInfo?.isNFTModuleEnabled && (
            <div className='absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm'>
              <Alert severity='info'>
                <AlertTitle>
                  Reputation Score is enabled for this community.
                </AlertTitle>
                In order to make any change please contact to the community
                customer support.
              </Alert>{' '}
            </div>
          )}

          <TcBoxContainer
            contentContainerChildren={
              <Stack className='space-y-4'>
                <Stack className='space-y-4 px-4 pt-4 pb-[1rem] md:px-10'>
                  <Typography variant='h6' fontWeight='bold'>
                    Reputation Score
                  </Typography>
                  <Typography variant='body2'>
                    Reputation score is a number that represents the
                    trustworthiness of a user in the community. It is calculated
                    based on the user's activity and behavior in the community.
                  </Typography>
                  <Stack className='flex w-full justify-end space-y-4'>
                    <ConnectButton />
                  </Stack>

                  {isConnected ? (
                    <Button
                      variant='contained'
                      onClick={() =>
                        writeContract({
                          address:
                            sepoliachain.contractAddress as `0x${string}`,
                          abi: sepoliachain.contractABI,
                          functionName: 'issue',
                          args: [community?.name],
                        })
                      }
                    >
                      {isPending || isWaiting ? 'Processing...' : 'Issue Token'}
                    </Button>
                  ) : (
                    ''
                  )}

                  {transactionHash && (
                    <Typography variant='body2'>
                      Transaction Hash: {transactionHash}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            }
          />
        </div>
      </div>
    </>
  );
}

Index.pageLayout = defaultLayout;
export default Index;
