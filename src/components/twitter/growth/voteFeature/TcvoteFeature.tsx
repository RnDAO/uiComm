import React, { useState } from 'react';
import TcvoteFeatureHeader from './TcvoteFeatureHeader';
import TcvoteFeatureVotes from './TcvoteFeatureVotes/TcvoteFeatureVotes';
import TcButton from '../../shared/TcButton';

function TcvoteFeature() {
  const [nextFeature, setNextFeature] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
  ]);

  const handleSelectedFeatures = (selectedFeatures: boolean[]) => {
    setNextFeature(selectedFeatures);
  };

  return (
    <div className="space-y-8">
      <TcvoteFeatureHeader />
      <TcvoteFeatureVotes handleSelectedFeatures={handleSelectedFeatures} />
      <div className="flex justify-center">
        <TcButton
          text="Vote now"
          variant="contained"
          color="secondary"
          disabled={!nextFeature.includes(true)}
        />
      </div>
    </div>
  );
}

export default TcvoteFeature;
