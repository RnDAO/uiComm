import React, { useCallback, useEffect, useState } from 'react';
import { StorageService } from '../../../services/StorageService';
import useAppStore from '../../../store/useStore';
import { ICommunity } from '../../../utils/interfaces';
import TcAvatar from '../../shared/TcAvatar';
import TcConfirmDeleteCommunity from './TcConfirmDeleteCommunity';
import Loading from '../../global/Loading';
import TcInput from '../../shared/TcInput';
import { debounce } from '@mui/material';
import { useSnackbar } from '../../../context/SnackbarContext';
import { MdGroups } from 'react-icons/md';

const updateCommunityName = debounce(
  async (communityId, newName, updateFunc, fetchFunc, showSnackbar) => {
    try {
      await updateFunc({
        communityId,
        name: newName.endsWith(' ') ? newName.slice(0, -1) : newName,
      });
      await fetchFunc();
      showSnackbar('Community name updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating community name:', error);
      showSnackbar('Failed to update community name', 'error');
    }
  },
  1000
);

function TcActiveCommunity() {
  const { retrieveCommunityById, patchCommunityById } = useAppStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [community, setCommunity] = useState<ICommunity | null>(null);

  const { showMessage } = useSnackbar();

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
      const storedCommunityId =
        StorageService.readLocalStorage<ICommunity>('community')?.id;
      if (storedCommunityId) {
        const fullCommunityData = await retrieveCommunityById(
          storedCommunityId
        );

        setCommunity(fullCommunityData);
        StorageService.writeLocalStorage('community', fullCommunityData);
      }
    } catch (error) {
      StorageService.removeLocalStorage('community');
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
        fetchCommunity,
        showMessage
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
    <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-b-gray-200 md:py-4 mt-4">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center space-x-2 md:px-3">
        <TcAvatar
          src={community?.avatarURL}
          sx={{ width: 40, height: 40 }}
          className="mx-auto"
        >
          <MdGroups size={28} />
        </TcAvatar>
        {loading ? (
          <Loading height="40px" size={30} />
        ) : (
          <TcInput
            label="Community name"
            variant="filled"
            placeholder="Write community name"
            size="small"
            value={community?.name || ''}
            disabled={!community?.name}
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
