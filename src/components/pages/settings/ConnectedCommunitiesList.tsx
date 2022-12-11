import React, { useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import CustomModal from "../../global/CustomModal";
import CustomButton from "../../global/CustomButton";
import ConnectedCommunitiesItem from "./ConnectedCommunitiesItem";

const ConnectedCommunitiesItems = [
  {
    serverName: "Ploygon DAO",
    connectedAt: "Connected 12 Jun 2022",
  },
];

export default function ConnectedCommunitiesList() {
  const [open, setOpen] = useState<boolean>(false);
  const toggleModal = (e: boolean) => {
    setOpen(e);
  };
  return (
    <div className="bg-gray-background rounded-lg px-4 h-[268px]">
      <p className="text-base font-semibold pt-2">Connected communities</p>
      <div className="p-4">
        <ConnectedCommunitiesItem onClick={() => setOpen(true)} />
      </div>
      <CustomModal isOpen={open} toggleModal={toggleModal} hasClose={true}>
        <div className="mx-auto text-center w-2/3 space-y-6 pb-8">
          <BsClockHistory
            size={60}
            className="mx-auto bg-gray-100 rounded-full p-3"
          />
          <h3 className="text-lg font-bold">
            Are you sure you want to disconnect your community?
          </h3>
          <p className="text-sm">
            Importing activities and members will be stopped. Historical
            activities will not be affected.
          </p>
          <div>
            <CustomButton
              classes="bg-aqua text-white"
              label={"Yes, disconnect"}
              onClick={() => setOpen(false)}
            />
            <CustomButton
              classes="text-aqua mt-2"
              label={"Cancel"}
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
