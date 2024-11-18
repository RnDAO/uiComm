import { useState } from 'react';
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

import TcButton from '../../shared/TcButton';

interface HivemindGoogleProps {
  isLoading: boolean;
  defaultGoogleHivemindConfig: {
    driveIds?: string[];
    folderIds?: string[];
    fileIds?: string[];
  };
  handlePatchHivemindGoogle: ({
    driveIds,
    folderIds,
    fileIds,
  }: {
    driveIds: string[];
    folderIds: string[];
    fileIds: string[];
  }) => void;
}

function TcHivemindGoogle({
  isLoading,
  defaultGoogleHivemindConfig,
  handlePatchHivemindGoogle,
}: HivemindGoogleProps) {
  const [driveIds, setDriveIds] = useState<string[]>(
    defaultGoogleHivemindConfig.driveIds || []
  );
  const [folderIds, setFolderIds] = useState<string[]>(
    defaultGoogleHivemindConfig.folderIds || []
  );
  const [fileIds, setFileIds] = useState<string[]>(
    defaultGoogleHivemindConfig.fileIds || []
  );

  const handleGoogleHivemind = () => {
    const payload = {
      driveIds: driveIds,
      folderIds: folderIds,
      fileIds: fileIds,
    };

    handlePatchHivemindGoogle({ ...payload });
  };

  return (
    <>
      <div className='flex flex-col items-center justify-between space-y-3'>
        <FormControl fullWidth>
          <FormLabel>Google Drives</FormLabel>
          <Autocomplete
            multiple
            freeSolo
            value={driveIds}
            onChange={(event, newValue: string[] | null) => {
              setDriveIds(newValue || []);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label='Drives Ids'
                placeholder='Type driver ids and enter'
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
            Press Enter after each drive id to add it
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Google Folders</FormLabel>
          <Autocomplete
            multiple
            freeSolo
            value={folderIds}
            onChange={(event, newValue: string[] | null) => {
              setFolderIds(newValue || []);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label='Folder Ids'
                placeholder='Type folder ids and enter'
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
            Press Enter after each folder id to add it
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Google Files</FormLabel>
          <Autocomplete
            multiple
            freeSolo
            value={fileIds}
            onChange={(event, newValue: string[] | null) => {
              setFileIds(newValue || []);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                label='Files Ids'
                placeholder='Type File ids and enter'
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
            Press Enter after each file id to add it
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
          onClick={() => handleGoogleHivemind()}
        />
      </div>
    </>
  );
}

export default TcHivemindGoogle;
