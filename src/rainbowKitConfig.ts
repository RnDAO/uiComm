import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'viem/chains';
import { http } from 'wagmi';


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
