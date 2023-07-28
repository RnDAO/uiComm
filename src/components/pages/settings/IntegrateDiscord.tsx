import useAppStore from '../../../store/useStore';
import ConnectCommunities from './ConnectCommunities';
import ConnectedCommunitiesList from './ConnectedCommunitiesList';

export default function IntegrateDiscord() {
  const { guilds } = useAppStore();

  return (
    <div className="flex flex-col md:flex-row md:space-x-10">
      <ConnectedCommunitiesList guilds={guilds} />
      <ConnectCommunities />
    </div>
  );
}
