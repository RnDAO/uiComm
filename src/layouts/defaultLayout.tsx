import React from "react";
import Sidebar from "../components/layouts/Sidebar";

type Props = {
  children: React.ReactNode;
};

export const defaultLayout = ({ children }: Props) => {
  return (
    <>
      <div className="flex flex-row justify-between w-full">
        <div className="bg-gray-background min-w-3/12">
          <Sidebar />
        </div>
        <div className="w-11/12">{children}</div>
      </div>
    </>
  );
};
