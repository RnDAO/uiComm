import React from "react";
import Sidebar from "../components/layouts/Sidebar";

type Props = {
  children: React.ReactNode;
};

export const defaultLayout = ({ children }: Props) => {
  return (
    <>
      <div className="w-screen flex flex-row justify-between w-full">
        <aside className="hidden md:block bg-gray-background shadow-inner md:w-28 shadow-inner fixed min-h-screen">
          <Sidebar />
        </aside>
        <main className="md:ml-28 flex-1">{children}</main>
      </div>
    </>
  );
};
