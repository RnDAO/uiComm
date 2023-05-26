import { useEffect, useState } from 'react';
import moment from 'moment';

import CustomTab from '../components/global/CustomTab';
import ActiveMembersComposition from '../components/pages/statistics/ActiveMembersComposition';
import DisengagedMembersComposition from '../components/pages/statistics/DisengagedMembersComposition';
import InteractionsSection from '../components/pages/statistics/InteractionsSection';
import InactiveMembers from '../components/pages/statistics/InactiveMembers';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import { defaultLayout } from '../layouts/defaultLayout';
import { IUser } from '../utils/types';
import { StorageService } from '../services/StorageService';
import useAppStore from '../store/useStore';
import SEO from '../components/global/SEO';

const Statistics = () => {
  const [activeMemberDate, setActiveMemberDate] = useState(1);
  const [disengagedMemberDate, setDisengagedMemberDate] = useState(1);
  const {
    fetchInteractions,
    fetchActiveMembers,
    fetchDisengagedMembers,
    fetchInactiveMembers,
    isLoading,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ): void => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');

    if (!user) {
      return;
    }

    const { guild } = user;

    if (activeTab === '1') {
      const activeDateRange = getDateRange(activeMemberDate);
      fetchInteractions(guild.guildId, activeDateRange[0], activeDateRange[1]);
      fetchActiveMembers(guild.guildId, activeDateRange[0], activeDateRange[1]);
    } else {
      const disengagedDateRange = getDateRange(disengagedMemberDate);
      fetchDisengagedMembers(
        guild.guildId,
        disengagedDateRange[0],
        disengagedDateRange[1]
      );
      fetchInactiveMembers(
        guild.guildId,
        disengagedDateRange[0],
        disengagedDateRange[1]
      );
    }
  }, [activeMemberDate, disengagedMemberDate, activeTab]);

  const getDateRange = (dateRangeType: number): string[] => {
    const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
    let startDate: moment.Moment;

    switch (dateRangeType) {
      case 2:
        startDate = moment().subtract(1, 'day').subtract('1', 'months');
        break;
      case 3:
        startDate = moment().subtract(1, 'day').subtract('3', 'months');
        break;
      case 4:
        startDate = moment().subtract(1, 'day').subtract('6', 'months');
        break;
      case 5:
        startDate = moment().subtract(1, 'day').subtract('1', 'year');
        break;
      default:
        startDate = moment(yesterday).subtract('7', 'days');
        break;
    }

    return [
      startDate.format('YYYY-MM-DDTHH:mm:ss[Z]'),
      moment(yesterday).format('YYYY-MM-DDTHH:mm:ss[Z]'),
    ];
  };

  const handleActiveMembersDateRange = (dateRangeType: number) => {
    setActiveMemberDate(dateRangeType);
  };

  const handleDisengagedMemberDateRange = (dateRangeType: number) => {
    setDisengagedMemberDate(dateRangeType);
  };

  if (isLoading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <SEO
        titleTemplate={
          activeTab === '1' ? 'Active Members' : 'Disengaged Members'
        }
      />
      <div className="flex flex-col container space-y-8 justify-between px-4 md:px-12 py-4">
        <CustomTab
          activeTab={activeTab}
          onTabChange={handleTabChange}
          labels={['Active members', 'Disengaged members']}
          content={[
            <div className="flex flex-col space-y-8">
              <ActiveMembersComposition
                activePeriod={activeMemberDate}
                handleDateRange={handleActiveMembersDateRange}
              />
              <InteractionsSection />
            </div>,
            <div className="flex flex-col space-y-8">
              <DisengagedMembersComposition
                activePeriod={disengagedMemberDate}
                handleDateRange={handleDisengagedMemberDateRange}
              />
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
