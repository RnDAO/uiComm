import { useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { Abi } from 'viem';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { engagementContracts } from '@/lib/contracts/engagement/contracts';

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

  const { isConnected, chainId } = useAccount();

  const engagementContract = engagementContracts.find(
    (contract) => contract.chainId === chainId
  );

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
            chainId,
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
                For any changes please contact{' '}
                <Link
                  href='https://www.togethercrew.com/contact-us'
                  className='font-bold underline'
                >
                  customer support
                </Link>
              </Alert>{' '}
            </div>
          )}

          <TcBoxContainer
            contentContainerChildren={
              <Stack className='space-y-4'>
                <Stack className='space-y-4 px-4 pb-[1rem] pt-4 md:px-10'>
                  <Typography variant='h6' fontWeight='bold'>
                    Reputation Score
                  </Typography>
                  <Typography variant='body2'>
                    set up your community’s reputation score to turn offchain
                    activity into onchain points.
                  </Typography>
                  <Typography variant='body2'>
                    A member’s reputation score captures their involvement in
                    your community. The score is stored onchain and updates
                    weekly and combines a member’s activity and influence. No
                    identifiable information is stored onchain.{' '}
                    <Link
                      href='https://togethercrew.gitbook.io/onboarding/features/reputation'
                      target='_blank'
                      className='font-bold text-secondary underline'
                    >
                      Read more
                    </Link>
                  </Typography>
                  <Stack className='flex w-full justify-end space-y-4'>
                    <ConnectButton />
                  </Stack>

                  <Alert
                    severity='info'
                    sx={{
                      borderRadius: 2,
                      zIndex: 0,
                    }}
                  >
                    <AlertTitle fontWeight='bold'>How it works</AlertTitle>
                    <Stack gap={2}>
                      <Typography variant='body2'>
                        1.You activate the reputation module for your community.
                        We will link your community with a specific community id
                        token.
                      </Typography>
                      <Typography variant='body2'>
                        2.Any member who has{' '}
                        <Link
                          href='/community-settings'
                          className='font-bold underline'
                        >
                          view
                        </Link>{' '}
                        access to togethercrew.com can mint their reputation
                        score.
                      </Typography>
                      <Typography variant='body2'>
                        3.Your members will log into togethercrew.com, connect
                        their wallet and link their discord handle to their
                        wallet. This attestation is encrypted. Personal
                        identifiers are not stored onchain.
                      </Typography>
                      <Typography variant='body2'>
                        4.Your members can see their reputation score on
                        togethercrew.com and in their wallet.
                      </Typography>
                    </Stack>
                  </Alert>

                  {isConnected ? (
                    <Button
                      variant='contained'
                      onClick={() =>
                        writeContract({
                          address: engagementContract?.address as `0x${string}`,
                          abi: engagementContract?.abi as Abi,
                          functionName: 'issue',
                          args: [],
                        })
                      }
                    >
                      {isPending || isWaiting
                        ? 'Processing...'
                        : 'Issue Community ID'}
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
