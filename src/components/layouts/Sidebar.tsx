import React from "react";
import Image from "next/image";

type items = {
  name: string;
  path: string;
  icon: any;
};

import polygon from "../../assets/svg/polygon.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import {
  faUserGroup,
  faHeartPulse,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/router";
import Link from "next/link";

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
          style={{ fontSize: 20, color: "black" }}
        />
      ),
    },
    {
      name: "Community Health",
      path: "/t",
      icon: (
        <FontAwesomeIcon
          icon={faHeartPulse}
          style={{ fontSize: 20, color: "black" }}
        />
      ),
    },
    {
      name: "Settings",
      path: "/b",
      icon: (
        <FontAwesomeIcon
          icon={faGear}
          style={{ fontSize: 20, color: "black" }}
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
              ? "py-2 rounded-xl text-center bg-white hover:bg-white ease-in delay-75 cursor-pointer"
              : "py-2 rounded-xl text-center hover:bg-white ease-in delay-75 cursor-pointer"
          }
        >
          {el.icon}
        </div>
        <p className="text-center text-sm">{el.name}</p>
      </Link>
    </li>
  ));

  return (
    <aside className="hidden md:block bg-gray-background shadow-inner md:w-28 shadow-inner fixed h-screen">
      <nav>
        <div>
          <div className="text-center my-4">
            <div className="w-8 h-8 mb-2 mx-auto">
              <Image src={polygon} alt="polygon" width="100" height="100" />
            </div>
            <p className="text-sm font-medium">Polygon DAO</p>
          </div>
        </div>
        <hr className="mx-2" />
        <ul className="flex flex-col px-3">{menuItem}</ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
