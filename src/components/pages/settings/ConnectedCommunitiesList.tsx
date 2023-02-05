import { useState } from 'react';
import CustomModal from '../../global/CustomModal';
import CustomButton from '../../global/CustomButton';
import ConnectedCommunitiesItem from './ConnectedCommunitiesItem';
import { toast } from 'react-toastify';
import { FaRegCheckCircle } from 'react-icons/fa';
import { Paper } from '@mui/material';
import useAppStore from '../../../store/useStore';
import { DISCONNECT_TYPE } from '../../../store/types/ISetting';

export default function ConnectedCommunitiesList({ guilds }: any) {
  const { disconnecGuildById } = useAppStore();
  const [open, setOpen] = useState<boolean>(false);
  const [guildId, setGuildId] = useState<string>('');
  const toggleModal = (e: boolean) => {
    setOpen(e);
  };
  const notify = () => {
    toast('Account has been unlinked.', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      closeButton: false,
      theme: 'light',
      icon: <FaRegCheckCircle color="#56C054" />,
    });
  };

  const disconnectGuild = (discconectType: DISCONNECT_TYPE) => {
    disconnecGuildById(guildId, discconectType).then((_res: any) => {
      notify();
    });
  };

  return (
    <>
      {guilds && guilds.length > 0
        ? guilds.map((guild: any) => (
            <div className="bg-gray-background rounded-lg px-4 md:h-[268px]">
              <p className="text-base font-semibold pt-2">
                Connected communities
              </p>
              <div className="p-4 flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4">
                <ConnectedCommunitiesItem
                  key={guild.id}
                  guild={guild}
                  onClick={(guildId: any) => {
                    setGuildId(guildId), setOpen(true);
                  }}
                />
              </div>
            </div>
          ))
        : ''}
      <CustomModal isOpen={open} toggleModal={toggleModal} hasClose={true}>
        <div className="mx-auto text-center md:w-full space-y-6 pt-4 pb-8">
          <h3 className="text-xl font-bold">
            Are you sure you want to disconnect{' '}
            <br className="hidden md:flex" /> your community?
          </h3>
          <div className="flex flex-row justify-between space-x-8">
            <Paper
              sx={{
                padding: '2rem 1rem',
              }}
              className="space-y-8 shadow-md rounded-xl"
            >
              <div className="space-y-4 p-2.5">
                <h3 className="font-bold">Disconnect and delete data</h3>
                <p className="text-sm text-left">
                  Importing activities and members will be stopped. Historical
                  activities <b>will be deleted</b>.
                </p>
              </div>
              <CustomButton
                classes="bg-secondary text-white"
                label={'Disconnect and delete'}
                onClick={() => {
                  disconnectGuild('hard');
                }}
              />
            </Paper>
            <Paper
              sx={{
                padding: '2rem 1rem',
              }}
              className="space-y-8 shadow-md rounded-xl"
            >
              <div className="space-y-4 p-2.5">
                <h3 className="font-bold">Disconnect only</h3>
                <p className="text-sm text-left">
                  Importing activities and members will be stopped. Historical
                  activities <b>will not be affected</b>.
                </p>
              </div>
              <CustomButton
                classes="bg-secondary text-white"
                label={'Disconnect'}
                onClick={() => {
                  disconnectGuild('soft');
                }}
              />
            </Paper>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
