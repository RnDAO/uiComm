import React from "react";
import Sidebar from "../components/layouts/Sidebar";

type Props = {
  children: React.ReactNode;
};

export const defaultLayout = ({ children }: Props) => {
  return (
    <>
      <div className="w-screen flex flex-row justify-between w-full">
        <aside className="bg-gray-background shadow-inner w-24 shadow-inner fixed min-h-screen">
          <Sidebar />
        </aside>
        <main className="ml-24 flex-1">{children}</main>
      </div>
    </>
  );
};
