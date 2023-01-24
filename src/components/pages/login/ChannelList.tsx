import { FormControlLabel, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';

type IChannelListProps = {
  guild: any;
};

export default function ChannelList({
  guild,
}: IChannelListProps) {
  const [active, setActive] = useState(true);
  const [checkedState, setCheckedState] = useState(
    new Array(guild.subChannels.length).fill(true)
  );

  useEffect(() => {}, [checkedState]);

  const handleCheckAll = (e: any) => {
    if (e.target.checked) {
      setActive(true);
      setCheckedState(new Array(guild.subChannels.length).fill(true));
    } else {
      setActive(false);
      setCheckedState(new Array(guild.subChannels.length).fill(false));
    }
  };

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>, position: any) => {
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

  const subChannelsList = (
    <>
      <p className="text-sm">Channels</p>
      {guild.subChannels.map((channel: any, index: any) => (
        <div className="flex flex-col space-y-1" key={index}>
          <FormControlLabel
            control={
              <Checkbox
                name={channel.name}
                value={channel.id}
                checked={checkedState[index]}
                onChange={(e) => handleOnChange(e, index)}
              />
            }
            label={channel.name}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="flex flex-col">
      <p className="text-md font-bold">{guild.title}</p>
      <div className="ml-4">
        <FormControlLabel
          label="All Channels"
          control={<Checkbox checked={active} onChange={handleCheckAll} />}
        />
        {subChannelsList}
      </div>
    </div>
  );
}
