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

interface TcHivemindMediaWikiProps {
  isLoading: boolean;
  defaultMediaWikiHivemindConfig: {
    pageIds?: string[];
  };
  handlePatchHivemindMediaWiki: ({ pageIds }: { pageIds: string[] }) => void;
}

function TcHivemindMediaWiki({
  isLoading,
  defaultMediaWikiHivemindConfig,
  handlePatchHivemindMediaWiki,
}: TcHivemindMediaWikiProps) {
  const [pageIds, setPageIds] = useState<string[]>(
    defaultMediaWikiHivemindConfig?.pageIds || []
  );

  const handleNotionHivemind = () => {
    const payload = {
      pageIds: pageIds,
    };

    handlePatchHivemindMediaWiki({ ...payload });
  };

  return (
    <>
      <div className='flex flex-col items-center justify-between space-y-3'>
        <FormControl fullWidth>
          <FormLabel>MediaWiki Page Id</FormLabel>
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

export default TcHivemindMediaWiki;
