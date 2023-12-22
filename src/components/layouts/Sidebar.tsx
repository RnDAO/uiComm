import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type items = {
  name: string;
  path: string;
  icon: any;
};

import { conf } from '../../configs/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUserGroup, faHeartPulse } from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiSettings } from 'react-icons/fi';
import { ICommunityDiscordPlatfromProps } from '../../utils/interfaces';
import { useToken } from '../../context/TokenContext';
import TcText from '../shared/TcText';

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
      name: 'Community Settings',
      path: '/community-settings',
      icon: (
        <FiSettings
          style={{ fontSize: 20, color: 'black', margin: '0 auto' }}
        />
      ),
    },
  ];

  const menuItem = menuItems.map((el) => (
    <li key={el.name} className="py-4">
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
    </li>
  ));

  return (
    <aside className="hidden md:block bg-gray-background shadow-inner md:w-[100px] xl:w-[150px] fixed h-screen">
      <nav>
        <div>
          <div className="flex flex-col mx-auto justify-center text-center my-4">
            <div className="w-full mx-auto">
              <div
                className="w-10 h-10 mb-2 mx-auto cursor-pointer"
                onClick={() => router.push('/centric/select-community')}
              >
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
              <TcText
                text={community?.name}
                variant="body1"
                fontWeight="bold"
              />
            </div>
          </div>
        </div>
        <hr className="mx-2" />
        <ul className="flex flex-col px-3">{menuItem}</ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
