import React, { useEffect, useState } from 'react';
import SEO from '../components/global/SEO';
import { defaultLayout } from '../layouts/defaultLayout';
import { FiCalendar } from 'react-icons/fi';
import { FaHashtag, FaCodeBranch, FaRegCheckCircle } from 'react-icons/fa';
import Accardion from '../components/global/Accardion';
import { Paper, TextField } from '@mui/material';
import CustomButton from '../components/global/CustomButton';
import ChanelSelection from '../components/pages/settings/ChanelSelection';
import IntegrateDiscord from '../components/pages/settings/IntegrateDiscord';
import { HiOutlineMail } from 'react-icons/hi';
import DataAnalysis from '../components/pages/settings/DataAnalysis';
import useAppStore from '../store/useStore';
import SimpleBackdrop from '../components/global/LoadingBackdrop';

function Settings(): JSX.Element {
  const {
    isLoading,
    userInfo,
    getUserInfo,
    changeEmail,
    getUserGuildInfo,
    fetchGuildChannels,
  } = useAppStore();

  const [emailAddress, setEmailAddress] = useState('');
  const [isEmailUpdated, setEmailUpdated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('RNDAO_access_token');
    if (!token) {
      location.replace('/login');
    }
  }, []);

  useEffect(() => {
    return () => {
      getUserInfo().then((_res: any) => {
        setEmailAddress(userInfo.email);
      });
    };
  }, []);

  useEffect(() => {
    const { guildId } = JSON.parse(localStorage.getItem('RNDAO_guild') || '{}');
    fetchGuildChannels(guildId);
    getUserGuildInfo(guildId);
  }, []);

  const updateEmailAddress = () => {
    changeEmail(emailAddress).then((res: any) => {
      setEmailUpdated(true);
    });
  };

  const CommunityItems = [
    {
      title: 'Change date period for data analysis',
      icon: <FiCalendar color="black" />,
      detailsComponent: <DataAnalysis />,
      id: '1',
    },
    {
      title: 'Change your imported channels',
      icon: <FaHashtag color="black" />,
      detailsComponent: <ChanelSelection />,
      id: '2',
    },
    {
      title: 'Integration',
      icon: <FaCodeBranch color="black" />,
      detailsComponent: <IntegrateDiscord />,
      id: '3',
    },
  ];

  const personalItems = [
    {
      title: 'Email',
      icon: <HiOutlineMail color="black" />,
      detailsComponent: (
        <div className="flex flex-col space-y-3">
          <TextField
            id="filled-basic"
            label="Email Address"
            variant="filled"
            autoComplete="off"
            value={emailAddress}
            InputProps={{ disableUnderline: true }}
            className="w-full md:w-[240px]"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <CustomButton
            classes="bg-secondary text-white"
            startIcon={isEmailUpdated ? <FaRegCheckCircle /> : ''}
            disabled={emailAddress === userInfo.email}
            label={isEmailUpdated ? 'Email saved' : 'Save email'}
            onClick={() => updateEmailAddress()}
          />
        </div>
      ),
      id: '1',
    },
  ];

  return (
    <>
      <SEO titleTemplate="Settings" />
      {isLoading ? (
        <SimpleBackdrop />
      ) : (
        <div className="flex flex-col container space-y-8 justify-between px-4 md:px-12 py-4">
          <Paper className="px-4 md:px-8 py-6 rounded-xl shadow-box">
            <h3 className="text-xl md:text-3xl font-bold">Settings</h3>
            <Accardion title="Community settings" childs={CommunityItems} />
            <Accardion title="Personal settings" childs={personalItems} />
          </Paper>
        </div>
      )}
    </>
  );
}

Settings.pageLayout = defaultLayout;

export default Settings;
