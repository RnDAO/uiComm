import { AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
import TcAlert from '../../shared/TcAlert';
import TcButton from '../../shared/TcButton';
import TcDialog from '../../shared/TcDialog';
import TcText from '../../shared/TcText';
import { IDiscordModifiedCommunity } from '../../../utils/interfaces';
import TcInput from '../../shared/TcInput';
import useAppStore from '../../../store/useStore';
import SimpleBackdrop from '../../global/LoadingBackdrop';
import Router from 'next/router';
import { StorageService } from '../../../services/StorageService';
import { useToken } from '../../../context/TokenContext';

interface CommunityComponentProps {
  community: IDiscordModifiedCommunity | null;
  handleUpdatePlatforms: () => void;
}

function TcConfirmDeleteCommunity({
  community,
  handleUpdatePlatforms,
}: CommunityComponentProps) {
  const { deleteCommunityById } = useAppStore();
  const { deleteCommunity } = useToken();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [communityNameInput, setCommunityNameInput] = useState<string>('');
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCommunityNameInput(inputValue);
    setIsInputValid(inputValue === community?.name);
  };

  const handleDeleteCommunity = () => {
    if (isInputValid) {
      setLoading(true);
      deleteCommunityById(community?.id).then(() => {
        StorageService.removeLocalStorage('community');
      });
      deleteCommunity();
      setLoading(false);
      setActiveStep(1);
      setOpenDialog(false);
      setCommunityNameInput('');
      handleUpdatePlatforms();
      Router.push('/centric/select-community');
    }
  };

  if (loading) {
    return <SimpleBackdrop />;
  }

  return (
    <div>
      <TcButton
        text='Delete Community'
        sx={{ width: '10rem' }}
        className='text-error-600'
        disabled={!community}
        onClick={() => {
          setOpenDialog(true);
        }}
      />
      <TcDialog
        open={openDialog}
        fullScreen={false}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '640px',
              borderRadius: '10px',
            },
          },
        }}
      >
        <div className='flex justify-end p-4'>
          <AiOutlineClose
            className='cursor-pointer'
            size={24}
            onClick={() => setOpenDialog(false)}
          />
        </div>
        {activeStep === 1 ? (
          <div className='mx-auto flex flex-col justify-center space-y-4 px-8 pb-8 text-center'>
            <div className='px-14'>
              <div className='flex justify-center'>
                <BiError size={40} className='text-error-600' />
              </div>
              <TcText
                variant='h6'
                text={`Are you sure you want to delete ${community?.name} community?`}
              />
            </div>
            <TcAlert
              severity='error'
              icon={false}
              className='flex justify-center rounded-sm bg-error-600/40 p-0 text-center'
            >
              <AlertTitle color='black' className='p-0'>
                If you don't read this, unexpected bad things will happen!{' '}
              </AlertTitle>
            </TcAlert>
            <TcText
              className='text-center'
              variant='body2'
              text={
                <>
                  Once the community account is deleted, there is{' '}
                  <strong>no way back</strong>. If you delete your community
                  account, all data from the platforms you had connected will be{' '}
                  <strong>deleted</strong> from our databases.
                </>
              }
            />
            <div className='flex justify-between'>
              <TcButton
                text={'Cancel'}
                variant='outlined'
                onClick={() => setOpenDialog(false)}
              />
              <TcButton
                text='Continue'
                variant='contained'
                color='secondary'
                onClick={() => setActiveStep(2)}
              />
            </div>
          </div>
        ) : (
          <div className='mx-auto flex flex-col justify-center space-y-8 px-8 pb-8 text-center'>
            <TcText
              variant='h6'
              text={
                <>
                  To confirm that you want to delete the community, please type{' '}
                  <b>{community?.name}</b> in the field below:
                </>
              }
            />
            <div className='mx-auto w-2/3 pb-12 text-center'>
              <TcInput
                label='Community name'
                variant='filled'
                placeholder='Write community name'
                value={communityNameInput}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex justify-between'>
              <TcButton
                text={'Cancel'}
                variant='outlined'
                onClick={() => setOpenDialog(false)}
              />
              <TcButton
                text='Delete community'
                variant='contained'
                color='secondary'
                onClick={handleDeleteCommunity}
                disabled={!isInputValid}
              />
            </div>
          </div>
        )}
      </TcDialog>
    </div>
  );
}

export default TcConfirmDeleteCommunity;
