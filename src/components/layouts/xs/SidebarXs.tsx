import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type items = {
  name: string;
  path: string;
  icon: any;
};

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUserGroup, faHeartPulse } from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { Drawer } from '@mui/material';

import { FaBars } from 'react-icons/fa';
import { MdKeyboardBackspace } from 'react-icons/md';
import { conf } from '../../../configs';
import { FiSettings } from 'react-icons/fi';
import { useToken } from '../../../context/TokenContext';
import { ICommunityDiscordPlatfromProps } from '../../../utils/interfaces';

const Sidebar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const { community } = useToken();

  const [connectedPlatform, setConnectedPlatform] =
    useState<ICommunityDiscordPlatfromProps | null>(null);

  useEffect(() => {
    const storedCommunity = community;

    if (storedCommunity?.platforms) {
      const foundPlatform = storedCommunity.platforms.find(
        (platform) => platform.disconnectedAt === null
      );

      setConnectedPlatform(foundPlatform ?? null);
    }
  }, [community]);

  const menuItems: items[] = [
    {
      name: 'Community Insights',
      path: '/',
      icon: (
        <FontAwesomeIcon
          icon={faUserGroup}
          style={{ fontSize: 30, color: 'black' }}
        />
      ),
    },
    {
      name: 'Community Health',
      path: '/community-health',
      icon: (
        <FontAwesomeIcon
          icon={faHeartPulse}
          style={{ fontSize: 30, color: 'black' }}
        />
      ),
    },
    {
      name: 'Community Settings',
      path: '/community-settings',
      icon: (
        <FiSettings
          style={{ fontSize: 20, color: 'black', margin: '0 auto' }}
        />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItem = menuItems.map((el) => (
    <li key={el.name} className="py-4">
      <Link href={el.path} onClick={() => setOpen(false)}>
        <div
          className={
            currentRoute === el.path
              ? 'w-1/2 mx-auto py-2 rounded-xl text-center bg-white hover:bg-white ease-in delay-75 cursor-pointer'
              : 'w-1/2 mx-auto py-2 rounded-xl text-center hover:bg-white ease-in delay-75 cursor-pointer'
          }
        >
          {el.icon}
        </div>
        <p className="text-center text-lg">{el.name}</p>
      </Link>
    </li>
  ));

  return (
    <>
      <div className="bg-gray-background sticky top-0 py-4 px-5 flex md:hidden flex-row justify-between items-center z-50">
        <div className="flex flex-row">
          <div className="flex flex-row text-center items-center">
            <div className="w-8 h-8 mb-2 mr-3">
              <div className="w-10 h-10 mx-auto">
                {connectedPlatform &&
                connectedPlatform.metadata &&
                connectedPlatform.metadata.icon ? (
                  <Image
                    src={`${conf.DISCORD_CDN}icons/${connectedPlatform.metadata.id}/${connectedPlatform.metadata.icon}`}
                    width="100"
                    height="100"
                    alt={
                      connectedPlatform.metadata.name
                        ? connectedPlatform.metadata.name
                        : ''
                    }
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-secondary text-center w-10 h-10 rounded-full align-center flex flex-col justify-center text-xs" />
                )}
              </div>
            </div>
          </div>
        </div>
        <FaBars size={30} onClick={handleDrawerOpen} />
      </div>
      <Drawer
        variant="persistent"
        anchor="right"
        sx={{
          '& .MuiPaper-root': {
            width: '100%',
          },
        }}
        open={open}
      >
        <div className="bg-gray-background h-screen p-3">
          <MdKeyboardBackspace size={30} onClick={handleDrawerClose} />
          <nav>
            <ul className="flex flex-col px-3">{menuItem}</ul>
          </nav>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
