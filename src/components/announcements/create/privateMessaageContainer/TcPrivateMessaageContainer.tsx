import React, { useState } from 'react';
import TcText from '../../../shared/TcText';
import { MdOutlineAnnouncement } from 'react-icons/md';
import TcIconContainer from '../TcIconContainer';
import TcButton from '../../../shared/TcButton';
import TcSelect from '../../../shared/TcSelect';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import TcInput from '../../../shared/TcInput';
import TcSwitch from '../../../shared/TcSwitch';
import TcIconWithTooltip from '../../../shared/TcIconWithTooltip';
import TcButtonGroup from '../../../shared/TcButtonGroup';
import clsx from 'clsx';

const mockPublicChannels = [
  {
    label: 'test',
    value: 1,
  },
  {
    label: 'test2',
    value: 2,
  },
];

export enum MessageType {
  Both = 'Both',
  RoleOnly = 'Role Only',
  UserOnly = 'User Only',
}

function TcPrivateMessageContainer() {
  const [privateMessage, setPrivateMessage] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<MessageType>(MessageType.Both);
  const [selectedChannels, setSelectedChannels] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedChannels(event.target.value as number[]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handlePrivateMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrivateMessage(event.target.checked);
  };

  const messageTypesArray = Object.values(MessageType);

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-1 md:space-y-0">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-3">
          <TcIconContainer>
            <MdOutlineAnnouncement size={20} />
          </TcIconContainer>
          <FormControlLabel
            className="mx-auto md:mx-0"
            control={<TcSwitch onChange={handlePrivateMessageChange} />}
            label={
              <div className="flex items-center space-x-1">
                <TcText text="Private Message (optional)" variant="body1" />
                <TcIconWithTooltip
                  tooltipText={
                    'Community members who have their DMs open will receive a DM. Members who have their DMs closed, will receive a private message inside the server (only they can see it). Additionally, a public message will always be sent with instructions to verify the legitimacy of the bot and announcement by checking the bot ID.'
                  }
                />
              </div>
            }
          />
        </div>
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-end md:space-x-3 items-center">
          <TcButtonGroup
            disableElevation
            disabled={!privateMessage}
            className="w-full"
          >
            {messageTypesArray.map((el) => (
              <TcButton
                key={el}
                disableElevation={true}
                text={el}
                className={clsx(
                  el === messageType
                    ? 'border border-gray-300 bg-gray-200'
                    : 'border border-gray-300 bg-white'
                )}
                sx={{
                  width: 'auto',
                  padding: {
                    xs: 'auto',
                    sm: '0.4rem 1rem',
                  },
                }}
                onClick={() => setMessageType(el)}
              />
            ))}
          </TcButtonGroup>
          <TcButton
            text="Preview"
            variant="outlined"
            sx={{
              maxWidth: {
                xs: '100%',
                sm: '8rem',
              },
              height: '2.4rem',
            }}
            disabled={!privateMessage}
          />
        </div>
      </div>
      {privateMessage && (
        <div className="space-y-1.5">
          <div className="flex justify-between space-x-3">
            <FormControl
              variant="filled"
              fullWidth
              size="medium"
              disabled={
                messageType !== MessageType.Both &&
                messageType !== MessageType.RoleOnly
              }
            >
              <InputLabel id="select-standard-label">Select Role(s)</InputLabel>
              <TcSelect
                multiple
                labelId="select-standard-label"
                id="select-standard-label"
                label="Platform"
                options={mockPublicChannels}
                value={selectedChannels}
                renderValue={(selected) =>
                  (selected as number[])
                    .map(
                      (value) =>
                        mockPublicChannels.find(
                          (channel) => channel.value === value
                        )?.label
                    )
                    .join(', ')
                }
                onChange={(event) => handleSelectChange(event)}
              />
            </FormControl>
            <FormControl
              variant="filled"
              fullWidth
              size="medium"
              disabled={
                messageType !== MessageType.Both &&
                messageType !== MessageType.UserOnly
              }
            >
              <InputLabel id="select-standard-label">
                Select Username(s)
              </InputLabel>
              <TcSelect
                multiple
                labelId="select-standard-label"
                id="select-standard-label"
                label="Platform"
                options={mockPublicChannels}
                value={selectedChannels}
                renderValue={(selected) =>
                  (selected as number[])
                    .map(
                      (value) =>
                        mockPublicChannels.find(
                          (channel) => channel.value === value
                        )?.label
                    )
                    .join(', ')
                }
                onChange={(event) => handleSelectChange(event)}
              />
            </FormControl>
          </div>
          <FormControl variant="filled" fullWidth size="medium">
            <TcInput
              label="Message"
              variant="filled"
              placeholder="Write your message here"
              rows={2}
              multiline
              value={message}
              onChange={handleChange}
              helperText={`${message.length} character${
                message.length !== 1 ? 's' : ''
              }`}
            />
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default TcPrivateMessageContainer;
