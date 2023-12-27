import React from 'react';
import { defaultLayout } from '../../layouts/defaultLayout';
import SEO from '../../components/global/SEO';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcText from '../../components/shared/TcText';
import TcSelect from '../../components/shared/TcSelect';
import { FormControl, InputLabel } from '@mui/material';
import { BsDiscord, BsTelegram } from 'react-icons/bs';
import TcPublicMessaageContainer from '../../components/announcements/create/publicMessageContainer';
import TcPrivateMessaageContainer from '../../components/announcements/create/TcPrivateMessaageContainer';

const announcementsPlatforms = [
  {
    label: 'Discord',
    value: '1',
    icon: <BsDiscord />,
  },
  {
    label: 'Telegram(TBA)',
    value: '2',
    disabled: true,
    icon: <BsTelegram />,
  },
];

function CreateNewAnnouncements() {
  return (
    <>
      <SEO titleTemplate="Create Announcement" />
      <div className="flex flex-col container px-4 md:px-12 py-4">
        <TcBoxContainer
          contentContainerChildren={
            <div className="p-4 md:p-10 space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <TcText
                    text="Create Announcement"
                    variant="h6"
                    fontWeight="bold"
                  />
                  <TcText
                    text="Select a platform, enter your public and/or private messages below, finally schedule it in and then you’re good to go!"
                    variant="subtitle2"
                    className="text-gray-400"
                  />
                </div>
                <FormControl variant="filled" sx={{ minWidth: 180 }}>
                  <InputLabel id="select-standard-label">
                    Select Platform
                  </InputLabel>
                  <TcSelect
                    size="small"
                    labelId="select-standard-label"
                    id="select-standard-label"
                    label="Platform"
                    defaultValue={1}
                    options={announcementsPlatforms}
                  />
                </FormControl>
              </div>
              <TcPublicMessaageContainer />
              <TcPrivateMessaageContainer />
            </div>
          }
        />
      </div>
    </>
  );
}

CreateNewAnnouncements.pageLayout = defaultLayout;

export default CreateNewAnnouncements;
