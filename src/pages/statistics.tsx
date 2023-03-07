import { useEffect, useState } from 'react';
import CustomTab from '../components/global/CustomTab';
import { defaultLayout } from '../layouts/defaultLayout';
import ActiveMembersComposition from '../components/pages/statistics/ActiveMembersComposition';
import Onboarding from '../components/pages/statistics/Onboarding';
import InteractionsSection from '../components/pages/statistics/InteractionsSection';
import DisengagedMembersComposition from '../components/pages/statistics/DisengagedMembersComposition';
import InactiveMembers from '../components/pages/statistics/InactiveMembers';
import { StorageService } from '../services/StorageService';
import { IUser } from '../utils/types';
import useAppStore from '../store/useStore';
import moment from 'moment';
import SimpleBackdrop from '../components/global/LoadingBackdrop';

const Statistics = () => {
  const [active, setActive] = useState(1);
  const { fetchInteractions, isLoading } = useAppStore();
  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      const { guild } = user;
      fetchInteractions(
        guild.guildId,
        moment().subtract(7, 'days'),
        moment().format('YYYY-MM-DDTHH:mm:ss[Z]')
      );
    }
  }, []);

  const handleDateRange = (dateRangeType: string | number) => {
    let dateTime: string[] = [];
    switch (dateRangeType) {
      case 1:
        setActive(dateRangeType);
        dateTime = [
          moment().subtract('7', 'days').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        ];
        break;
      case 2:
        setActive(dateRangeType);
        dateTime = [
          moment().subtract('1', 'months').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        ];
        break;
      case 3:
        setActive(dateRangeType);
        dateTime = [
          moment().subtract('3', 'months').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        ];
        break;
      case 4:
        setActive(dateRangeType);
        dateTime = [
          moment().subtract('6', 'months').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        ];
        break;
      case 5:
        setActive(dateRangeType);
        dateTime = [
          moment().subtract('1', 'year').format('YYYY-MM-DDTHH:mm:ss[Z]'),
          moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        ];
        break;
      default:
        break;
    }
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      const { guild } = user;
      fetchInteractions(guild.guildId, dateTime[0], dateTime[1]);
    }
  };

  if (isLoading) {
    return <SimpleBackdrop />;
  }
  return (
    <>
      <div className="flex flex-col container space-y-8 justify-between px-4 md:px-12 py-4">
        <CustomTab
          labels={['Active members', 'Disengaged members']}
          content={[
            <div className="flex flex-col space-y-8">
              <ActiveMembersComposition />
              <Onboarding />
              <InteractionsSection
                activePeriod={active}
                handleDateRange={handleDateRange}
              />
            </div>,
            <div className="flex flex-col space-y-8">
              <DisengagedMembersComposition />
              <InactiveMembers />
            </div>,
          ]}
        />
      </div>
    </>
  );
};

Statistics.pageLayout = defaultLayout;

export default Statistics;
