import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react';
import { MdExpandMore } from 'react-icons/md';

function TcPlatformChannelDialogFooter() {
  return (
    <div>
      <Accordion disableGutters defaultExpanded={true} elevation={0}>
        <AccordionSummary
          expandIcon={<MdExpandMore color="#37474F" size={25} fill="#37474F" />}
        >
          <p className="font-semibold text-md">
            How to give access to the channel you want to import?
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <div className="pl-1 pr-4 text-left">
            <ol className="list-decimal text-sm pl-4">
              <li>
                Navigate to the channel you want to import on{' '}
                <a
                  href="https://discord.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary font-semibold cursor-pointer"
                >
                  Discord
                </a>
              </li>
              <li>
                Go to the settings for that specific channel (select the wheel
                on the right of the channel name)
              </li>
              <li>
                Select <b>Permissions</b> (left sidebar), and then in the middle
                of the screen check <b>Advanced permissions</b>
              </li>
              <li>
                With the <b>TogetherCrew Bot</b> selected, under Advanced
                Permissions, make sure that [View channel] and [Read message
                history] are marked as [✓]
              </li>
              <li>
                Select the plus sign to the right of Roles/Members and under
                members select <b>TogetherCrew bot</b>
              </li>
              <li>
                Click on the <b>Refresh List</b> button on this window and
                select the new channels
              </li>
            </ol>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TcPlatformChannelDialogFooter;
