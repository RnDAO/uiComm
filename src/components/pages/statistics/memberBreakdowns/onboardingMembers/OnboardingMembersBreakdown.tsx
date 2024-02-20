import { useState, useEffect, useRef } from 'react';
import useAppStore from '../../../../../store/useStore';
import CustomTable, { IRolesPayload } from '../CustomTable';
import {
  Column,
  FetchedData,
  IActivityCompositionOptions,
} from '../../../../../utils/interfaces';
import CustomPagination from '../CustomPagination';
import clsx from 'clsx';
import { Button } from '@mui/material';
import { BsFiletypeCsv } from 'react-icons/bs';
import {
  convertToCSV,
  downloadCSVFile,
} from '../../../../../helpers/csvHelper';
import router from 'next/router';
import { useToken } from '../../../../../context/TokenContext';
import TcButton from '../../../../shared/TcButton';

const columns: Column[] = [
  { id: 'username', label: 'Name' },
  { id: 'roles', label: 'Roles' },
  { id: 'activityComposition', label: 'Activity composition' },
  { id: 'joinedAt', label: 'DAO member since' },
];

const options: IActivityCompositionOptions[] = [
  { name: 'Joined', value: 'all_joined', color: '#4368F1' },
  { name: 'Newly active', value: 'all_new_active', color: '#FF9022' },
  { name: 'Still active', value: 'all_still_active', color: '#CCB8F3' },
  { name: 'Dropped', value: 'all_dropped', color: '#FB3E56' },
  { name: 'Others', value: 'others', color: '#AAAAAA' },
];

export default function OnboardingMembersBreakdown() {
  const { getOnboardingMemberCompositionTable } = useAppStore();
  const { community } = useToken();

  const tableTopRef = useRef<HTMLDivElement>(null);

  const [isExpanded, toggleExpanded] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<IRolesPayload>();
  const [onboardingComposition, setOnboardingComposition] = useState<string[]>(
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
    (platform) => platform.disconnectedAt === null
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
      const res = await getOnboardingMemberCompositionTable(
        platformId,
        onboardingComposition,
        roles,
        username,
        sortBy,
        page
      );
      setLoading(false);
      setFetchedData(res);
    };

    fetchData();
  }, [page, roles, onboardingComposition, username, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [onboardingComposition, roles, username, sortBy]);

  useEffect(() => {
    const queries = router.query;
    if (queries.filter && typeof queries.filter === 'string') {
      const filter = JSON.parse(queries?.filter);
      if (filter) {
        // Search for the first element that matches the 'filterType'
        const matchedFilter = filter.find(
          (el: any) => el.filterType === 'onboardingMemberComposition'
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
    setOnboardingComposition(selectedOptions);
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

      const { results } = await getOnboardingMemberCompositionTable(
        platformId,
        onboardingComposition,
        roles,
        username,
        sortBy,
        page,
        limit
      );

      if (results && Array.isArray(results)) {
        const csv = convertToCSV(results);
        downloadCSVFile(csv, 'onboardingMemberComposition.csv');
      } else {
        console.error('Received data is not valid for CSV conversion.');
      }
    } catch (error) {
      console.error('Error while fetching data and downloading CSV:', error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-scroll md:overflow-hidden mb-1 md:mb-1">
        <div className="flex justify-between items-start">
          <h3
            className="text-xl font-medium text-lite-black md:mb-4"
            ref={tableTopRef}
          >
            Members breakdown
          </h3>
          <Button
            startIcon={<BsFiletypeCsv />}
            size="small"
            variant="outlined"
            sx={{ minWidth: '64px', padding: '0.4rem 1rem' }}
            className="border-black text-black"
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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 opacity-50 pointer-events-none"></div>
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
            breakdownName="onboardingMemberComposition"
          />
        </div>
      </div>
      <div className={clsx(!isExpanded ? 'hidden' : 'flex justify-end mb-8')}>
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
        <div className="flex justify-center mt-2 mb-12">
          <TcButton
            text={isExpanded ? 'Show less' : 'Show member breakdown'}
            variant="outlined"
            disabled={fetchedData?.totalResults === 0}
            onClick={handleButtonClick}
            className="py-2 min-w-[14rem]"
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
