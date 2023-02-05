import React, { useEffect, useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';
import CustomModal from '../../global/CustomModal';
import CustomButton from '../../global/CustomButton';
import ConnectedCommunitiesItem from './ConnectedCommunitiesItem';
import { toast } from 'react-toastify';
import { FaRegCheckCircle } from 'react-icons/fa';

export default function ConnectedCommunitiesList({ guilds }: any) {
  const [open, setOpen] = useState<boolean>(false);
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

  return (
    <div className="bg-gray-background rounded-lg px-4 md:h-[268px]">
      <p className="text-base font-semibold pt-2">Connected communities</p>
      <div className="p-4 flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4">
        {guilds && guilds.length > 0
          ? guilds.map((guild: any) => (
              <ConnectedCommunitiesItem
                key={guild.id}
                guild={guild}
                onClick={() => setOpen(true)}
              />
            ))
          : ''}
      </div>
      <CustomModal isOpen={open} toggleModal={toggleModal} hasClose={true}>
        <div className="mx-auto text-center md:w-2/3 space-y-6 pb-8">
          <BsClockHistory
            size={60}
            className="mx-auto bg-gray-100 rounded-full p-3"
          />
          <h3 className="text-xl font-bold">
            Are you sure you want to <br className="hidden md:flex" />{' '}
            disconnect your community?
          </h3>
          <p className="text-sm">
            Importing activities and members will be stopped. Historical
            activities will not be affected.
          </p>
          <div>
            <CustomButton
              classes="bg-secondary text-white"
              label={'Yes, disconnect'}
              onClick={() => {
                setOpen(false), notify();
              }}
            />
            <CustomButton
              classes="text-secondary mt-2"
              label={'Cancel'}
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
