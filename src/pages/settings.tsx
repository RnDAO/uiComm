import React, { useEffect, useState } from 'react';
import SEO from '../components/global/SEO';
import { defaultLayout } from '../layouts/defaultLayout';
import { FiCalendar } from 'react-icons/fi';
import { FaHashtag, FaCodeBranch, FaRegCheckCircle } from 'react-icons/fa';
import { HiOutlineUserPlus } from 'react-icons/hi2';
import Accardion from '../components/global/Accardion';
import { Paper, TextField } from '@mui/material';
import CustomButton from '../components/global/CustomButton';
import ChannelSelection from '../components/pages/settings/ChannelSelection';
import IntegrateDiscord from '../components/pages/settings/IntegrateDiscord';
import RollSelection from '../components/pages/settings/RollSelection';
import { HiOutlineMail } from 'react-icons/hi';
import DataAnalysis from '../components/pages/settings/DataAnalysis';
import useAppStore from '../store/useStore';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import { useRouter } from 'next/router';
import { StorageService } from '../services/StorageService';
import { IUser } from '../utils/types';

function Settings(): JSX.Element {
  const {
    isLoading,
    userInfo,
    getUserInfo,
    changeEmail,
    getUserGuildInfo,
    fetchGuildChannels,
  } = useAppStore();

  const [emailAddress, setEmailAddress] = useState<string>('');
  const [isEmailUpdated, setEmailUpdated] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      const { token } = user;
      if (!token.accessToken) {
        router.replace('/tryNow');
      }
    } else {
      router.replace('/tryNow');
    }
  }, []);

  useEffect(() => {
    fetchEmail();
  }, []);

  const fetchEmail = async () => {
    await getUserInfo().then((_res: any) => {
      setEmailAddress(_res?.email);
    });
  };

  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (Object.keys(router?.query).length > 0 && router.query.isSuccessful) {
        const { guildId } = router?.query;
        fetchGuildChannels(guildId);
        getUserGuildInfo(guildId);
      }
    }, [router]);
  }

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');

    if (user) {
      const { guildId } = user.guild;      
      if (guildId) {
        fetchGuildChannels(guildId);
        getUserGuildInfo(guildId);
      }
    }
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
      detailsComponent: <ChannelSelection />,
      id: '2',
    },
    {
      title: 'Roles and permissions',
      icon: <HiOutlineUserPlus color="black" />,
      detailsComponent: <RollSelection />,
      id: '3',
    },
    {
      title: 'Integration',
      icon: <FaCodeBranch color="black" />,
      detailsComponent: <IntegrateDiscord />,
      id: '4',
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
