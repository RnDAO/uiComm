import React, { useContext, useEffect, useState } from 'react';
import TcBoxContainer from '../../shared/TcBox/TcBoxContainer';
import TcText from '../../shared/TcText';
import TcButton from '../../shared/TcButton';
import TcPlatformPeriod from './TcPlatformPeriod';
import TcPlatformChannels from './TcPlatformChannels';
import { useRouter } from 'next/router';
import useAppStore from '../../../store/useStore';
import TcDisconnectPlatform from './TcDisconnectPlatform';
import TcCommunityName from './TcCommunityName';
import { IPlatformProps } from '../../../utils/interfaces';
import { ChannelContext } from '../../../context/ChannelContext';
import updateTrueIDs from '../../../helpers/PlatformHelper';
import SimpleBackdrop from '../../global/LoadingBackdrop';
import TcCommunityIntegrationsConfirmDialog from '../communityIntegrations/TcCommunityIntegrationsConfirmDialog';

interface TcPlatformProps {
  platformName?: string;
}

function TcPlatform({ platformName = 'Discord' }: TcPlatformProps) {
  const channelContext = useContext(ChannelContext);

  const { retrievePlatformById, patchPlatformById } = useAppStore();
  const [fetchedPlatform, setFetchedPlatform] = useState<IPlatformProps | null>(
    null
  );
  const router = useRouter();

  // State for current values
  const [platfromAnalyzerDate, setPlatfromAnalyzerDate] = useState<string>('');
  const [currentTrueIDs, setCurrentTrueIDs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const [initialPlatformAnalyzerDate, setInitialPlatformAnalyzerDate] =
    useState<string>('');
  const [initialTrueIDs, setInitialTrueIDs] = useState<string[]>([]);

  const { selectedSubChannels } = channelContext;
  const { id } = router.query;

  const fetchPlatform = async () => {
    setLoading(true);
    if (id) {
      try {
        const data = await retrievePlatformById(id);
        setFetchedPlatform(data);
      } catch (error) {
        console.error('Error fetching platform data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPlatform();
  }, [id, retrievePlatformById]);

  const handlePatchCommunity = async () => {
    try {
      setLoading(true);
      await patchPlatformById({
        id,
        metadata: {
          selectedChannels: currentTrueIDs,
          period: platfromAnalyzerDate,
          analyzerStartedAt: new Date().toISOString(),
        },
      });
      setOpenConfirmDialog(true);
      await fetchPlatform();
      setLoading(false);
    } catch (error) {
      console.error('Error updating community:', error);
      setLoading(false);
    }
  };

  const handleDateChange = (date: string) => {
    if (initialPlatformAnalyzerDate === '')
      setInitialPlatformAnalyzerDate(date);
    setPlatfromAnalyzerDate(date);
  };

  useEffect(() => {
    const updatedIDs = updateTrueIDs(selectedSubChannels);
    if (initialTrueIDs.length === 0 && updatedIDs.length > 0) {
      setInitialTrueIDs(updatedIDs);
    }
    setCurrentTrueIDs(updatedIDs);
  }, [selectedSubChannels]);

  if (loading) {
    return <SimpleBackdrop />;
  }

  const handleConfirmPlatformUpdate = () => {
    setLoading(true);
    setOpenConfirmDialog(false);
    router.push('/community-settings');
  };

  return (
    <TcBoxContainer
      contentContainerChildren={
        <div className="p-4 md:p-10 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-5">
              <TcText text={platformName} variant={'h6'} />
              <div>
                <TcText text="Server:" variant={'body2'} color={'gray.100'} />
                <TcCommunityName platform={fetchedPlatform} />
              </div>
            </div>
            <TcDisconnectPlatform platform={fetchedPlatform} />
          </div>
          <TcPlatformPeriod
            platform={fetchedPlatform}
            onDateChange={handleDateChange}
          />
          <TcPlatformChannels />
          <div className="flex justify-center pt-8 pb-6">
            <TcButton
              text="Confirm Changes"
              variant="contained"
              onClick={handlePatchCommunity}
            />
          </div>
          <TcCommunityIntegrationsConfirmDialog
            isOpen={openConfirmDialog}
            toggleDialog={() => handleConfirmPlatformUpdate()}
          />
        </div>
      }
    />
  );
}

export default TcPlatform;
