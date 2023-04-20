import { FormControlLabel, Checkbox } from '@mui/material';
import { FiAlertTriangle } from 'react-icons/fi';

type IChannelListProps = {
  guild: any;
  showFlag: boolean;
  onChange: (channelId: string, subChannelId: string, status: boolean) => void;
  handleCheckAll: (guild: any, status: boolean) => void;
};

export default function ChannelList({
  guild,
  onChange,
  handleCheckAll,
  showFlag,
}: IChannelListProps) {
  const subChannelsList = (
    <>
      <p className="text-sm my-1">Channels</p>
      {guild.subChannels.map((channel: any, index: any) => (
        <div className="flex flex-col space-y-3 mb-1" key={index}>
          <div className="flex flex-col md:flex-row justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  name={channel.name}
                  value={channel.id}
                  color="secondary"
                  checked={
                    channel.canReadMessageHistoryAndViewChannel
                      ? guild.selected[channel.id]
                      : false
                  }
                  disabled={
                    showFlag
                      ? !channel.canReadMessageHistoryAndViewChannel
                      : false
                  }
                  onChange={(e) =>
                    onChange(guild.id, channel.id, e.target.checked)
                  }
                />
              }
              label={channel.name}
            />
            {showFlag && !channel.canReadMessageHistoryAndViewChannel ? (
              <div className="flex flex-row items-center pl-8 md:pl-0 text-red-600">
                <FiAlertTriangle color="text-red-600" />
                <span className="pl-2 text-sm">
                  {!channel.canReadMessageHistoryAndViewChannel
                    ? 'Bot needs access'
                    : ''}
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
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

ChannelList.defaultProps = {
  showFlag: false,
};
