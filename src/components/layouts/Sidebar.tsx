import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type items = {
  name: string;
  path: string;
  icon: any;
};

import { conf } from '../../configs/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import the icons you need
import {
  faUserGroup,
  faHeartPulse,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { Tooltip, Typography } from '@mui/material';
import useAppStore from '../../store/useStore';
import { StorageService } from '../../services/StorageService';
import { IUser } from '../../utils/types';

const Sidebar = () => {
  const { guildInfoByDiscord } = useAppStore();
  const [guildId, setGuildId] = useState('');
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');

    if (user) {
      const { guildId } = user.guild;
      if (guildId) {
        setGuildId(guildId);
      }
    }
  }, []);

  const menuItems: items[] = [
    {
      name: 'Community Insights',
      path: '/',
      icon: (
        <FontAwesomeIcon
          icon={faUserGroup}
          style={{ fontSize: 20, color: 'black' }}
        />
      ),
    },
    {
      name: 'Community Health',
      path: '/community-health',
      icon: (
        <FontAwesomeIcon
          icon={faHeartPulse}
          style={{ fontSize: 20, color: 'black' }}
        />
      ),
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: (
        <FontAwesomeIcon
          icon={faGear}
          style={{ fontSize: 20, color: 'black' }}
        />
      ),
    },
  ];

  const menuItem = menuItems.map((el) => (
    <li key={el.name} className="py-4">
      {el.path === '/community-health' ? (
        <>
          <Tooltip
            title={<Typography fontSize={14}>Comming soon</Typography>}
            arrow
            placement="right"
          >
            <div
              className={
                currentRoute === el.path
                  ? 'py-2 rounded-xl text-center bg-white hover:bg-white ease-in delay-75 cursor-pointer'
                  : 'py-2 rounded-xl text-center hover:bg-white ease-in delay-75 cursor-pointer'
              }
            >
              {el.icon}
            </div>
          </Tooltip>
          <p className="text-center text-sm">{el.name}</p>
        </>
      ) : (
        <Link href={el.path}>
          <div
            className={
              currentRoute === el.path
                ? 'py-2 rounded-xl text-center bg-white hover:bg-white ease-in delay-75 cursor-pointer'
                : 'py-2 rounded-xl text-center hover:bg-white ease-in delay-75 cursor-pointer'
            }
          >
            {el.icon}
          </div>
          <p className="text-center text-sm">{el.name}</p>
        </Link>
      )}
    </li>
  ));

  return (
    <aside className="hidden md:block bg-gray-background shadow-inner md:w-[100px] xl:w-[150px] fixed h-screen">
      <nav>
        <div>
          <div className="flex flex-col mx-auto justify-center text-center my-4">
            <div className="w-full mx-auto">
              <div className="w-10 h-10 mb-2 mx-auto">
                {guildId && guildInfoByDiscord.icon ? (
                  <Image
                    src={`${conf.DISCORD_CDN}icons/${guildId}/${guildInfoByDiscord.icon}`}
                    width="100"
                    height="100"
                    alt={guildInfoByDiscord.name ? guildInfoByDiscord.name : ''}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-secondary text-center w-10 h-10 rounded-full align-center flex flex-col justify-center text-xs" />
                )}
              </div>
            </div>
            <p className="text-sm w-9/12 font-bold text-center overflow-hidden mx-auto break-words">
              {guildInfoByDiscord.name}
            </p>
          </div>
        </div>
        <hr className="mx-2" />
        <ul className="flex flex-col px-3">{menuItem}</ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
