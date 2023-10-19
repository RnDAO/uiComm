/**
 * TcIntegrationDialog Component
 *
 * This component renders a dialog that provides instructions on how to integrate
 * different platforms with your community. It uses Material-UI's Dialog component
 * for the core functionality.
 *
 * Props:
 * - `title` (string): The title text to display at the top of the dialog.
 * - `showDialog` (boolean): Determines if the dialog should be displayed or not.
 * - `bodyContent` (JSX.Element): The content to display inside the dialog.
 * - `buttonText` (string): Text to display inside the action button.
 * - `onClose` (function): A function that gets called when the close icon is clicked.
 *
 * Example:
 * ```tsx
 * <TcIntegrationDialog
 *    title="How to connect your community’s Twitter account"
 *    showDialog={true}
 *    bodyContent={
 *      <>
 *        <p>1 / Go to Twitter...</p>
 *        <p>2 / Once you are connected...</p>
 *      </>
 *    }
 *    buttonText="Connect Twitter account"
 *    onClose={() => {}}
 * />
 * ```
 */

import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import TcButton from '../../shared/TcButton';
import TcText from '../../shared/TcText';
import TcDialog from '../../shared/TcDialog';

interface IntegrationDialogProps {
  title: string;
  showDialog: boolean;
  bodyContent: JSX.Element;
  buttonText: string;
  onClose: () => void;
}

function TcIntegrationDialog({
  title,
  showDialog,
  bodyContent,
  buttonText,
  onClose,
  ...props
}: IntegrationDialogProps) {
  return (
    <TcDialog
      open={showDialog}
      fullScreen={false}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '560px',
            borderRadius: '10px',
          },
        },
      }}
      {...props}
    >
      <div className="block p-2">
        <IoCloseSharp
          size={36}
          onClick={onClose}
          className="float-right cursor-pointer"
        />
      </div>
      <div className="md:w-5/6 mx-auto px-6 md:px-8 pb-8 space-y-4">
        <TcText
          text={title}
          variant="h6"
          fontWeight="extraBold"
          className="text-left md:text-center"
        />
        {bodyContent}
        <div className="flex justify-center py-4">
          <TcButton text={buttonText} variant="contained" />
        </div>
      </div>
    </TcDialog>
  );
}

export default TcIntegrationDialog;
