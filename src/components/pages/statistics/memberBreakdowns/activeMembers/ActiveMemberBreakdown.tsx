import { useState, useEffect, useRef } from 'react';
import { StorageService } from '../../../../../services/StorageService';
import useAppStore from '../../../../../store/useStore';
import { IUser } from '../../../../../utils/types';
import CustomTable from '../CustomTable';
import {
  Column,
  IActivityCompositionOptions,
} from '../../../../../utils/interfaces';
import CustomPagination from '../CustomPagination';
import CustomButton from '../../../../global/CustomButton';
import clsx from 'clsx';
import { FaFileCsv } from 'react-icons/fa';
import { Button } from '@mui/material';
import {
  convertToCSV,
  downloadCSVFile,
} from '../../../../../helpers/csvHelper';

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
  { name: 'Vital member', value: 'all_vital', color: '#313671' },
  { name: 'Became disengaged', value: 'all_new_disengaged', color: '#EB3E56' },
  { name: 'Others', value: 'others', color: '#AAAAAA' },
];

export default function ActiveMemberBreakdown() {
  const { getActiveMemberCompositionTable, isActiveMembersBreakdownLoading } =
    useAppStore();

  const tableTopRef = useRef<HTMLDivElement>(null);

  const [isExpanded, toggleExpanded] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [activityComposition, setActivityComposition] = useState<string[]>(
    options.map((option) => option.value)
  );
  const [username, setUsername] = useState('');
  const [sortBy, setSortBy] = useState('desc');
  const [fetchedData, setFetchedData] = useState<{
    limit?: string | number;
    page?: string | number;
    results: any[];
    totalPages: number;
    totalResults: number;
  }>({
    results: [],
    totalResults: 0,
    totalPages: 0,
  });
  const user = StorageService.readLocalStorage<IUser>('user');
  const guild = user?.guild;

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
    if (tableTopRef.current && isExpanded) {
      tableTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!guild) {
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      const res = await getActiveMemberCompositionTable(
        guild.guildId,
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

  const handleRoleSelectionChange = (selectedRoles: string[]) => {
    setRoles(selectedRoles);
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
    if (!guild) {
      return;
    }

    try {
      const limit = fetchedData.totalResults;

      const { results } = await getActiveMemberCompositionTable(
        guild.guildId,
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
      <div className="relative overflow-x-scroll md:overflow-hidden mb-1 md:mb-1">
        <div className="flex justify-between items-start">
          <h3
            className="text-xl font-medium text-lite-black md:mb-4"
            ref={tableTopRef}
          >
            Members breakdown
          </h3>
          <Button
            startIcon={<FaFileCsv />}
            size="small"
            variant="contained"
            className="bg-secondary text-white"
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
          <CustomButton
            label={isExpanded ? 'Show less' : 'Show member breakdown'}
            classes={'text-black'}
            variant="outlined"
            disabled={fetchedData?.totalResults === 0}
            onClick={handleButtonClick}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
}
