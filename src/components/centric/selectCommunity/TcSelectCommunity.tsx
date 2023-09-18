import React from 'react';
import TcText from '../../shared/TcText';
import TcBoxContainer from '../../shared/TcBox/TcBoxContainer';
import TcInput from '../../shared/TcInput';

function TcSelectCommunity() {
  return (
    <div className="space-y-4">
      <TcText text="Select your community" variant="h4" />
      <TcText
        text="You will be able to switch between the communities later"
        variant="body1"
      />
      <TcBoxContainer
        contentContainerChildren={
          <div className="py-8">
            <TcInput
              label="Community"
              variant="filled"
              placeholder="Write community name"
            />
          </div>
        }
        className="w-3/5 mx-auto border border-custom-gray min-h-[20rem] max-h-[20rem] overflow-y-scroll rounded-lg"
      />
    </div>
  );
}

export default TcSelectCommunity;
