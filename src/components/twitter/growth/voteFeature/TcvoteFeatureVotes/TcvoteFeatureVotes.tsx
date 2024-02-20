import React, { useEffect, useState } from 'react';

import TcvoteFeatureVotesItems from './TcvoteFeatureVotesItems';

const TcvoteFeatureVotesMockList = [
  {
    label:
      'Member Breakdown: see the accounts in each category to engage with them',
    value: 0,
  },
  {
    label: 'Tweet Scheduling: create tweets directly from the dashboard ',
    value: 1,
  },
  {
    label:
      'Cross Platform Integration: see how many active twitter followers are also active in your discord',
    value: 2,
  },
  {
    label:
      'Targeting: Discover new twitter profiles similar to your most active followers',
    value: 3,
  },
];

interface ITcvoteFeatureVotesProps {
  handleSelectedFeatures: (selectedFeatures: boolean[]) => void;
}

function TcvoteFeatureVotes({
  handleSelectedFeatures,
}: ITcvoteFeatureVotesProps) {
  const [nextFeatures, setNextFeatures] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    handleSelectedFeatures(nextFeatures);
  }, [nextFeatures]);

  const handleToggleCheckbox = (e: boolean, index: number) => {
    setNextFeatures((prevState) =>
      prevState.map((item, idx) => (idx === index ? e : item))
    );
  };
  return (
    <div className='flex flex-col space-y-3'>
      {TcvoteFeatureVotesMockList.map((item, index) => (
        <TcvoteFeatureVotesItems
          isChecked={nextFeatures[index]}
          key={index}
          label={item.label}
          handleToggleCheckbox={(event) => handleToggleCheckbox(event, index)}
          color='secondary'
        />
      ))}
    </div>
  );
}

export default TcvoteFeatureVotes;
