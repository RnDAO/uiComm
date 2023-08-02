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
  const {
    getOnboardingMemberCompositionTable,
    isOnboardingMembersBreakdownLoading,
  } = useAppStore();

  const tableTopRef = useRef<HTMLDivElement>(null);

  const [isExpanded, toggleExpanded] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [roles, setRoles] = useState<string[]>([]);
  const [onboardingComposition, setOnboardingComposition] = useState<string[]>(
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

    const fetchData = async () => {
      const res = await getOnboardingMemberCompositionTable(
        guild.guildId,
        onboardingComposition,
        roles,
        username,
        sortBy,
        page
      );

      setFetchedData(res);
    };

    fetchData();
  }, [page, roles, onboardingComposition, username, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [onboardingComposition, roles, username, sortBy]);

  const handleRoleSelectionChange = (selectedRoles: string[]) => {
    setRoles(selectedRoles);
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

  return (
    <>
      <div className="relative overflow-x-scroll md:overflow-hidden mb-1 md:mb-1">
        <h3
          className="text-xl font-medium text-lite-black md:mb-4"
          ref={tableTopRef}
        >
          Members breakdown
        </h3>
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
            isLoading={isOnboardingMembersBreakdownLoading}
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
