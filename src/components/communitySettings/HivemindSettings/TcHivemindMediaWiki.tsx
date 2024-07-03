import {
  Autocomplete,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
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
            renderTags={(value, getTagProps) => {
              return value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  variant='outlined'
                  size='small'
                  sx={{
                    borderRadius: '4px',
                    borderColor: '#D1D1D1',
                    backgroundColor: 'white',
                    color: 'black',
                  }}
                />
              ));
            }}
          />
          <FormHelperText>
            Press Enter after typing the Page id to add it
          </FormHelperText>
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
