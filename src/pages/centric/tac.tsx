import React from 'react';
import centricLayout from '../../layouts/centricLayout';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcText from '../../components/shared/TcText';
import TcCheckbox from '../../components/shared/TcCheckbox';
import { FormControlLabel } from '@mui/material';
import TcLink from '../../components/shared/TcLink';
import TcButton from '../../components/shared/TcButton';
import router from 'next/router';

function Tac() {
  return (
    <div>
      <TcBoxContainer
        bgcolor="white"
        className="rounded py-12 px-4 md:p-12 md:min-h-[37.5rem]"
        contentContainerChildren={
          <div className="space-y-6 py-12">
            <TcText
              sx={{ typography: { xs: 'h5', md: 'h3' } }}
              color="initial"
              text="One more thing..."
            />
            <TcText
              variant="body1"
              className="text-left md:text-center"
              color="initial"
              text={
                <>
                  Please take a moment to familiarize yourself with <br /> our
                  terms and conditions.
                </>
              }
            />
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
                        Privacy Policy and Terms of Service.
                      </TcLink>
                    </>
                  }
                  variant={'subtitle2'}
                />
              }
              control={<TcCheckbox color="secondary" />}
            />
            <div className="block py-5">
              <TcButton
                text={'Continue'}
                variant="contained"
                onClick={() => router.push('/centric/select-community')}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

Tac.pageLayout = centricLayout;

export default Tac;
