import {
  Autocomplete,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material';
import router from 'next/router';
import { useState } from 'react';

import TcButton from '../../shared/TcButton';

interface TcHivemindGithubProps {
  isLoading: boolean;
  defaultGithubHivemindConfig: {
    repoIds?: string[];
  };
  handlePatchHivemindGithub: ({ repoIds }: { repoIds: string[] }) => void;
}

function TcHivemindGithub({
  isLoading,
  defaultGithubHivemindConfig,
  handlePatchHivemindGithub,
}: TcHivemindGithubProps) {
  const [repoIds, setRepoIds] = useState<string[]>(
    defaultGithubHivemindConfig.repoIds || []
  );

  const handleGithubHivemind = () => {
    const payload = {
      repoIds: repoIds,
    };

    handlePatchHivemindGithub({ ...payload });
  };

  return (
    <>
      <div className='flex flex-col items-center justify-between space-y-3'>
        <FormControl fullWidth>
          <FormLabel>Github Repository Id</FormLabel>
          <Autocomplete
            multiple
            freeSolo
            value={repoIds}
            onChange={(event, newValue: string[] | null) => {
              setRepoIds(newValue || []);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label='Repository Ids'
                placeholder='Type Repository ids and enter'
              />
            )}
            options={[]}
          />
        </FormControl>
      </div>
      <div className='mt-6 flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0'>
        <TcButton
          text='Cancel'
          variant='outlined'
          className='md:w-1/4'
          onClick={() => router.push('/community-settings')}
        />
        <TcButton
          text={
            isLoading ? (
              <CircularProgress size={20} color='inherit' />
            ) : (
              'Save Changes'
            )
          }
          variant='contained'
          className='md:w-1/4'
          onClick={() => handleGithubHivemind()}
        />
      </div>
    </>
  );
}

export default TcHivemindGithub;
