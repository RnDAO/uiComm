import { Paper } from "@mui/material";
import React from "react";
import { FaDiscord } from "react-icons/fa";
import Image from "next/image";
import polygon from "../../../assets/svg/polygon.svg";

export default function ConnectedCommunitiesItem({onClick}) {
  return (
    <div>
      <Paper className="text-center h-[200px] border border-gray-300 w-[200px] py-3 shadow-box rounded-xl flex flex-col justify-between">
        <div>
          <div className="font-sm flex justify-center items-center text-center">
            <p className="pr-1">Discord</p>
            <span className="md:h-3 md:w-3 bg-success rounded-full" />
          </div>
          <FaDiscord size={30} className="mx-auto mt-2 mb-3" />
        </div>
        <div className="text-sm flex items-start justify-center">
          <Image src={polygon} alt="polygon" width="30" height="30" />
          <div className="flex flex-col text-left pl-1">
            <p className="font-bold">Polygon DAO</p>
            <p className="text-xs">Connected 12 Jun 2022</p>
          </div>
        </div>
        <div className="border-t text-aqua font-bold pt-2  cursor-pointer" onClick={onClick}>
          Disconnect
        </div>
      </Paper>
    </div>
  );
}
