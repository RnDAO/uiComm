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
import { Box } from '@mui/material';
import Link from '../components/global/Link';
import { AiOutlineLeft } from 'react-icons/ai';
import Onboarding from '../components/pages/statistics/Onboarding';
import { transformToMidnightUTC } from '../helpers/momentHelper';

const Statistics = () => {
  const user = StorageService.readLocalStorage<IUser>('user');

  const [loading, setLoading] = useState<boolean>(true);
  const [activeMemberDate, setActiveMemberDate] = useState(1);
  const [onBoardingMemberDate, setOnBoardingMemberDate] = useState(1);
  const [activeInteractionDate, setActiveInteractionDate] = useState(1);
  const [disengagedMemberDate, setDisengagedMemberDate] = useState(1);
  const [inactiveMembersDate, setInactiveMembersDate] = useState(1);
  const {
    fetchInteractions,
    fetchActiveMembers,
    fetchDisengagedMembers,
    fetchInactiveMembers,
    fetchOnboardingMembers,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ): void => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          return;
        }

        const { guild } = user;

        setLoading(true);

        if (activeTab === '1') {
          const activeDateRange = getDateRange(activeMemberDate);
          const onBoardingMemberDateRange = getDateRange(onBoardingMemberDate);
          const activeIntegrationDateRange = getDateRange(
            activeInteractionDate
          );

          await fetchActiveMembers(
            guild.guildId,
            activeDateRange[0],
            activeDateRange[1]
          );
          await fetchInteractions(
            guild.guildId,
            activeIntegrationDateRange[0],
            activeIntegrationDateRange[1]
          );
          await fetchOnboardingMembers(
            guild.guildId,
            onBoardingMemberDateRange[0],
            onBoardingMemberDateRange[1]
          );
        } else {
          const disengagedDateRange = getDateRange(disengagedMemberDate);
          const inactiveMemberDateRange = getDateRange(inactiveMembersDate);

          await fetchDisengagedMembers(
            guild.guildId,
            disengagedDateRange[0],
            disengagedDateRange[1]
          );
          await fetchInactiveMembers(
            guild.guildId,
            inactiveMemberDateRange[0],
            inactiveMemberDateRange[1]
          );
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const { guild } = user;
    const activeDateRange = getDateRange(activeMemberDate);
    fetchActiveMembers(guild.guildId, activeDateRange[0], activeDateRange[1]);
  }, [activeMemberDate]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const { guild } = user;
    const onBoardingMemberDateRange = getDateRange(onBoardingMemberDate);

    fetchOnboardingMembers(
      guild.guildId,
      onBoardingMemberDateRange[0],
      onBoardingMemberDateRange[1]
    );
  }, [onBoardingMemberDate]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const { guild } = user;
    const activeIntegrationDateRange = getDateRange(activeInteractionDate);

    fetchInteractions(
      guild.guildId,
      activeIntegrationDateRange[0],
      activeIntegrationDateRange[1]
    );
  }, [activeInteractionDate]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const { guild } = user;

    const disengagedDateRange = getDateRange(disengagedMemberDate);

    fetchDisengagedMembers(
      guild.guildId,
      disengagedDateRange[0],
      disengagedDateRange[1]
    );
  }, [disengagedMemberDate]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const { guild } = user;

    const inactiveMemberDateRange = getDateRange(inactiveMembersDate);

    fetchInactiveMembers(
      guild.guildId,
      inactiveMemberDateRange[0],
      inactiveMemberDateRange[1]
    );
  }, [inactiveMembersDate]);

  const getDateRange = (dateRangeType: number): string[] => {
    let endDate: moment.Moment = moment().subtract(1, 'day');
    let startDate: moment.Moment = moment(endDate).subtract(7, 'days');

    switch (dateRangeType) {
      case 1:
        startDate = moment(endDate).subtract(7, 'days');
        endDate = moment().subtract(1, 'day');
        break;
      case 2:
        startDate = moment(endDate).subtract(1, 'months');
        endDate = moment().subtract(1, 'day');
        break;
      case 3:
        startDate = moment(endDate).subtract(3, 'months');
        endDate = moment().subtract(1, 'day');
        break;
      case 4:
        startDate = moment(endDate).subtract(6, 'months');
        endDate = moment().subtract(1, 'day');
        break;
      case 5:
        startDate = moment(endDate).subtract(1, 'year');
        endDate = moment().subtract(1, 'day');
        break;
      default:
        break;
    }

    return [
      transformToMidnightUTC(startDate).toString(),
      transformToMidnightUTC(endDate).toString(),
    ];
  };

  const handleActiveMembersDateRange = (dateRangeType: number) => {
    setActiveMemberDate(dateRangeType);
  };

  const handleOnboardingMembersDate = (dateRangeType: number) => {
    setOnBoardingMemberDate(dateRangeType);
  };

  const handleActiveInteractionDate = (dateRangeType: number) => {
    setActiveInteractionDate(dateRangeType);
  };

  const handleDisengagedMemberDateRange = (dateRangeType: number) => {
    setDisengagedMemberDate(dateRangeType);
  };

  const handleInactiveMemberDateRange = (dateRangeType: number) => {
    setInactiveMembersDate(dateRangeType);
  };

  if (loading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <SEO
        titleTemplate={
          activeTab === '1' ? 'Active Members' : 'Disengaged Members'
        }
      />
      <div className="flex flex-col container justify-between px-4 md:px-12 py-3">
        <Link to="/" className="mb-3">
          <div className="flex items-center text-gray-subtitle text-base hover:text-black">
            <AiOutlineLeft />
            <span className="pl-1">Community Insights</span>
          </div>
        </Link>{' '}
        <CustomTab
          activeTab={activeTab}
          onTabChange={handleTabChange}
          labels={['Active members', 'Disengaged members']}
          content={[
            <div className="flex flex-col space-y-4">
              <Box
                sx={{
                  typography: 'body5',
                  borderRadius: '0px 14px 14px 14px;',
                }}
                className="shadow-lg rounded-md p-6"
              >
                <ActiveMembersComposition
                  activePeriod={activeMemberDate}
                  handleDateRange={handleActiveMembersDateRange}
                />
              </Box>
              <Box
                sx={{
                  typography: 'body5',
                  borderRadius: '0px 14px 14px 14px;',
                }}
                className="shadow-lg rounded-md p-6"
              >
                <Onboarding
                  activePeriod={onBoardingMemberDate}
                  handleDateRange={handleOnboardingMembersDate}
                />
              </Box>
              <Box
                sx={{
                  typography: 'body5',
                  borderRadius: '0px 14px 14px 14px;',
                }}
                className="shadow-lg rounded-md p-6"
              >
                <InteractionsSection
                  activePeriod={activeInteractionDate}
                  handleDateRange={handleActiveInteractionDate}
                />
              </Box>
            </div>,
            <div className="flex flex-col space-y-4">
              <Box
                sx={{
                  typography: 'body5',
                  borderRadius: '0px 14px 14px 14px;',
                }}
                className="shadow-lg rounded-md p-6"
              >
                <DisengagedMembersComposition
                  activePeriod={disengagedMemberDate}
                  handleDateRange={handleDisengagedMemberDateRange}
                />
              </Box>
              <Box
                sx={{
                  typography: 'body5',
                  borderRadius: '0px 14px 14px 14px;',
                }}
                className="shadow-lg p-6 mb-4"
              >
                <InactiveMembers
                  activePeriod={inactiveMembersDate}
                  handleDateRange={handleInactiveMemberDateRange}
                />
              </Box>
            </div>,
          ]}
        />
      </div>
    </>
  );
};

Statistics.pageLayout = defaultLayout;

export default Statistics;
