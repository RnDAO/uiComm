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

  const [platfromAnalyzerDate, setPlatfromAnalyzerDate] = useState<string>('');
  const [currentTrueIDs, setCurrentTrueIDs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [isChannelsFetched, setIsChannelFetched] = useState<boolean>(true);

  const [initialPlatformAnalyzerDate, setInitialPlatformAnalyzerDate] =
    useState<string>('');
  const [initialTrueIDs, setInitialTrueIDs] = useState<string[]>([]);

  const { refreshData, selectedSubChannels } = channelContext;

  const id = router.query.platformId as string;

  const fetchPlatform = async () => {
    if (id) {
      try {
        setLoading(true);
        const data = await retrievePlatformById(id);
        setFetchedPlatform(data);
        setLoading(false);
        const { metadata } = data;
        if (metadata) {
          const { selectedChannels } = metadata;

          const data = await refreshData(id, 'channel', selectedChannels);

          if (data && data.length === 0) {
            setIsChannelFetched(false);
          }
        } else {
          const data = await refreshData(id, 'channel');
          if (data && data.length === 0) {
            setIsChannelFetched(false);
          }
        }
      } catch (error) {
      } finally {
      }
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchPlatform();
  }, [id, retrievePlatformById]);

  useEffect(() => {
    if (isChannelsFetched) return;

    const fetchPlatformData = async () => {
      if (!id) return;

      try {
        const data = await retrievePlatformById(id);
        setFetchedPlatform(data);
        const { metadata } = data;
        if (metadata) {
          const { selectedChannels } = metadata;
          await refreshData(id, 'channel', selectedChannels);
        } else {
          await refreshData(id);
        }
        setLoading(false);
      } catch (error) {}
    };

    const intervalId = setInterval(() => {
      fetchPlatformData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isChannelsFetched]);

  const handlePatchCommunity = async () => {
    try {
      const data = await patchPlatformById({
        id,
        metadata: {
          selectedChannels: currentTrueIDs,
          period: platfromAnalyzerDate,
          analyzerStartedAt: new Date().toISOString(),
        },
      });
      if (data) {
        setOpenConfirmDialog(true);
      }
      await fetchPlatform();
    } catch (error) {}
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
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
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
