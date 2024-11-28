import React from 'react';
import { FormControlLabel } from '@mui/material';

import TcCheckbox from '../../../../shared/TcCheckbox';
import TcText from '../../../../shared/TcText';

interface ITcvoteFeatureVotesItemsProps {
  label: string;
  color: 'primary' | 'secondary';
  isChecked: boolean;
  handleToggleCheckbox: (event: boolean) => void;
}

function TcvoteFeatureVotesItems({
  label,
  color,
  isChecked,
  handleToggleCheckbox,
  ...props
}: ITcvoteFeatureVotesItemsProps) {
  return (
    <div className='mx-auto rounded-lg border border-gray-border-box p-4 md:w-2/3'>
      <FormControlLabel
        {...props}
        label={<TcText text={label} variant='subtitle1' fontWeight='bold' />}
        control={
          <TcCheckbox
            color={color}
            checked={isChecked}
            onChange={(event) => handleToggleCheckbox(event.target.checked)}
          />
        }
      />
    </div>
  );
}

export default TcvoteFeatureVotesItems;
