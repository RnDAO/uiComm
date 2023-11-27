import React, { useContext, useState } from 'react';
import TcText from '../../shared/TcText';
import TcButton from '../../shared/TcButton';
import TcDialog from '../../shared/TcDialog';
import { AiOutlineClose } from 'react-icons/ai';
import TcPlatformChannelDialogHeader from './TcPlatformChannelDialogHeader';
import TcPlatformChannelDialogBody from './TcPlatformChannelDialogBody';
import TcPlatformChannelDialogFooter from './TcPlatformChannelDialogFooter';
import {
  ChannelContext,
  SelectedSubChannels,
} from '../../../context/ChannelContext';

function TcPlatformChannelDialog() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const channelContext = useContext(ChannelContext);

  const { selectedSubChannels } = channelContext;

  const calculateSelectedChannelSize = (
    selectedSubChannels: SelectedSubChannels
  ) => {
    let count = 0;
    for (const channelId in selectedSubChannels) {
      for (const subChannelId in selectedSubChannels[channelId]) {
        if (selectedSubChannels[channelId][subChannelId]) {
          count++;
        }
      }
    }
    return count;
  };

  const selectedCount = calculateSelectedChannelSize(selectedSubChannels);

  return (
    <div>
      <TcText
        text={'Confirm your imported channels'}
        variant="body1"
        fontWeight="bold"
      />
      <div className="flex items-center space-x-3">
        <TcText text={`Selected channels: ${selectedCount}`} variant="body1" />
        <TcButton
          text={'Show channels'}
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
            },
          },
        }}
      >
        <div className="flex justify-between items-center p-6">
          <TcText text={'Import activities from channels'} variant="h5" />
          <AiOutlineClose
            className="cursor-pointer"
            size={24}
            onClick={() => setOpenDialog(false)}
          />
        </div>
        <div className="px-6">
          <TcPlatformChannelDialogHeader />
          <TcPlatformChannelDialogBody />
          <TcPlatformChannelDialogFooter />
        </div>
        <div className="flex justify-center pb-3">
          <TcButton
            text={'Save Channels'}
            variant="contained"
            onClick={() => setOpenDialog(false)}
          />
        </div>
      </TcDialog>
    </div>
  );
}

export default TcPlatformChannelDialog;
