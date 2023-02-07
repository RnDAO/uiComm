import { FormControlLabel, Checkbox } from '@mui/material';

type IChannelListProps = {
  guild: any;
  onChange: (channelId: string, subChannelId: string, status: boolean) => void;
  handleCheckAll: (guild: any, status: boolean) => void;
};

export default function ChannelList({
  guild,
  onChange,
  handleCheckAll,
}: IChannelListProps) {
  const subChannelsList = (
    <>
      <p className="text-sm my-1">Channels</p>
      {guild.subChannels.map((channel: any, index: any) => (
        <div className="flex flex-col space-y-3 mb-1" key={index}>
          <FormControlLabel
            control={
              <Checkbox
                name={channel.name}
                value={channel.id}
                color="secondary"
                checked={guild.selected[channel.id]}
                onChange={(e) =>
                  onChange(guild.id, channel.id, e.target.checked)
                }
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
      <p className="text-md font-bold mb-2">{guild.title}</p>
      <div className="ml-5">
        <FormControlLabel
          label="All Channels"
          control={
            <Checkbox
              checked={Object.values(guild.selected).every((item) => item)}
              color="secondary"
              onChange={(e) => handleCheckAll(guild, e.target.checked)}
            />
          }
        />
        {subChannelsList}
      </div>
    </div>
  );
}
