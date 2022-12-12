import React, { useState } from "react";
import CustomModal from "../../global/CustomModal";
import CustomButton from "../../global/CustomButton";
import DatePeriodRange from "../../global/DatePeriodRange";
import { BsClockHistory } from "react-icons/bs";

export default function DataAnalysis() {
    const [activePeriod, setActivePeriod] = useState<number | string>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [isDisabled, toggleDisabled] = useState<boolean>(true);
    const handleActivePeriod = (e: number) => {
        toggleDisabled(false);
        setActivePeriod(e);
    };

    const toggleModal = (e: boolean) => {
        setOpen(e);
    };

    return (
        <div className="flex flex-col space-y-4">
            <p className="text-sm text-black">
                It might take up to 12 hours to finish new data import. Once it is done
                we will <br /> send you a message on Discord.
            </p>
            <DatePeriodRange
                activePeriod={activePeriod}
                onChangeActivePeriod={handleActivePeriod}
            />
            <div>
                <CustomButton
                    classes="bg-aqua text-white mt-2"
                    label={"Confirm selection"}
                    disabled={isDisabled}
                    onClick={() => toggleModal(true)}
                />
            </div>
            <CustomModal isOpen={open} toggleModal={toggleModal} hasClose={true}>
                <div className="mx-auto text-center w-2/3 space-y-6 pb-8">
                    <BsClockHistory
                        size={60}
                        className="mx-auto bg-gray-100 rounded-full p-3"
                    />
                    <h3 className="text-xl font-bold">
                        We are changing date period for data analysis now
                    </h3>
                    <p className="text-sm">
                        It might take up to 12 hours to finish new data import. <br /> Once it is
                        done we will send you a message on Discord.
                    </p>
                    <CustomButton
                        classes="bg-aqua text-white"
                        label={"I understand"}
                        onClick={() => setOpen(false)}
                    />
                </div>
            </CustomModal>
        </div>
    );
}
