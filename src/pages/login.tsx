import * as React from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { IoClose } from "react-icons/io5";
import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SEO from "../components/global/SEO";
import CustomDatePicker from "../components/global/CustomDatePicker";
import { DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
import clsx from "clsx";


const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#35B9B7",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#35B9B7",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 6,
    border: 0,
    backgroundColor: "#F5F5F5",
    borderRadius: 1,
  },
}));

const VerticalColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#35B9B7",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#35B9B7",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    marginTop: "-8px",
    marginBottom: "-8px",
    marginLeft: '8px',
    minHeight: "calc(24px + 1.5rem)",
    borderLeftWidth: '6px',
    borderColor: '#F5F5F5'
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: "#FFFFFF",
  zIndex: 1,
  color: "#222222",
  fontWeight: "bold",
  width: 50,
  height: 50,
  fontSize: "27px",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  ...(ownerState.active && {
    border: "solid 4px #35B9B7",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#35B9B7",
    color: "white",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: number } = {
    1: 1,
    2: 2,
    3: 3,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  <><b>Connect</b> your Discord community</>,
  <><b>Select</b> time periond an channels you want to be analysed</>,
  <><b>Begin</b> data import</>,
];

type dateItems = {
  title: string;
  icon?: JSX.Element;
  value: any;
};
const datePeriod: dateItems[] = [
  {
    title: "Last 7 days",
    value: 0,
  },
  {
    title: "1M",
    value: 1,
  },
  {
    title: "3M",
    value: 2,
  },
  {
    title: "1Y",
    value: 3,
  },
];

export default function Login() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [activePeriod, setActivePeriod] = useState(0);
  const [emailAddress, setEmailAddress] = useState('');
  const [isTermsChecked, setTermsCheck] = useState(false)
  const [dayRange, setDayRange] = React.useState<DayRange>({
    from: null,
    to: null,
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SEO titleTemplate="Connect your commiunity" />
      <div className="mx-auto flex justify-center mt-4 md:mt-12">
        <div className="text-xs md:text-lg h-12 w-12 md:h-20 md:w-20 bg-gray-background rounded-full justify-center flex font-bold text-gray-500	items-center text-center">
          XYZ LOGO
        </div>
      </div>
      <div className="p-3">
        <div className="shadow-xl md:w-[700px] mx-auto rounded-xl overflow-hidden mt-4 md:my-6">
          {activeStep === 0 ? (
            <>
              <div className="bg-secondary text-white text-center py-8">
                <h1 className="font-bold text-2xl">Welcome to XYZ</h1>
                <p className="text-xl">Let’s connect your community.</p>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="py-12">
            <div className="py-3 px-8 text-center mx-auto">
              <Stepper
                className={clsx(" md:hidden", activeStep === 0 ? 'block' : 'flex')}
                orientation={activeStep === 0 ? 'vertical' : 'horizontal'}
                alternativeLabel={activeStep === 0 ? false : true}
                activeStep={activeStep}
                connector={activeStep === 0 ? <VerticalColorlibConnector /> : <ColorlibConnector />}
              >
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {activeStep === 0 ? label : ''}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Stepper
                className="hidden md:flex"
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
              >
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {activeStep === 0 ? label : ''}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === 0 ? (
                <>
                  <FormControlLabel
                    className="pt-12 md:w-2/3 font-medium text-left items-start"
                    control={
                      <Checkbox color="primary"
                        value={isTermsChecked}
                        onChange={(e) => setTermsCheck(e.target.checked)} />}
                    label={
                      <span className="text-sm">
                        I understand and agree to the{" "}
                        <b className="text-aqua">
                          Privacy Policy and Terms of Service.
                        </b>
                      </span>
                    }
                  />
                  <div className="flex justify-center mt-8">
                    <Button
                      className="bg-aqua text-white px-8 py-3 rounded-md text-base	"
                      disabled={!isTermsChecked}
                      onClick={() => setActiveStep(activeStep + 1)}
                    >
                      Connect your community
                    </Button>
                  </div>
                </>
              ) : activeStep === 1 ? (
                <>
                  <div className="flex flex-col space-y-8 text-left mt-8 p-1 md:p-6">
                    <div>
                      <h3 className="font-bold text-base">
                        Choose date period for data analysis
                      </h3>
                      <p className="text-base">
                        You will be able to change date period and selected
                        channels in the future.
                      </p>
                      <ul className="flex flex-row flex-wrap md:space-y-0 space-x-1.5 md:space-x-3 mt-3">
                        {datePeriod.length > 0
                          ? datePeriod.map((el) => (
                            <li
                              className={`
                           flex flex-row items-center px-3 md:px-2.5 py-2 md:py-1.5 rounded-md cursor-pointer
                           ${activePeriod == el.value
                                  ? "bg-black text-white"
                                  : "bg-gray-background"
                                }`}
                              key={el.value}
                              onClick={() => setActivePeriod(el.value)}
                            >
                              {el.icon ? el.icon : ""}
                              <div>{el.title}</div>
                            </li>
                          ))
                          : ""}
                        <CustomDatePicker />
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-base pb-3">
                        Confirm your imported channels
                      </h3>
                      <p className="text-base">
                        Selected channels:
                        <b> {2}</b>{" "}
                        <span
                          className="pl-4 text-aqua underline cursor-pointer font-bold"
                          onClick={() => setOpen(true)}
                        >
                          Show Channels
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="font-bold pb-2">Type your email</p>
                      <TextField
                        id="filled-basic"
                        label="Email Address"
                        variant="filled"
                        autoComplete='off'
                        value={emailAddress}
                        InputProps={{ disableUnderline: true }}
                        className="w-full md:w-2/5"
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button
                        className="text-white bg-aqua w-full md:w-1/3 py-3 text-base"
                        onClick={() => setActiveStep(activeStep + 1)}
                        disabled={!activeStep || !emailAddress}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-3/4 text-center mx-auto py-12 md:py-12">
                    <h3 className="font-bold text-3xl pt-7">
                      {"Perfect, you're all set!"}
                    </h3>
                    <p className="py-8 text-base">
                      Data import just started. It might take up to 12 hours to
                      finish. Once it is done we will send you a{" "}
                      <b>message on Discord.</b>
                    </p>
                    <Button
                      className="text-white bg-aqua w-full md:w-2/4 py-3 text-base"
                      onClick={() => router.push("/")}
                    >
                      I Understand
                    </Button>
                  </div>
                  <p className="text-left md:text-center">
                    While you are waiting, read our research about{" "}
                    <b className="text-aqua">
                      {" "}
                      <Link
                        href={
                          "https://rndao.mirror.xyz/F-SMj6p_jdYvrMMkR1d9Hd6YbEg39qItTKfjo-zkgqM"
                        }
                      >
                        Community Health.
                      </Link>
                    </b>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        fullWidth={fullWidth}
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "650px",
              borderRadius: "10px"
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
              XYZ access to all selected private channels by updating the
              channels permissions in Discord. Discord permission will affect
              the channels the bot can see.
            </p>
          </div>
          <div className="border border-1 border-gray-300 px-4 py-4 rounded-lg max-h-[410px] overflow-scroll text-base">
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
            <Button className="bg-aqua text-white py-3 px-16 text-base" onClick={handleClose}>
              Save channels
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
