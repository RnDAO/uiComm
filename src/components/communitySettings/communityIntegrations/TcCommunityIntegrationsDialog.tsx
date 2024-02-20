import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import TcCommunityIntegrationsConfirmDialog from './TcCommunityIntegrationsConfirmDialog';
import TcPeriodRange from '../platform/TcPeriodRange';
import TcPlatformChannelDialog from '../platform/TcPlatformChannelDialog';
import Loading from '../../global/Loading';
import TcButton from '../../shared/TcButton';
import TcDialog from '../../shared/TcDialog';
import TcText from '../../shared/TcText';
import { ChannelContext } from '../../../context/ChannelContext';
import updateTrueIDs from '../../../helpers/PlatformHelper';
import useAppStore from '../../../store/useStore';

function TcCommunityIntegrationsDialog() {
  const router = useRouter();
  const { platformId } = router.query;

  const { patchPlatformById } = useAppStore();
  const channelContext = useContext(ChannelContext);
  const { selectedSubChannels } = channelContext;

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const [platfromAnalyzerDate, setPlatfromAnalyzerDate] = useState<string>('');
  const [initialTrueIDs, setInitialTrueIDs] = useState<string[]>([]);
  const [currentTrueIDs, setCurrentTrueIDs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const { platformId, property } = router.query;
    if (platformId && property) {
      setOpenDialog(true);
    }
  }, [router.query]);

  useEffect(() => {
    const updatedIDs = updateTrueIDs(selectedSubChannels);
    if (initialTrueIDs.length === 0 && updatedIDs.length > 0) {
      setInitialTrueIDs(updatedIDs);
    }
    setCurrentTrueIDs(updatedIDs);
  }, [selectedSubChannels]);

  const handlePatchPlatform = async () => {
    setLoading(true);

    await patchPlatformById({
      id: platformId,
      metadata: {
        selectedChannels: currentTrueIDs,
        period: platfromAnalyzerDate,
        analyzerStartedAt: new Date().toISOString(),
      },
    });
    setOpenDialog(false);
    setLoading(false);
    setOpenConfirmDialog(true);
  };

  return (
    <div>
      <TcDialog
        open={openDialog}
        fullScreen={false}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '640px',
              borderRadius: '10px',
              minHeight: '400px',
            },
          },
        }}
      >
        {loading ? (
          <div className='flex min-h-[400px] items-center justify-center'>
            <Loading height='auto' size={30} />
          </div>
        ) : (
          <>
            {' '}
            <div className='flex justify-end p-4'>
              <AiOutlineClose
                className='cursor-pointer'
                size={24}
                onClick={() => setOpenDialog(false)}
              />
            </div>
            <div className='px-16 pb-12 text-left'>
              <div className='space-y-4 pt-2'>
                <TcText
                  text='Choose date period for data analysis'
                  variant='body1'
                  fontWeight='bold'
                />
                <TcText
                  text='You will be able to change date period and selected channels in the future.'
                  variant='body2'
                />
                <TcPeriodRange
                  handleSelectedDate={(date) => setPlatfromAnalyzerDate(date)}
                />
              </div>
              <div className='space-y-4 pt-10'>
                <TcPlatformChannelDialog />
              </div>
              <div className='flex justify-center pt-12 pb-4'>
                <TcButton
                  text='Continue'
                  variant='contained'
                  onClick={handlePatchPlatform}
                />
              </div>
            </div>
          </>
        )}
      </TcDialog>
      <TcCommunityIntegrationsConfirmDialog
        isOpen={openConfirmDialog}
        toggleDialog={() => setOpenConfirmDialog(false)}
      />
    </div>
  );
}

export default TcCommunityIntegrationsDialog;
