import { Avatar, Paper } from '@mui/material';
import React from 'react';
import { ITwitter } from '../../../utils/types';
import useAppStore from '../../../store/useStore';
import { BsTwitter } from 'react-icons/bs';
import moment from 'moment';
import { StorageService } from '../../../services/StorageService';
import clsx from 'clsx';

interface IConnectedTwitter {
  twitter?: ITwitter;
}

function ConnectedTwitter({ twitter }: IConnectedTwitter) {
  const { disconnectTwitter, getUserInfo } = useAppStore();

  const handleDisconnect = async () => {
    try {
      await disconnectTwitter();

      const userInfo = await getUserInfo();
      const {
        twitterConnectedAt,
        twitterId,
        twitterProfileImageUrl,
        twitterUsername,
      } = userInfo;

      StorageService.updateLocalStorageWithObject('user', 'twitter', {
        twitterConnectedAt,
        twitterId,
        twitterProfileImageUrl,
        twitterUsername,
      });

      StorageService.removeLocalStorage('lastTwitterMetricsRefreshDate');
    } catch (error) {
      console.error('Error handling disconnect:', error);
    }
  };

  return (
    <div>
      <Paper className="text-center mx-auto h-[200px] border border-gray-300 w-[200px] py-3 shadow-box rounded-xl flex flex-col justify-between">
        <div>
          <div className="font-sm flex justify-center items-center text-center">
            <p className="pr-1">Twitter</p>
            <span
              className={clsx(
                'md:h-3 md:w-3 rounded-full',
                twitter?.twitterIsInProgress ? 'bg-success' : 'bg-warning-500'
              )}
            />
          </div>
          <BsTwitter size={30} className="mx-auto mt-2 mb-3" />
        </div>
        <div className="flex items-center space-x-1 mx-auto">
          <Avatar
            sx={{ height: 35, width: 35 }}
            src={twitter?.twitterProfileImageUrl}
          />
          <div className="text-left">
            <p className="font-bold text-sm">{twitter?.twitterUsername}</p>
            <p className="text-xs">{`Connected ${moment(
              twitter?.twitterConnectedAt
            ).format('DD MMM yyyy')}`}</p>
          </div>
        </div>
        <div
          className="border-t text-secondary pt-2 font-semibold cursor-pointer"
          onClick={handleDisconnect}
        >
          Disconnect
        </div>
      </Paper>
    </div>
  );
}

export default ConnectedTwitter;
