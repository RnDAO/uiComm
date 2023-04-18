import CustomButton from '../../global/CustomButton';
import React, { ReactElement } from 'react';
import Paper from '@mui/material/Paper';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { VscSearch } from 'react-icons/vsc';
import InputBase from '@mui/material/InputBase';
interface ByHandleProps {
  title: string;
  id: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function ByHandle({ title, id }: ByHandleProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      className={
        expanded === id
          ? 'shadow-base rounded-xl mx-1 border-solid border border-gray-200 my-0'
          : 'mx-0'
      }
      expanded={expanded === id}
      onChange={handleChange(id)}
      id={id}
      key={id}
      disableGutters
      sx={{
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary aria-controls={`${id}-content`} id={id}>
        <div
          className={clsx(
            'flex flex-row w-full items-center justify-between rounded-lg gap-10',
            expanded !== id
              ? 'border border-gray-200 px-2 py-1.5 '
              : 'border-none px-2 pt-1.5 py-0'
          )}
        >
          <p className="font-bold text-base">{title}</p>
          <CustomButton
            label="+ Add admin"
            classes="border-solid border  py-[6px] md:w-fit text-xs text-black"
            onClick={() => handleOpen()}
          />
        </div>
      </AccordionSummary>
      <AccordionDetails className="px-4">
        <div className="bg-[#F5F5F5] rounded-sm w-fit p-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </div>
      </AccordionDetails>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new Admin
          </Typography>
          {/* <div className="bg-[#F5F5F5] w-[425px]"> */}
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 425,
              background: '#F5F5F5',
            }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <VscSearch />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search member"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e: any) => {
                console.log('Miracle', e.target.value);
              }}
            />
          </Paper>
          {/* </div> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Selected admins
          </Typography>
          <div className="bg-[#F5F5F5] rounded-sm w-[425px] h-[80px]"></div>
          <CustomButton
            label="Save"
            classes="flex mt-4 mx-auto bg-[#CEBBF3] text-white"
            onClick={handleClose}
          />
        </Box>
      </Modal>
    </Accordion>
  );
}
