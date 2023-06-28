import React, { useEffect, useState } from 'react';
import CustomModal from '../../global/CustomModal';
import CustomButton from '../../global/CustomButton';
import DatePeriodRange from '../../global/DatePeriodRange';
import { BsClockHistory } from 'react-icons/bs';
import useAppStore from '../../../store/useStore';
import { FiInfo } from 'react-icons/fi';
import { BiError } from 'react-icons/bi';
import moment from 'moment';
import { StorageService } from '../../../services/StorageService';
import { IGuild, IUser } from '../../../utils/types';

export default function DataAnalysis() {
  const [activePeriod, setActivePeriod] = useState<number | string>(1);
  const [guild, setGuild] = useState<IGuild>();
  const [analysisStateDate, setAnalysisStartDate] = useState<any>('');
  const [open, setOpen] = useState<boolean>(false);
  const [datePeriod, setDatePeriod] = useState<string>('');
  const [isDisabled, toggleDisabled] = useState<boolean>(true);
  const { guildInfo, updateAnalysisDatePeriod, getUserGuildInfo, guilds } =
    useAppStore();

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
    toggleDisabled(false);
  };

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      setGuild(user.guild);
    }
    const start = moment(guildInfo.period, 'YYYY-MM-DD');
    const end = moment();

    const datePeriod = moment.duration(end.diff(start)).asMonths();

    if (datePeriod < 0.5) {
      setActivePeriod(1);
    } else if (datePeriod < 1) {
      setActivePeriod(2);
    } else if (datePeriod < 3) {
      setActivePeriod(3);
    } else if (datePeriod < 6) {
      setActivePeriod(4);
    } else {
      setActivePeriod(5);
    }

    setAnalysisStartDate(guildInfo.period);
  }, [guildInfo]);

  const toggleModal = (e: boolean) => {
    setOpen(e);
  };

  const submitNewDatePeriod = () => {
    updateAnalysisDatePeriod(guild?.guildId, datePeriod).then((_res: any) => {
      getUserGuildInfo(guild?.guildId);
      setOpen(false);
    });
  };

  if (guilds.length === 0) {
    return (
      <div className="flex flex-col space-y-4">
        <p className="text-sm text-black">
          It might take up to 6 hours to finish new data import. Once it is done
          we will <br /> send you a message on Discord.
        </p>
        <p className="flex flex-row items-stretch text-sm text-warning-500">
          <BiError size={24} />
          <span className="pl-1 text-sm">
            There is no community connected at the moment. To be able to select
            the date period,
            <br className="hidden md:block" /> please connect your community
            first.
          </span>
        </p>
        <div className="pointer-events-none opacity-50">
          <DatePeriodRange
            activePeriod={1}
            onChangeActivePeriod={handleActivePeriod}
          />
          <CustomButton
            classes="bg-secondary text-white mt-5"
            label={'Confirm selection'}
            disabled={isDisabled}
            onClick={() => toggleModal(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-sm text-black">
        It might take up to 6 hours to finish new data import. Once it is done
        we will <br /> send you a message on Discord.
      </p>
      <p className="flex flex-row items-center text-sm">
        <FiInfo size={24} />
        <span className="pl-1">
          Data analysis runs from:{' '}
          <b>{moment(analysisStateDate).format('DD MMMM yyyy')}</b>
        </span>
      </p>
      <DatePeriodRange
        activePeriod={activePeriod}
        onChangeActivePeriod={handleActivePeriod}
      />
      <div>
        <CustomButton
          classes="bg-secondary text-white mt-2"
          label={'Confirm selection'}
          disabled={isDisabled}
          onClick={() => toggleModal(true)}
        />
      </div>
      <CustomModal isOpen={open} toggleModal={toggleModal} hasClose={true}>
        <div className="mx-auto text-center md:w-2/3 space-y-6 pb-8">
          <BsClockHistory
            size={60}
            className="mx-auto bg-gray-100 rounded-full p-3"
          />
          <h3 className="text-xl font-bold">
            We are changing date period for data analysis now
          </h3>
          <p className="text-sm">
            It might take up to 6 hours to finish new data import.{' '}
            <br className="hidden md:flex" /> Once it is done we will send you a
            message on Discord.
          </p>
          <CustomButton
            classes="bg-secondary text-white"
            label={'I understand'}
            onClick={submitNewDatePeriod}
          />
        </div>
      </CustomModal>
    </div>
  );
}
