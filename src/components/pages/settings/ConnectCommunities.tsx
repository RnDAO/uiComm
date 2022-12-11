import { Paper } from "@mui/material";
import React, { useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import CustomButton from "../../global/CustomButton";
import DatePeriodRange from "../../global/DatePeriodRange";
import CustomModal from "../../global/CustomModal";
import ChanelSelection from "../../pages/settings/ChanelSelection";
import { BsClockHistory } from "react-icons/bs";

export default function ConnectCommunities() {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [activePeriod, setActivePeriod] = useState<number | string>(0);

  const handleActivePeriod = (e: number) => {
    setActivePeriod(e);
  };

  const toggleModal = (e: boolean) => {
    setOpen(e);
  };

  const toggleConfirmModal = (e: boolean) => {
    setConfirmModalOpen(e);
  };
  return (
    <>
      <CustomModal
        isOpen={confirmModalOpen}
        toggleModal={toggleConfirmModal}
        hasClose={true}
      >
        <div className="mx-auto text-center w-2/3 space-y-6 pb-8">
          <BsClockHistory
            size={60}
            className="mx-auto bg-gray-100 rounded-full p-3"
          />
          <h3 className="text-lg font-bold">{"Perfect, you're all set!"}</h3>
          <p className="text-sm">
            Data import just started. It might take up to 12 hours to finish.
            Once it is done we will send you a message on Discord.
          </p>
          <CustomButton
            classes="bg-aqua text-white"
            label={"I understand"}
            onClick={() => setConfirmModalOpen(false)}
          />
        </div>
      </CustomModal>
      <CustomModal isOpen={open} toggleModal={toggleModal} hasClose={true}>
        <div className="mx-auto text-left w-11/12 space-y-6 pb-8">
          <h3 className="font-bold text-base">
            Choose date period for data analysis
          </h3>
          <p className="text-base">
            You will be able to change date period and selected channels in the
            future.
          </p>
          <DatePeriodRange
            activePeriod={activePeriod}
            onChangeActivePeriod={handleActivePeriod}
          />
          <h3 className="font-bold text-base pb-3">
            Confirm your imported channels
          </h3>
          <ChanelSelection />
          <div className="text-center">
            <CustomButton
              classes="bg-aqua text-white"
              label={"Continue"}
              onClick={() => {
                setOpen(false), toggleConfirmModal(true);
              }}
            />
          </div>
        </div>
      </CustomModal>
      <div className="h-[268px]">
        <div className="h-[200px] w-[200px]">
          <p className="text-base whitespace-nowrap font-semibold pt-2">
            Connect your communities
          </p>
          <Paper
            className="text-center h-[200px] py-8 shadow-box rounded-xl mt-3 cursor-pointer"
            onClick={() => toggleModal(true)}
          >
            <p className="font-sm">Discord</p>
            <FaDiscord size={60} className="mx-auto mt-2 mb-2" />
            <div className="text-aqua text-base flex items-center justify-center">
              <GoPlus size={20} className="mr-1" />
              <p className="font-bold">Connect</p>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
