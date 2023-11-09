import React, { useEffect, useState } from 'react';
import { StorageService } from '../../../services/StorageService';
import useAppStore from '../../../store/useStore';
import { ICommunity } from '../../../utils/interfaces';
import TcAvatar from '../../shared/TcAvatar';
import TcText from '../../shared/TcText';
import TcConfirmDeleteCommunity from './TcConfirmDeleteCommunity';
import Loading from '../../global/Loading';

function TcActiveCommunity() {
  const { retrieveCommunityById } = useAppStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [community, setCommunity] = useState<ICommunity | null>(null);

  useEffect(() => {
    fetchCommunity();
  }, []);

  async function fetchCommunity() {
    try {
      setLoading(true);
      const storedCommunityId =
        StorageService.readLocalStorage<ICommunity>('community')?.id;
      console.log({ storedCommunityId });

      if (storedCommunityId) {
        const fullCommunityData = await retrieveCommunityById(
          storedCommunityId
        );

        setCommunity(fullCommunityData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Failed to fetch community data:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center border-b border-b-gray-200 py-4 mt-4">
        <Loading height="250" size={30} />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center border-b border-b-gray-200 py-4 mt-4">
      <div className="flex items-center space-x-2 px-3">
        <TcAvatar src={community?.avatarURL} sx={{ width: 30, height: 30 }} />
        <TcText text={community?.name} variant="body1" fontWeight="bold" />
      </div>
      <TcConfirmDeleteCommunity
        community={community}
        handleUpdatePlatforms={fetchCommunity}
      />
    </div>
  );
}

export default TcActiveCommunity;
