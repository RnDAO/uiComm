import React, { useEffect, useState } from 'react';
import { StorageService } from '../../../services/StorageService';
import useAppStore from '../../../store/useStore';
import { ICommunity } from '../../../utils/interfaces';
import TcAvatar from '../../shared/TcAvatar';
import TcText from '../../shared/TcText';
import TcConfirmDeleteCommunity from './TcConfirmDeleteCommunity';

function TcActiveCommunity() {
  const { retrieveCommunityById } = useAppStore();
  const [community, setCommunity] = useState<ICommunity | null>(null);

  useEffect(() => {
    async function fetchCommunity() {
      try {
        const storedCommunity =
          StorageService.readLocalStorage<ICommunity>('community');

        if (storedCommunity) {
          const fullCommunityData = await retrieveCommunityById(
            storedCommunity.id
          );
            console.log({ fullCommunityData });
            
          setCommunity(fullCommunityData);
        }
      } catch (error) {
        console.error('Failed to fetch community data:', error);
      }
    }

    fetchCommunity();
  }, []);

  return (
    <div className="flex justify-between items-center border-b border-b-gray-200 py-4 mt-4">
      <div className="flex items-center space-x-2 px-3">
        <TcAvatar src={community?.avatarURL} sx={{ width: 30, height: 30 }} />
        <TcText text={community?.name} variant="body1" fontWeight="bold" />
      </div>
      <TcConfirmDeleteCommunity community={community} />
    </div>
  );
}

export default TcActiveCommunity;
