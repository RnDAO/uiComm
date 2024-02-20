import React, { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import TcPlatformChannelDialogBody from './TcPlatformChannelDialogBody';
import TcPlatformChannelDialogFooter from './TcPlatformChannelDialogFooter';
import TcPlatformChannelDialogHeader from './TcPlatformChannelDialogHeader';
import TcButton from '../../shared/TcButton';
import TcDialog from '../../shared/TcDialog';
import TcText from '../../shared/TcText';
import { ChannelContext } from '../../../context/ChannelContext';
import { calculateSelectedChannelSize } from '../../../helpers/helper';

function TcPlatformChannelDialog() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const channelContext = useContext(ChannelContext);

  const { selectedSubChannels } = channelContext;

  const selectedCount = calculateSelectedChannelSize(selectedSubChannels);

  return (
    <div>
      <TcText
        text="Confirm your imported channels"
        variant='body1'
        fontWeight='bold'
      />
      <div className='flex items-center space-x-3 md:flex-row'>
        <TcText
          text={`Selected channels: ${selectedCount}`}
          variant='body1'
          className='whitespace-nowrap'
        />
        <TcButton
          text="Show channels"
          sx={{ width: 'auto', textDecoration: 'underline' }}
          onClick={() => setOpenDialog(true)}
        />
      </div>
      <TcDialog
        open={openDialog}
        fullScreen={false}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '640px',
              borderRadius: '10px',
              '@media (max-width:600px)': {
                margin: '10px',
              },
            },
          },
        }}
      >
        <div className='flex items-center justify-between p-6'>
          <TcText text="Import activities from channels" variant='h5' />
          <AiOutlineClose
            className='cursor-pointer'
            size={24}
            onClick={() => setOpenDialog(false)}
          />
        </div>
        <div className='px-6'>
          <TcPlatformChannelDialogHeader />
          <TcPlatformChannelDialogBody />
          <TcPlatformChannelDialogFooter />
        </div>
        <div className='flex justify-center px-6 pb-3 md:px-0'>
          <TcButton
            text="Save Channels"
            variant='contained'
            sx={{ width: '15rem', padding: '0.5rem' }}
            onClick={() => setOpenDialog(false)}
          />
        </div>
      </TcDialog>
    </div>
  );
}

export default TcPlatformChannelDialog;
