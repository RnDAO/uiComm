import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'viem/chains';
import { http } from 'wagmi';

import { conf } from './configs';

export const SUPPORTED_CHAINS: Chain[] = [baseSepolia];

export const wagmiConfig = getDefaultConfig({
  appName: 'TogetherCrew',
  chains: SUPPORTED_CHAINS as any,
  projectId: 'e6cfdac03834b31ebda253eab5177e8d',
  ssr: false,

  transports: SUPPORTED_CHAINS.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
