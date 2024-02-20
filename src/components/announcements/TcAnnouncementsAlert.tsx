import React from 'react';
import TcAlert from '../shared/TcAlert';
import TcCollapse from '../shared/TcCollapse';
import TcText from '../shared/TcText';
import TcButton from '../shared/TcButton';
import useAppStore from '../../store/useStore';
import { useToken } from '../../context/TokenContext';

function TcAnnouncementsAlert() {
  const { grantWritePermissions } = useAppStore();

  const { community } = useToken();

  const handleGrantAccess = () => {
    const guildId = community?.platforms.find(
      (platform) => platform.disconnectedAt === null
    )?.metadata.id;

    if (guildId)
      grantWritePermissions({
        platformType: 'discord',
        moduleType: 'Announcement',
        id: guildId,
      });
  };
  return (
    <TcCollapse
      in={true}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        '&:MuiPaper-root': {
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
      <TcAlert
        variant='filled'
        className={'bg-error-500'}
        icon={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingY: 0,
        }}
      >
        <div className='flex flex-col items-center justify-center p-0 md:flex-row md:space-x-3'>
          <TcText
            text={
              'Announcements needs write access at the server-level (i.e. Send Message, Send Messages in Threads, Create Public Threads, Create Private Threads, etc)'
            }
            color={'white'}
            variant={'subtitle1'}
          />
          <TcButton
            text='Update Permissions'
            onClick={handleGrantAccess}
            className='text-white'
          />
        </div>
      </TcAlert>
    </TcCollapse>
  );
}

export default TcAnnouncementsAlert;
