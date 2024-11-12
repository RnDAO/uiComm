import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'viem/chains';
import { cookieStorage, createStorage, http } from 'wagmi';

import { conf } from './configs';

export const SUPPORTED_CHAINS: Chain[] = [sepolia];

export const wagmiConfig = getDefaultConfig({
  appName: 'TogetherCrew',
  chains: SUPPORTED_CHAINS as any,
  projectId: 'test',
  ssr: false,

  transports: SUPPORTED_CHAINS.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
