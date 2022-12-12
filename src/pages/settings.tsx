import React, { useState } from "react";
import SEO from "../components/global/SEO";
import { defaultLayout } from "../layouts/defaultLayout";
import { FiCalendar } from "react-icons/fi";
import { FaHashtag, FaCodeBranch, FaRegCheckCircle } from "react-icons/fa";
import Accardion from "../components/global/Accardion";
import { Paper, TextField } from "@mui/material";
import CustomButton from "../components/global/CustomButton";
import ChanelSelection from "../components/pages/settings/ChanelSelection";
import IntegrateDiscord from "../components/pages/settings/IntegrateDiscord";
import { HiOutlineMail } from "react-icons/hi";
import DataAnalysis from "../components/pages/settings/DataAnalysis";

function Settings(): JSX.Element {
    const [emailAddress, setEmailAddress] = useState("example@gmail.com");
    const [isEmailUpdated, setEmailUpdated] = useState<boolean>(false)

    const CommunityItems = [
        {
            title: "Change date period for data analysis",
            icon: <FiCalendar color="black" />,
            detailsComponent: <DataAnalysis />,
            id: "1",
        },
        {
            title: "Change your imported channels",
            icon: <FaHashtag color="black" />,
            detailsComponent: <ChanelSelection />,
            id: "2",
        },
        {
            title: "Integration",
            icon: <FaCodeBranch color="black" />,
            detailsComponent: <IntegrateDiscord />,
            id: "3",
        },
    ];

    const personalItems = [
        {
            title: "Email",
            icon: <HiOutlineMail color="black" />,
            detailsComponent: (
                <div className="flex flex-col space-y-3">
                    <TextField
                        id="filled-basic"
                        label="Email Address"
                        variant="filled"
                        autoComplete="off"
                        value={emailAddress}
                        InputProps={{ disableUnderline: true }}
                        className="w-full md:w-[240px]"
                        onChange={(e) => (setEmailAddress(e.target.value))}
                    />
                    <CustomButton
                        classes="bg-aqua text-white"
                        startIcon={isEmailUpdated ? <FaRegCheckCircle /> : ''}
                        disabled={emailAddress === 'example@gmail.com'}
                        label={isEmailUpdated ? 'Email saved' : "Save email"}
                        onClick={() => setEmailUpdated(true)}
                    />
                </div>
            ),
            id: "1",
        },
    ];

    return (
        <>
            <SEO titleTemplate="Settings" />
            <div className="flex flex-col container space-y-8 justify-between px-4 md:px-12 py-4">
                <Paper className="px-4 md:px-8 py-6 rounded-xl shadow-box">
                    <h3 className="text-xl md:text-3xl font-bold">Settings</h3>
                    <Accardion title="Community settings" childs={CommunityItems} />
                    <Accardion title="Personal settings" childs={personalItems} />
                </Paper>
            </div>
        </>
    );
}

Settings.pageLayout = defaultLayout;

export default Settings;
