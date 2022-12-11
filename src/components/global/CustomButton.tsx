import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";
import React from "react";

interface IButtonProps extends ButtonProps {
  fontSize?: "small" | "medium" | "large";
  classes: string;
  label: string;
  onClick: () => void;
}
export default function CustomButton({ classes, label, ...res }: IButtonProps) {
  return (
    <>
      <Button
        className={clsx("py-3 w-[240px] rounded-md text-base", classes)}
        {...res}
      >
        {label}
      </Button>
    </>
  );
}

CustomButton.defaultProps = {
  disabled: false,
};
