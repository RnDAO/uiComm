import React from 'react';
import TcCheckbox from '../../../shared/TcCheckbox';
import { FormControlLabel } from '@mui/material';
import TcText from '../../../shared/TcText';

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
  ...rest
}: ITcvoteFeatureVotesItemsProps) {
  return (
    <div className="mx-auto md:w-2/3 border border-gray-border-box rounded-lg p-4">
      <FormControlLabel
        {...rest}
        label={<TcText text={label} variant={'subtitle1'} fontWeight="bold" />}
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
