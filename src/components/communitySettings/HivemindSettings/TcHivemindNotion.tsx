import React, { useState } from 'react';
import {
  Alert,
  Autocomplete,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import router from 'next/router';

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
        <Alert className='flex w-full justify-start rounded-md' severity='info'>
          <Typography variant='body2' className='text-left'>
            See documentation for how to{' '}
            <Link
              className='font-bold'
              color='inherit'
              href='https://togethercrew.gitbook.io/onboarding/fundamentals/setting-up-hivemind'
              target='_blank'
            >
              integrate Notion to Hivemind
            </Link>
          </Typography>
        </Alert>
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
            Press Enter after typing the Database id to add it
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

export default TcHivemindNotion;
