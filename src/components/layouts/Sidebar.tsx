import React from "react";
import Image from "next/image";

type items = {
  name: string;
  path: string;
  icon: any;
};

import polygon from "../../assets/svg/polygon.svg";

const Sidebar = () => {
  const menuItems: items[] = [
    {
      name: "Community Insights",
      path: "/",
      icon: "",
    },
    {
      name: "Community Health",
      path: "/",
      icon: "",
    },
    {
      name: "Settings",
      path: "/",
      icon: "",
    },
  ];

  const todoItems = menuItems.map((el) => (
    <li key={el.name} className="py-4">
      {el.name}
    </li>
  ));

  return (
    <>
      <nav>
        <div>
          <Image src={polygon} alt="polygon" width="100" height="100" />
        </div>
        <ul className="flex flex-col px-3">{todoItems}</ul>
      </nav>
    </>
  );
};

export default Sidebar;
