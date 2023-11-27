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
import { StorageService } from '../../../services/StorageService';
import { ICommunity, IPlatformProps } from '../../../utils/interfaces';
import { ChannelContext } from '../../../context/ChannelContext';
import updateTrueIDs from '../../../helpers/PlatformHelper';
import SimpleBackdrop from '../../global/LoadingBackdrop';

interface TcPlatformProps {
  platformName?: string;
}

function TcPlatform({ platformName = 'Discord' }: TcPlatformProps) {
  const channelContext = useContext(ChannelContext);
  const { retrievePlatformById, patchCommunityById, patchPlatformById } =
    useAppStore();
  const [fetchedPlatform, setFetchedPlatform] = useState<IPlatformProps | null>(
    null
  );
  const router = useRouter();

  // State for current values
  const [platfromAnalyzerDate, setPlatfromAnalyzerDate] = useState<string>('');
  const [currentTrueIDs, setCurrentTrueIDs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const community = StorageService.readLocalStorage<ICommunity>('community');

  // State for initial values
  const [initialCommunityName, setInitialCommunityName] = useState<string>(
    community?.name || ''
  );
  const [communityName, setCommunityName] = useState<string>(
    community?.name || ''
  );

  const [initialPlatformAnalyzerDate, setInitialPlatformAnalyzerDate] =
    useState<string>('');
  const [initialTrueIDs, setInitialTrueIDs] = useState<string[]>([]);

  const { selectedSubChannels } = channelContext;
  const { id } = router.query;

  const fetchPlatform = async () => {
    if (id) {
      try {
        const data = await retrievePlatformById(id);
        setFetchedPlatform(data);
      } catch (error) {
        console.error('Error fetching platform data:', error);
      }
    }
  };

  useEffect(() => {
    fetchPlatform();
  }, [id, retrievePlatformById]);

  const handlePatchCommunity = async () => {
    setLoading(true);
    const communityId = community?.id;

    if (communityId && communityName) {
      try {
        await patchCommunityById({ communityId, name: communityName });
        StorageService.updateLocalStorageWithObject<ICommunity>(
          'community',
          'name',
          communityName
        );
        await patchPlatformById({
          id,
          metadata: {
            selectedChannels: currentTrueIDs,
            period: platfromAnalyzerDate,
            analyzerStartedAt: new Date().toISOString(),
          },
        });
        await fetchPlatform();
        setLoading(false);
      } catch (error) {
        console.error('Error updating community:', error);
        setLoading(false);
      }
    }
  };

  const handlePlatformNameChange = (newName: string) => {
    setCommunityName(newName);
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

  const isButtonDisabled =
    communityName === initialCommunityName &&
    platfromAnalyzerDate === initialPlatformAnalyzerDate &&
    currentTrueIDs.length === initialTrueIDs.length &&
    currentTrueIDs.every((id, index) => id === initialTrueIDs[index]);

  if (loading) {
    return <SimpleBackdrop />;
  }

  return (
    <TcBoxContainer
      contentContainerChildren={
        <div className="p-4 md:p-10 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-5">
              <TcText text={platformName} variant={'h6'} />
              <div>
                <TcText text="Server:" variant={'body2'} color={'gray.100'} />
                <TcCommunityName
                  connectedAt={fetchedPlatform?.connectedAt || ''}
                  onNameChange={handlePlatformNameChange}
                />
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
              disabled={isButtonDisabled}
              onClick={handlePatchCommunity}
            />
          </div>
        </div>
      }
    />
  );
}

export default TcPlatform;
