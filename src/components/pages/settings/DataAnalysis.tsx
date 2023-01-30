import React, { useEffect, useState } from 'react';
import CustomModal from '../../global/CustomModal';
import CustomButton from '../../global/CustomButton';
import DatePeriodRange from '../../global/DatePeriodRange';
import { BsClockHistory } from 'react-icons/bs';
import useAppStore from '../../../store/useStore';
import { FiInfo } from 'react-icons/fi';
import moment from 'moment';

export default function DataAnalysis() {
  const [activePeriod, setActivePeriod] = useState<number | string>(1);
  const [analysisStateDate, setAnalysisStartDate] = useState<any>('');
  const [open, setOpen] = useState<boolean>(false);
  const [isDisabled, toggleDisabled] = useState<boolean>(true);
  const { guildInfo } = useAppStore();
  const handleActivePeriod = (e: number) => {
    toggleDisabled(false);
    setActivePeriod(e);
  };

  useEffect(() => {
    setAnalysisStartDate(guildInfo.period);
  }, [guildInfo]);

  const toggleModal = (e: boolean) => {
    setOpen(e);
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-sm text-black">
        It might take up to 12 hours to finish new data import. Once it is done
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
            It might take up to 12 hours to finish new data import.{' '}
            <br className="hidden md:flex" /> Once it is done we will send you a
            message on Discord.
          </p>
          <CustomButton
            classes="bg-secondary text-white"
            label={'I understand'}
            onClick={() => setOpen(false)}
          />
        </div>
      </CustomModal>
    </div>
  );
}
