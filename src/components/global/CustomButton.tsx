import { Button, ButtonProps } from '@mui/material';
import clsx from 'clsx';

interface IButtonProps extends ButtonProps {
  classes: string;
  label: string;
}
export default function CustomButton({
  classes,
  label,
  ...rest
}: IButtonProps) {
  return (
    <>
      <Button
        className={clsx(
          'py-3 w-full md:w-[240px] rounded-md text-base border-1 border-black',
          classes
        )}
        {...rest}
      >
        {label}
      </Button>
    </>
  );
}

CustomButton.defaultProps = {
  disabled: false,
};
