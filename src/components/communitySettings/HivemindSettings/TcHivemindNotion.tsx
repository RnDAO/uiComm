import {
  Autocomplete,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material';
import router from 'next/router';
import React, { useState } from 'react';

import TcButton from '../../shared/TcButton';

interface TcHivemindNotionProps {
  isLoading: boolean;
  defaultNotionHivemindConfig: {
    pageIds?: string[];
    databaseIds?: string[];
  };
  handlePatchHivemindNotion: ({
    pageIds,
    databaseIds,
  }: {
    pageIds: string[];
    databaseIds: string[];
  }) => void;
}

function TcHivemindNotion({
  isLoading,
  defaultNotionHivemindConfig,
  handlePatchHivemindNotion,
}: TcHivemindNotionProps) {
  const [pageIds, setPageIds] = useState<string[]>(
    defaultNotionHivemindConfig?.pageIds || []
  );
  const [databaseIds, setDatabaseIds] = useState<string[]>(
    defaultNotionHivemindConfig?.databaseIds || []
  );

  const handleNotionHivemind = () => {
    const payload = {
      pageIds: pageIds,
      databaseIds: databaseIds,
    };

    handlePatchHivemindNotion({ ...payload });
  };

  return (
    <>
      <div className='flex flex-col items-center justify-between space-y-3'>
        <FormControl fullWidth>
          <FormLabel>Notion Page Id</FormLabel>
          <Autocomplete
            multiple
            freeSolo
            value={pageIds}
            onChange={(event, newValue: string[] | null) => {
              setPageIds(newValue || []);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label='Page Ids'
                placeholder='Type Page ids and enter'
              />
            )}
            options={[]}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Notion Database Id</FormLabel>
          <Autocomplete
            multiple
            freeSolo
            value={databaseIds}
            onChange={(event, newValue: string[] | null) => {
              setDatabaseIds(newValue || []);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label='Database Ids'
                placeholder='Type Database ids and enter'
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
          onClick={() => handleNotionHivemind()}
        />
      </div>
    </>
  );
}

export default TcHivemindNotion;
