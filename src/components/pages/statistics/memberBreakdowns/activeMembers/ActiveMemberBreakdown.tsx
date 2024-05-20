import { Button } from '@mui/material';
import clsx from 'clsx';
import router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BsFiletypeCsv } from 'react-icons/bs';

import CustomPagination from '../CustomPagination';
import CustomTable, { IRolesPayload } from '../CustomTable';
import { useToken } from '../../../../../context/TokenContext';
import {
  convertToCSV,
  downloadCSVFile,
} from '../../../../../helpers/csvHelper';
import useAppStore from '../../../../../store/useStore';
import {
  Column,
  FetchedData,
  IActivityCompositionOptions,
} from '../../../../../utils/interfaces';
import TcButton from '../../../../shared/TcButton';

const columns: Column[] = [
  { id: 'username', label: 'Name' },
  { id: 'roles', label: 'Roles' },
  { id: 'activityComposition', label: 'Activity composition' },
  { id: 'joinedAt', label: 'DAO member since' },
];

const options: IActivityCompositionOptions[] = [
  { name: 'Active members', value: 'all_active', color: '#3AAE2B' },
  { name: 'Newly active', value: 'all_new_active', color: '#FF9022' },
  { name: 'Consistently active', value: 'all_consistent', color: '#804EE1' },
  { name: 'Vital members', value: 'all_vital', color: '#313671' },
  { name: 'Became disengaged', value: 'all_new_disengaged', color: '#EB3E56' },
  { name: 'Others', value: 'others', color: '#AAAAAA' },
];

export default function ActiveMemberBreakdown() {
  const { getActiveMemberCompositionTable } = useAppStore();
  const { community } = useToken();

  const tableTopRef = useRef<HTMLDivElement>(null);

  const [isExpanded, toggleExpanded] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<IRolesPayload>();
  const [activityComposition, setActivityComposition] = useState<string[]>(
    options.map((option) => option.value)
  );
  const [username, setUsername] = useState('');
  const [sortBy, setSortBy] = useState('desc');
  const [fetchedData, setFetchedData] = useState<FetchedData>({
    limit: 10,
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0,
  });

  const platformId = community?.platforms.find(
    (platform) =>
      platform.disconnectedAt === null && platform.name === 'discord'
  )?.id;

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
    if (tableTopRef.current && isExpanded) {
      tableTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!platformId) {
      return;
    }

    setLoading(true);
    const fetchData = async () => {
      const res = await getActiveMemberCompositionTable(
        platformId,
        activityComposition,
        roles,
        username,
        sortBy,
        page
      );
      setLoading(false);
      setFetchedData(res);
    };

    fetchData();
  }, [page, roles, activityComposition, username, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [activityComposition, roles, username, sortBy]);

  useEffect(() => {
    const queries = router.query;
    if (queries.filter && typeof queries.filter === 'string') {
      const filter = JSON.parse(queries?.filter);
      if (filter) {
        // Search for the first element that matches the 'filterType'
        const matchedFilter = filter.find(
          (el: any) => el.filterType === 'activeMemberComposition'
        );

        if (matchedFilter) {
          const matchedLabel = matchedFilter.label.toLowerCase();

          // Search for the first 'option' that matches the 'label' in 'matchedFilter'
          const matchedOption = options.find(
            (option) => option.name.toLowerCase() === matchedLabel
          );

          if (matchedOption) {
            const matchedValue = matchedOption.value;
            handleActivityOptionSelectionChange([matchedValue]);
          }
        } else {
          handleActivityOptionSelectionChange(
            options.map((option) => option.value)
          );
        }
      }
    }
  }, [router.query]);

  const handleRoleSelectionChange = (rolesPayload: IRolesPayload) => {
    setRoles(rolesPayload);
  };

  const handleActivityOptionSelectionChange = (selectedOptions: string[]) => {
    setActivityComposition(selectedOptions);
  };

  const handleJoinedAtChange = (joinedAt: string) => {
    setSortBy(joinedAt);
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handleButtonClick = () => {
    if (tableTopRef.current && isExpanded) {
      tableTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    toggleExpanded(!isExpanded);
  };

  const handleDownloadCSV = async () => {
    if (!platformId) {
      return;
    }

    try {
      const limit = fetchedData.totalResults;

      const { results } = await getActiveMemberCompositionTable(
        platformId,
        activityComposition,
        roles,
        username,
        sortBy,
        page,
        limit
      );

      if (results && Array.isArray(results)) {
        const csv = convertToCSV(results);
        downloadCSVFile(csv, 'activeMemberComposition.csv');
      } else {
        console.error('Received data is not valid for CSV conversion.');
      }
    } catch (error) {
      console.error('Error while fetching data and downloading CSV:', error);
    }
  };

  return (
    <>
      <div className='relative mb-1 overflow-x-scroll md:mb-1 md:overflow-hidden'>
        <div className='flex items-start justify-between'>
          <h3
            className='text-xl font-medium text-lite-black md:mb-4'
            ref={tableTopRef}
          >
            Members breakdown
          </h3>
          <Button
            startIcon={<BsFiletypeCsv />}
            size='small'
            variant='outlined'
            sx={{ minWidth: '64px', padding: '0.4rem 1rem' }}
            className='border-black text-black'
            disableElevation
            onClick={handleDownloadCSV}
          >
            Export CSV
          </Button>
        </div>
        <div
          className={clsx(
            !isExpanded ? 'max-h-[17.8rem]' : 'max-h-max',
            'mb-4'
          )}
        >
          {!isExpanded && (
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 opacity-50'></div>
          )}

          <CustomTable
            data={fetchedData?.results ? fetchedData.results : []}
            columns={columns}
            handleRoleSelectionChange={handleRoleSelectionChange}
            handleActivityOptionSelectionChange={
              handleActivityOptionSelectionChange
            }
            handleJoinedAtChange={handleJoinedAtChange}
            handleUsernameChange={handleUsernameChange}
            isLoading={loading}
            activityCompositionOptions={options}
            breakdownName='activeMemberComposition'
          />
        </div>
      </div>
      <div className={clsx(!isExpanded ? 'hidden' : 'mb-8 flex justify-end')}>
        {fetchedData?.totalResults > 10 && (
          <CustomPagination
            totalItems={fetchedData.totalResults}
            itemsPerPage={Math.ceil(
              fetchedData.totalResults / fetchedData.totalPages
            )}
            currentPage={page}
            onChangePage={handlePageChange}
          />
        )}
      </div>
      {fetchedData && fetchedData?.totalResults > 3 ? (
        <div className='mt-2 mb-12 flex justify-center'>
          <TcButton
            text={isExpanded ? 'Show less' : 'Show member breakdown'}
            variant='outlined'
            disabled={fetchedData?.totalResults === 0}
            onClick={handleButtonClick}
            className='min-w-[14rem] py-2'
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
