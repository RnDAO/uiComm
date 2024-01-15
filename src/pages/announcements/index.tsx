import React, { useEffect, useState } from 'react';
import { defaultLayout } from '../../layouts/defaultLayout';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import SEO from '../../components/global/SEO';
import TcText from '../../components/shared/TcText';
import TcButton from '../../components/shared/TcButton';
import { BsPlus } from 'react-icons/bs';
import TcTableContainer from '../../components/shared/TcTableContainer';
import router from 'next/router';
import TcPagination from '../../components/shared/TcPagination';
import TcTimeZone from '../../components/announcements/TcTimeZone';
import TcDateTimePopover from '../../components/announcements/create/scheduleAnnouncement/TcDateTimePopover';
import moment from 'moment';
import { MdCalendarMonth } from 'react-icons/md';
import useAppStore from '../../store/useStore';
import { StorageService } from '../../services/StorageService';
import { FetchedData, IDiscordModifiedCommunity } from '../../utils/interfaces';

const headers = ['Announcement', 'Channel', 'Handle', 'Role', 'Date'];

function Index() {
  const { retrieveAnnouncements } = useAppStore();

  const communityId =
    StorageService.readLocalStorage<IDiscordModifiedCommunity>('community')?.id;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [dateTimeDisplay, setDateTimeDisplay] = useState<string>(
    moment().format('D MMMM YYYY @ h A')
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedAnnouncements, setFetchedAnnouncements] = useState<FetchedData>(
    {
      limit: 10,
      page: 1,
      results: [],
      totalPages: 0,
      totalResults: 0,
    }
  );

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-time-popover' : undefined;

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setActiveTab(1);
    }
  };

  const handleTimeChange = (time: Date | null) => {
    if (time) {
      setSelectedTime(time);
      handleClose();

      if (selectedDate) {
        const fullDateTime = moment(selectedDate).set({
          hour: time.getHours(),
          minute: time.getMinutes(),
        });
        setDateTimeDisplay(fullDateTime.format('D MMMM YYYY @ h A'));
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await retrieveAnnouncements({
          page: 1,
          limit: 10,
          community: communityId,
        });

        setFetchedAnnouncements(data);
        setLoading(false);
      } catch (error) {
        console.error('An error occurred while fetching platforms:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatAnnouncementsForTable = () => {
    console.log(fetchedAnnouncements.results);

    return fetchedAnnouncements.results.map(
      (announcement) => console.log(announcement.data.options)

      //   {
      //   Announcement: announcement.title,
      //   Date: moment(announcement.scheduledAt).format('YYYY-MM-DD'),
      // }
    );
  };

  return (
    <>
      <SEO titleTemplate="Announcements" />
      <div className="flex flex-col container px-4 md:px-12 py-4">
        <TcBoxContainer
          contentContainerChildren={
            <div className="flex flex-col justify-between p-4 md:p-10 space-y-4 min-h-[92dvh]">
              <div>
                <div className="flex flex-col md:flex-row md:justify-between space-y-3 md:space-y-0 md:items-center">
                  <TcText text="Announcement Scheduling" variant="h5" />
                  <TcButton
                    text="Create Announcement"
                    startIcon={<BsPlus />}
                    variant="outlined"
                    onClick={() =>
                      router.push('/announcements/create-new-announcements')
                    }
                  />
                </div>
                <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 items-center mt-8 mb-4">
                  <TcButton
                    text={dateTimeDisplay}
                    variant="contained"
                    startIcon={<MdCalendarMonth />}
                    disableElevation={true}
                    className="border border-black bg-gray-100 shadow-md"
                    sx={{ color: 'black', height: '2.4rem' }}
                    aria-describedby={id}
                    onClick={handleOpen}
                  />
                  <TcDateTimePopover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    selectedDate={selectedDate}
                    handleDateChange={handleDateChange}
                    selectedTime={selectedTime}
                    handleTimeChange={handleTimeChange}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  <TcTimeZone />
                </div>
                {fetchedAnnouncements.results.length > 0 ? (
                  <TcTableContainer
                    headers={headers}
                    bodyRowItems={formatAnnouncementsForTable()}
                  />
                ) : (
                  <div className="text-center mx-auto flex flex-col justify-center h-[65dvh] w-9/12 md:w-4/12">
                    <TcText
                      text="No announcements yet"
                      variant="h6"
                      fontWeight="bold"
                    />
                    <TcText
                      text="Your announcements will show up for the month and timezone selected once you create them"
                      variant="body2"
                      className="text-gray-400"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <TcPagination
                  totalItems={3}
                  itemsPerPage={1}
                  currentPage={1}
                  onChangePage={function (page: number): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}

Index.pageLayout = defaultLayout;

export default Index;
