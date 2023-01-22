import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

type IProps = {
  data: any;
};
export default function IndeterminateCheckbox({ data }: IProps) {
  const [active, setActive] = useState(true);
  const [checkedState, setCheckedState] = useState(
    new Array(data.subChannels.length).fill(true)
  );

  const handleCheckAll = (e: any) => {
    if (e.target.checked) {
      setActive(true);
      setCheckedState(new Array(data.subChannels.length).fill(true));
    } else {
      setActive(false);
      setCheckedState(new Array(data.subChannels.length).fill(false));
    }
  };

  const handleOnChange = (position: any) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position ? !item : item;
    });

    setCheckedState(updatedCheckedState);

    if (updatedCheckedState.includes(false)) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <p className="text-sm">Channels</p>
      {data.subChannels.map((channel: any, index: any) => (
        <div className="flex flex-col space-y-1" key={index}>
          {channel.isChecked}
          <FormControlLabel
            control={
              <Checkbox
                name={channel.name}
                value={channel.id}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />
            }
            label={channel.name}
          />
        </div>
      ))}
    </Box>
  );

  return (
    <div>
      <h3 className="font-bold first:mt-0 my-2">{data.title}</h3>
      <FormControlLabel
        label="All Channels"
        control={<Checkbox checked={active} onChange={handleCheckAll} />}
      />
      {children}
    </div>
  );
}
