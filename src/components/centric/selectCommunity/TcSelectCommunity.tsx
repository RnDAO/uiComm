import React from 'react';
import TcText from '../../shared/TcText';
import TcBoxContainer from '../../shared/TcBox/TcBoxContainer';
import TcInput from '../../shared/TcInput';
import TcCommunityList from './TcCommunityList';
import TcButton from '../../shared/TcButton';
import { BsPlus } from 'react-icons/bs';
import router from 'next/router';

function TcSelectCommunity() {
  return (
    <div className="space-y-4" data-testid="tcselect-community">
      <TcText text="Select your community" variant="h4" />
      <TcText
        text="You will be able to switch between the communities later"
        variant="body1"
      />
      <TcBoxContainer
        contentContainerChildren={
          <div className="py-8">
            <div className="sticky top-0 z-10 bg-white py-2">
              <TcInput
                label="Community"
                variant="filled"
                placeholder="Write community name"
              />
            </div>
            <TcCommunityList />
          </div>
        }
        className="w-3/5 mx-auto border border-custom-gray min-h-[20rem] max-h-[25rem] overflow-y-scroll rounded-lg"
      />
      <TcButton text="Continue" className="secondary" variant="contained" />
      <hr className="w-6/12 mx-auto" />
      <TcText text="Create a new community account" variant="h6" />
      <TcButton
        startIcon={<BsPlus />}
        text="Create"
        variant="outlined"
        onClick={() => router.push('/centric/create-new-community')}
      />
    </div>
  );
}

export default TcSelectCommunity;
