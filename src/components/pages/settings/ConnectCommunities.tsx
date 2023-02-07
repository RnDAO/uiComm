import { Paper, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import CustomButton from '../../global/CustomButton';
import DatePeriodRange from '../../global/DatePeriodRange';
import CustomModal from '../../global/CustomModal';
import ChannelSelection from './ChannelSelection';
import { BsClockHistory } from 'react-icons/bs';
import useAppStore from '../../../store/useStore';
import { useRouter } from 'next/router';
import moment from 'moment';
import { StorageService } from '../../../services/StorageService';
import { IUser } from '../../../utils/types';

export default function ConnectCommunities() {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [guildId, setGuildId] = useState<any>('');
  const [activePeriod, setActivePeriod] = useState<number | string>(1);
  const [datePeriod, setDatePeriod] = useState<string>('');
  const [selectedChannels, setSelectedChannels] = useState<any[]>([]);

  const {
    guilds,
    connectNewGuild,
    patchGuildById,
    getUserGuildInfo,
  } = useAppStore();

  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (Object.keys(router?.query).length > 0 && router.query.isSuccessful) {
        const { guildId, guildName } = router?.query;
        let user: any = StorageService.readLocalStorage<IUser>('user');
        user = { token: user.token, guild: { guildId, guildName } };
        StorageService.writeLocalStorage('user', user);
        setGuildId(guildId);
        toggleModal(true);
        setDatePeriod(
          moment().subtract('7', 'days').format('YYYY-MM-DDTHH:mm:ss[Z]')
        );
      }
    }, [router]);
  }

  const updateSelectedChannels = (channels: any) => {
    setSelectedChannels(channels);
  };

  const handleActivePeriod = (dateRangeType: number | string) => {
    let dateTime = '';
    switch (dateRangeType) {
      case 1:
        setActivePeriod(dateRangeType);
        dateTime = moment()
          .subtract('7', 'days')
          .format('YYYY-MM-DDTHH:mm:ss[Z]');
        break;
      case 2:
        setActivePeriod(dateRangeType);
        dateTime = moment()
          .subtract('1', 'months')
          .format('YYYY-MM-DDTHH:mm:ss[Z]');
        break;
      case 3:
        setActivePeriod(dateRangeType);
        dateTime = moment()
          .subtract('3', 'months')
          .format('YYYY-MM-DDTHH:mm:ss[Z]');
        break;
      case 4:
        setActivePeriod(dateRangeType);
        dateTime = moment()
          .subtract('6', 'months')
          .format('YYYY-MM-DDTHH:mm:ss[Z]');
        break;
      case 5:
        setActivePeriod(dateRangeType);
        dateTime = moment()
          .subtract('1', 'year')
          .format('YYYY-MM-DDTHH:mm:ss[Z]');
        break;
      default:
        break;
    }
    setDatePeriod(dateTime);
  };

  const submitGuild = async () => {
    await patchGuildById(guildId, datePeriod, selectedChannels).then(
      (_res: any) => {
        setOpen(false);
        toggleConfirmModal(true);
      }
    );
  };

  const toggleModal = (e: boolean) => {
    setOpen(e);
  };

  const toggleConfirmModal = (e: boolean) => {
    setConfirmModalOpen(e);
    router.replace({
      pathname: '/settings',
    });
  };
  return (
    <>
      <CustomModal
        isOpen={confirmModalOpen}
        toggleModal={toggleConfirmModal}
        hasClose={true}
      >
        <div className="mx-auto text-center md:w-2/3 space-y-6 pb-8">
          <BsClockHistory
            size={60}
            className="mx-auto bg-gray-100 rounded-full p-3"
          />
          <h3 className="text-xl font-bold">{"Perfect, you're all set!"}</h3>
          <p className="text-sm">
            Data import just started. It might take up to 12 hours to finish.
            Once it is done we will send you a message on Discord.
          </p>
          <CustomButton
            classes="bg-secondary text-white"
            label={'I understand'}
            onClick={() => {
              getUserGuildInfo(guildId), setConfirmModalOpen(false);
            }}
          />
        </div>
      </CustomModal>
      <CustomModal isOpen={open} toggleModal={toggleModal} hasClose={true}>
        <div className="mx-auto text-left w-11/12 space-y-6 last:space-y-0  pb-8">
          <h3 className="font-bold text-base">
            Choose date period for data analysis
          </h3>
          <p className="text-base">
            You will be able to change date period and selected channels in the
            future.
          </p>
          <DatePeriodRange
            activePeriod={activePeriod}
            onChangeActivePeriod={handleActivePeriod}
          />
        </div>
        <div className="mx-auto text-left w-11/12 space-y-3 pb-8">
          <h3 className="font-bold text-base">
            Confirm your imported channels
          </h3>
          <ChannelSelection
            emitable={true}
            submit={(channels) => updateSelectedChannels(channels)}
          />
          <div className="text-center">
            <CustomButton
              classes="bg-secondary text-white mt-6"
              label={'Continue'}
              onClick={() => {
                submitGuild();
              }}
            />
          </div>
        </div>
      </CustomModal>
      <div className="h-[268px] flex justify-center">
        <div className="h-[200px] w-[200px]">
          <p className="text-base whitespace-nowrap font-semibold pt-2">
            Connect your communities
          </p>
          {guilds.length === 1 ? (
            <Tooltip
              title={
                <Typography fontSize={14}>
                  It will be possible to connect more communities soon.
                </Typography>
              }
              arrow
              placement="right"
            >
              <Paper className="text-center h-[200px] py-8 shadow-box rounded-xl mt-3 cursor-pointer opacity-60">
                <p className="font-sm">Discord</p>
                <FaDiscord size={60} className="mx-auto mt-2 mb-2" />
                <div className="text-secondary text-base flex items-center justify-center">
                  <GoPlus size={20} className="mr-1" />
                  <p className="font-bold">Connect</p>
                </div>
              </Paper>
            </Tooltip>
          ) : (
            <Paper
              className="text-center h-[200px] py-8 shadow-box rounded-xl mt-3 cursor-pointer"
              onClick={() => connectNewGuild()}
            >
              <p className="font-sm">Discord</p>
              <FaDiscord size={60} className="mx-auto mt-2 mb-2" />
              <div className="text-secondary text-base flex items-center justify-center">
                <GoPlus size={20} className="mr-1" />
                <p className="font-bold">Connect</p>
              </div>
            </Paper>
          )}
        </div>
      </div>
    </>
  );
}
