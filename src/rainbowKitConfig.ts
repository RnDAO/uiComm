import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, baseSepolia } from 'viem/chains';
import { http } from 'wagmi';

import { conf } from './configs';

const isProduction = conf.IS_MAIN_NET === 'true';

export const SUPPORTED_CHAINS: Chain[] = isProduction
  ? [arbitrum]
  : [baseSepolia];

export const wagmiConfig = getDefaultConfig({
  appName: 'TogetherCrew',
  chains: SUPPORTED_CHAINS as any,
  projectId: conf.PROJECT_ID as string,
  ssr: false,

  transports: SUPPORTED_CHAINS.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
