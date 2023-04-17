import useAppStore from '../../../store/useStore';
import ByHandle from './ByHandle';

export default function RollSelection() {
  const { guilds } = useAppStore();

  return (
    <div className="flex flex-col">
      <p className="font-bold text-base">Admins</p>
      <p className="text-lite-gray text-sm">
        Admins have full access to the account. They can manage members,
        permissions and other settings of the account.{' '}
      </p>
      <p className="text-lite-gray text-sm pt-4 ">Add admin by:</p>
      <div className="flex flex-row pt-3 justify-between">
        <ByHandle title='By handle'/>
        <ByHandle title='By role'/>
      </div>

      <p className="font-bold text-base pt-10">Viewers</p>
      <p className="text-lite-gray text-sm">
        Viewers can see all the metrics but don't have permission to change the
        settings.
      </p>
      <p className="text-lite-gray text-sm pt-4 ">Add admin by:</p>
      <div className="flex flex-row pt-3 pb-8 justify-between">
        <ByHandle title='By handle'/>
        <ByHandle title='By role'/>
      </div>

    </div>
  );
}
