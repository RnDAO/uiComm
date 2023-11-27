import React, { useState } from 'react';
import TcButton from '../../shared/TcButton';
import { AiOutlineClose } from 'react-icons/ai';
import TcDialog from '../../shared/TcDialog';
import TcText from '../../shared/TcText';
import { IPlatformProps } from '../../../utils/interfaces';
import useAppStore from '../../../store/useStore';
import { useRouter } from 'next/router';

interface TcDisconnectPlatformProps {
  platform: IPlatformProps | null;
}

function TcDisconnectPlatform({ platform }: TcDisconnectPlatformProps) {
  const { deletePlatform } = useAppStore();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  const handleDeletePlatform = async (deleteType: 'hard' | 'soft') => {
    await deletePlatform({ id, deleteType });
    setOpenDialog(false);
    router.push('/community-settings');
  };

  return (
    <>
      <TcButton
        text={'Disconnect'}
        variant="outlined"
        sx={{ width: '7.5rem', padding: '0.5rem' }}
        onClick={() => setOpenDialog(true)}
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
        <div className="flex justify-end p-4">
          <AiOutlineClose
            className="cursor-pointer"
            size={24}
            onClick={() => setOpenDialog(false)}
          />
        </div>
        <div className="text-center px-8">
          <div className="w-4/5 text-center mx-auto">
            <TcText
              text={`Are you sure you want to disconnect ${platform?.metadata.name}?`}
              variant="h6"
            />
          </div>
          <div className="flex justify-between space-x-5 py-12">
            <div className="shadow-xl rounded-md px-4 py-6 space-y-4">
              <TcText text={'Disconnect and delete data'} variant="body1" />
              <TcText
                className="text-left"
                text={
                  'Importing activities and members will be stopped. Historical activities will be deleted.'
                }
                variant="body2"
              />
              <TcButton
                text={'Disconnect and delete'}
                variant="contained"
                onClick={() => handleDeletePlatform('hard')}
              />
            </div>
            <div className="shadow-xl rounded-md px-4 py-6 space-y-4">
              <TcText text={'Disconnect only'} variant="body1" />
              <TcText
                className="text-left"
                text={
                  'Importing activities and members will be stopped. Historical activities will not be affected.'
                }
                variant="body2"
              />
              <TcButton
                text={'Disconnect'}
                variant="contained"
                onClick={() => handleDeletePlatform('soft')}
              />
            </div>
          </div>
        </div>
      </TcDialog>
    </>
  );
}

export default TcDisconnectPlatform;
