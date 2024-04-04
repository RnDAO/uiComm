import moment from 'moment';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { MdCalendarMonth } from 'react-icons/md';

import TcAnnouncementsAlert from '../../components/announcements/TcAnnouncementsAlert';
import TcAnnouncementsTable from '../../components/announcements/TcAnnouncementsTable';
import TcTimeZone from '../../components/announcements/TcTimeZone';
import SimpleBackdrop from '../../components/global/LoadingBackdrop';
import SEO from '../../components/global/SEO';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcButton from '../../components/shared/TcButton';
import TcDatePickerPopover from '../../components/shared/TcDatePickerPopover';
import TcPagination from '../../components/shared/TcPagination';
import TcText from '../../components/shared/TcText';
import { useToken } from '../../context/TokenContext';
import { defaultLayout } from '../../layouts/defaultLayout';
import { StorageService } from '../../services/StorageService';
import useAppStore from '../../store/useStore';
import {
  FetchedData,
  IDiscordModifiedCommunity,
  IPlatformProps,
} from '../../utils/interfaces';
import { withRoles } from '../withRoles';

function Index() {
  const { retrieveAnnouncements, retrievePlatformById } = useAppStore();

  const { community } = useToken();

  const [loading, setLoading] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const communityId =
    StorageService.readLocalStorage<IDiscordModifiedCommunity>('community')?.id;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedZone, setSelectedZone] = useState(moment.tz.guess());
  const [dateTimeDisplay, setDateTimeDisplay] = useState<string>('Filter Date');

  const [page, setPage] = useState(1);

  const platformId = community?.platforms.find(
    (platform) => platform.disconnectedAt === null
  )?.id;

  const [announcementsPermissions, setAnnouncementsPermissions] =
    useState<boolean>(true);

  const fetchPlatform = async () => {
    if (platformId) {
      try {
        setLoading(true);
        const data: IPlatformProps = await retrievePlatformById(platformId);
        const { metadata } = data;

        if (metadata) {
          const announcements = metadata.permissions.Announcement;
          const allPermissionsTrue = Object.values(announcements).every(
            (value) => value === true
          );

          setAnnouncementsPermissions(allPermissionsTrue);
        }
        setLoading(false);
      } catch (error) {
      } finally {
        setLoading(false);
        if (isFirstLoad) setIsFirstLoad(false);
      }
    }
  };

  useEffect(() => {
    fetchPlatform();
  }, [platformId]);

  const [fetchedAnnouncements, setFetchedAnnouncements] = useState<FetchedData>(
    {
      limit: 8,
      page: page,
      results: [],
      totalPages: 0,
      totalResults: 0,
    }
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-time-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setPage(1);
      const fullDateTime = moment(date);
      setDateTimeDisplay(fullDateTime.format('D MMMM YYYY'));

      setAnchorEl(null);
    }
  };

  const resetDateFilter = () => {
    setSelectedDate(null);
    setDateTimeDisplay('Filter Date');

    setAnchorEl(null);
  };

  const fetchData = async (date?: Date | null, zone?: string) => {
    try {
      setLoading(true);

      let startDate, endDate;
      if (date) {
        startDate = moment(date)
          .tz(zone || selectedZone)
          .startOf('day')
          .utcOffset(0, true)
          .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        endDate = moment(date)
          .tz(zone || selectedZone)
          .endOf('day')
          .utcOffset(0, true)
          .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      }
      const data = await retrieveAnnouncements({
        page: page,
        limit: 8,
        timeZone: zone || selectedZone,
        ...(startDate ? { startDate: startDate } : {}),
        ...(endDate ? { endDate: endDate } : {}),
        community: communityId,
      });

      setFetchedAnnouncements(data);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedDate, selectedZone);
  }, [selectedZone, selectedDate, page]);

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  if (isFirstLoad && loading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <SEO titleTemplate='Announcements' />
      {!announcementsPermissions && <TcAnnouncementsAlert />}
      <div className='container flex flex-col px-4 py-4 md:px-12'>
        <TcBoxContainer
          contentContainerChildren={
            <div className='flex max-h-[97dvh] min-h-[97dvh] flex-col justify-between space-y-4 p-4 md:p-10'>
              <div className='min-h-[calc(100vh-100px)] flex-grow overflow-auto'>
                <div className='flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0'>
                  <TcText text='Announcement Scheduling' variant='h5' />
                  <TcButton
                    text='Create Announcement'
                    startIcon={<BsPlus />}
                    variant='outlined'
                    onClick={() =>
                      router.push('/announcements/create-new-announcements')
                    }
                  />
                </div>
                <div className='mt-8 mb-4 flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0'>
                  <TcButton
                    variant='outlined'
                    startIcon={<MdCalendarMonth />}
                    onClick={handleClick}
                    text={dateTimeDisplay}
                    aria-describedby={id}
                  />
                  <TcDatePickerPopover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    onResetDate={resetDateFilter}
                  />
                  <TcTimeZone handleZone={setSelectedZone} />
                </div>
                {fetchedAnnouncements.results.length > 0 ? (
                  <div className='overflow-x-scroll md:overflow-hidden'>
                    <TcAnnouncementsTable
                      announcements={
                        fetchedAnnouncements.results
                          ? fetchedAnnouncements.results
                          : []
                      }
                      handleRefreshList={fetchData}
                      isLoading={loading}
                      selectedZone={selectedZone}
                    />
                  </div>
                ) : (
                  <div className='mx-auto flex h-[65dvh] w-9/12 flex-col justify-center text-center md:w-4/12'>
                    <TcText
                      text='No announcements yet'
                      variant='h6'
                      fontWeight='bold'
                    />
                    <TcText
                      text='Your announcements will show up for the month and timezone selected once you create them'
                      variant='body2'
                      className='text-gray-400'
                    />
                  </div>
                )}
              </div>
              <div className='sticky bottom-0 min-h-[70px] bg-white px-4 py-2'>
                {fetchedAnnouncements.totalResults > 8 && (
                  <div className='flex justify-end'>
                    <TcPagination
                      totalItems={fetchedAnnouncements.totalResults}
                      itemsPerPage={Math.ceil(
                        fetchedAnnouncements.totalResults /
                        fetchedAnnouncements.totalPages
                      )}
                      currentPage={page}
                      onChangePage={handlePageChange}
                    />
                  </div>
                )}
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

Index.pageLayout = defaultLayout;

export default withRoles(Index, ['admin']);
