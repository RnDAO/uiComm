import React from 'react';
import centricLayout from '../../layouts/centricLayout';
import TcText from '../../components/shared/TcText';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcInput from '../../components/shared/TcInput';
import TcCheckbox from '../../components/shared/TcCheckbox';
import { FormControlLabel } from '@mui/material';
import TcLink from '../../components/shared/TcLink';
import TcButton from '../../components/shared/TcButton';
import router from 'next/router';

function CreateNewCommunity() {
  return (
    <TcBoxContainer
      bgcolor="white"
      className="rounded p-4 md:p-16 min-h-[37.5rem]"
      contentContainerChildren={
        <div className="space-y-8 pt-10">
          <TcText text="Create a new community account" variant={'h4'} />
          <div className="space-y-2">
            <TcText
              className="text-left md:text-center"
              text="What is the name of the community or organization?"
              fontWeight="bold"
              sx={{ typography: { xs: 'body2', md: 'body1' } }}
            />
            <TcInput
              label="Community name"
              variant="filled"
              placeholder="Write community name Placeholder"
            />
          </div>
          <FormControlLabel
            label={
              <TcText
                className="text-left md:text-center"
                text={
                  <>
                    {'I understand and agree to the '}
                    <TcLink
                      to={'https://www.togethercrew.com/privacy-and-terms'}
                      color="primary"
                      fontWeight="bold"
                    >
                      Privacy Policy
                    </TcLink>
                    {' and '}
                    <TcLink
                      to={'https://www.togethercrew.com/privacy-and-terms'}
                      color="primary"
                      fontWeight="bold"
                    >
                      Terms of Service.
                    </TcLink>
                  </>
                }
                variant={'subtitle2'}
              />
            }
            control={<TcCheckbox color="secondary" />}
          />
          <div>
            <TcButton
              text="Create community"
              variant="contained"
              color="secondary"
              onClick={() => router.push('/')}
            />
          </div>
        </div>
      }
    />
  );
}

CreateNewCommunity.pageLayout = centricLayout;

export default CreateNewCommunity;
