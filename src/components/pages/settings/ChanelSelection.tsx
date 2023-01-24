import { Button, Checkbox, Dialog, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

type props = {
    label: string;
};

export default function ChanelSelection() {
    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <p className="text-base">
                Selected channels: <b>{0}</b>{" "}
                <span
                    className="pl-4 text-secondary underline cursor-pointer font-bold"
                    onClick={() => setOpen(true)}
                >
                    Show Channels
                </span>
            </p>
            <Dialog
                fullWidth={fullWidth}
                open={open}
                sx={{
                    "& .MuiDialog-container": {
                        alignItems: "flex-start",
                        verticalAlign: "top",
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "650px",
                            borderRadius: "10px",
                        },
                    },
                }}
                onClose={handleClose}
            >
                <div className="p-4">
                    <div>
                        <div className="flex flex-row justify-between md:items-center cursor-pointer">
                            <h3 className="font-bold text-xl">
                                Import activities from channels
                            </h3>
                            <IoClose size={30} onClick={handleClose} />
                        </div>
                        <p className="py-4 text-base">
                            Select channels to import activity in this workspace. Please give
                            Together Crew access to all selected private channels by updating the
                            channels permissions in Discord. Discord permission will affect
                            the channels the bot can see.
                        </p>
                    </div>
                    <div className="border border-1 border-gray-300 px-4 py-4 rounded-lg max-h-[410px] overflow-y-scroll text-base">
                        <div>
                            <h3 className="font-bold">PROJECT UNITS</h3>
                            <div className="md:pl-4">
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="All Channels"
                                />
                                <p>Channels</p>
                                <div className="flex flex-col">
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="# 👋 Introductions"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="# 🧑‍🤝‍🧑 Community health"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="# ‍💬 Chat"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold">ARCHIVE</h3>
                            <div className="md:pl-4">
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="All Channels"
                                />
                                <p>Channels</p>
                                <div className="flex flex-col">
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="# 👋 Introductions"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="# 🧑‍🤝‍🧑 Community health"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="# ‍💬 Chat"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-5">
                        <Button
                            className="bg-secondary text-white py-3 px-16 text-base"
                            onClick={handleClose}
                        >
                            Save channels
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

ChanelSelection.defaultProps = {
    label: "Selected channels:",
};
