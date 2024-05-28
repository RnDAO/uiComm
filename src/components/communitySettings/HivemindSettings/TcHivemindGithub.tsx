import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  Switch,
} from '@mui/material';
import router from 'next/router';
import { useState } from 'react';

import TcButton from '../../shared/TcButton';

interface TcHivemindGithubProps {
  isLoading: boolean;
  defaultGithubHivemindConfig: {
    activated?: boolean;
  };
  handlePatchHivemindGithub: (isActivated: boolean) => void;
}

function TcHivemindGithub({
  isLoading,
  defaultGithubHivemindConfig,
  handlePatchHivemindGithub,
}: TcHivemindGithubProps) {
  const [isActivated, setIsActivated] = useState<boolean>(
    defaultGithubHivemindConfig.activated || false
  );

  const handleGithubHivemind = () => {
    handlePatchHivemindGithub(isActivated);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-between space-y-3'>
        <FormControl fullWidth>
          <FormControlLabel
            control={
              <Switch
                checked={isActivated}
                onChange={(e) => setIsActivated(e.target.checked)}
              />
            }
            label='I agree to give Hivemind access to my Github.'
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
