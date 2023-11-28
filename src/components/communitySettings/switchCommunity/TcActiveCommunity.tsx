import React, { useCallback, useEffect, useState } from 'react';
import { StorageService } from '../../../services/StorageService';
import useAppStore from '../../../store/useStore';
import { ICommunity } from '../../../utils/interfaces';
import TcAvatar from '../../shared/TcAvatar';
import TcConfirmDeleteCommunity from './TcConfirmDeleteCommunity';
import Loading from '../../global/Loading';
import TcInput from '../../shared/TcInput';
import { debounce } from '@mui/material';

const updateCommunityName = debounce(
  async (communityId, newName, updateFunc, fetchFunc) => {
    await updateFunc({ communityId, name: newName });
    await fetchFunc();
  },
  500
);

function TcActiveCommunity() {
  const { retrieveCommunityById, patchCommunityById } = useAppStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [community, setCommunity] = useState<ICommunity | null>(null);
  const storedCommunityId =
    StorageService.readLocalStorage<ICommunity>('community')?.id;

  useEffect(() => {
    async function initFetch() {
      try {
        setLoading(true);
        await fetchCommunity();
      } catch (error) {
        console.error('Failed to fetch community data:', error);
      } finally {
        setLoading(false);
      }
    }

    initFetch();
  }, []);

  async function fetchCommunity() {
    try {
      if (storedCommunityId) {
        const fullCommunityData = await retrieveCommunityById(
          storedCommunityId
        );

        setCommunity(fullCommunityData);
        StorageService.writeLocalStorage('community', fullCommunityData);
      }
    } catch (error) {
      setLoading(false);
      console.error('Failed to fetch community data:', error);
    }
  }

  const handleCommunityNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newName = event.target.value;
    if (community && community.id) {
      setCommunity({ ...community, name: newName });
      updateCommunityName(
        community.id,
        newName,
        patchCommunityById,
        fetchCommunity
      );
    }
  };

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
        <TcAvatar src={community?.avatarURL} sx={{ width: 40, height: 40 }} />
        {loading ? (
          <Loading height="40px" size={30} />
        ) : (
          <TcInput
            label="Community name"
            variant="filled"
            placeholder="Write community name"
            size="small"
            value={community?.name || ''}
            onChange={handleCommunityNameChange}
            sx={{
              minWidth: '14rem',
            }}
          />
        )}
      </div>
      <TcConfirmDeleteCommunity
        community={community}
        handleUpdatePlatforms={fetchCommunity}
      />
    </div>
  );
}

export default TcActiveCommunity;
