import React from "react";
import Sidebar from "../components/layouts/Sidebar";
import SidebarXs from "../components/layouts/xs/SidebarXs";

type Props = {
  children: React.ReactNode;
};

export const defaultLayout = ({ children }: Props) => {
  return (
    <>
      <div className="w-screen flex flex-col md:flex-row justify-between w-full">
        <Sidebar />
        <SidebarXs/>
        <main className="md:ml-[100px] xl:ml-[150px] flex-1">{children}</main>
      </div>
    </>
  );
};
