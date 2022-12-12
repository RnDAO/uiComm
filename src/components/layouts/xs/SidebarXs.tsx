import React, { useState } from "react";
import Image from "next/image";

type items = {
  name: string;
  path: string;
  icon: any;
};

import polygon from "../../../assets/svg/polygon.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faUserGroup,
  faHeartPulse,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";
import Link from "next/link";
import { Drawer } from "@mui/material";

import { GoThreeBars } from "react-icons/go";
import { MdKeyboardBackspace } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const menuItems: items[] = [
    {
      name: "Community Insights",
      path: "/",
      icon: (
        <FontAwesomeIcon
          icon={faUserGroup}
          style={{ fontSize: 30, color: "black" }}
        />
      ),
    },
    {
      name: "Community Health",
      path: "/t",
      icon: (
        <FontAwesomeIcon
          icon={faHeartPulse}
          style={{ fontSize: 30, color: "black" }}
        />
      ),
    },
    {
      name: "Settings",
      path: "/settings",
      icon: (
        <FontAwesomeIcon
          icon={faGear}
          style={{ fontSize: 30, color: "black" }}
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
              ? "w-1/2 mx-auto py-2 rounded-xl text-center bg-white hover:bg-white ease-in delay-75 cursor-pointer"
              : "w-1/2 mx-auto py-2 rounded-xl text-center hover:bg-white ease-in delay-75 cursor-pointer"
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
      <div className="bg-gray-background sticky top-0 z-10 py-4 px-5 flex md:hidden flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="flex flex-row text-center items-center">
            <div className="w-8 h-8 mr-3">
              <Image src={polygon} alt="polygon" width="100" height="100" />
            </div>
            <p className="text-md font-bold">Polygon DAO</p>
          </div>
        </div>
        <GoThreeBars size={30} onClick={handleDrawerOpen} />
      </div>
      <Drawer
        variant="persistent"
        anchor="right"
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
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
