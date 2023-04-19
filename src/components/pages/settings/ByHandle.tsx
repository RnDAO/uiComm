import CustomButton from '../../global/CustomButton';
import React, { ReactElement } from 'react';
import Paper from '@mui/material/Paper';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { VscSearch } from 'react-icons/vsc';
import { MdClose } from 'react-icons/md';
import { FiCheck } from 'react-icons/fi';
import InputBase from '@mui/material/InputBase';
import { roleLists } from '@/utils/mock';
import DiscordRoleCard from '@/components/global/DiscordRoleCard';
interface ByHandleProps {
  title: string;
  id: string;
  isAdmin: boolean;
  isRole: boolean;
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

export default function ByHandle({
  title,
  id,
  isAdmin,
  isRole,
}: ByHandleProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [open, setOpen] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(false);
  const handleOpen = (isRole: boolean) => {
    isRole ? setOpenRole(true) : setOpen(true);
  };
  const handleClose = (isRole: boolean) => {
    if (isRole) setOpenRole(false);
    else setOpen(false);
  };

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
            label={isAdmin ? '+ Add admin' : '+ Add viewer'}
            classes="border-solid border  py-[6px] md:w-fit text-xs text-black"
            onClick={() => handleOpen(isRole)}
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
        id="byRole"
        open={openRole}
        onClose={() => handleClose(isRole)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-row justify-between items-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select&nbsp;{isAdmin ? 'admins' : 'viewers'}&nbsp;by role
            </Typography>
            <IconButton onClick={() => handleClose(isRole)}>
              <MdClose />
            </IconButton>
          </div>
          <div className="flex flex-col border border-solid rounded-sm border-[#C6C6C6] w-[450px] px-3 py-5 h-96 overflow-y-auto overflow-x-hidden">
            <Paper
              component="form"
              sx={{
                boxShadow: 'none',
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
            <div className="flex flex-row gap-2 pt-5 ml-5">
            <div className="flex bg-[#804EE1] w-6 h-6 items-center justify-center rounded-md">
                    <IconButton>
                      <FiCheck className="text-white" />
                    </IconButton>
                  </div>
              All roles
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Discord roles
            </Typography>
            <div className="flex flex-col py-2">
              {roleLists.map(({ title, level }, index) => (
                <div
                  key={index}
                  className="flex flex-row py-1 gap-2 ml-5 items-center"
                >
                  <div className="flex bg-[#804EE1] w-6 h-6 items-center justify-center rounded-md">
                    <IconButton>
                      <FiCheck className="text-white" />
                    </IconButton>
                  </div>
                  <DiscordRoleCard level={level} title={title} />
                </div>
              ))}
            </div>
          </div>
          <CustomButton
            label="Save"
            classes="flex mt-4 mx-auto bg-[#804EE1] text-white"
            onClick={() => handleClose(isRole)}
          />
        </Box>
      </Modal>

      <Modal
        id="byhandle"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-row justify-between items-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new&nbsp;{isAdmin ? 'admin' : 'viewer'}
            </Typography>
            <IconButton onClick={() => handleClose(isRole)}>
              <MdClose />
            </IconButton>
          </div>
          <Typography>
            Search for members by their Discord name or handle.
          </Typography>
          <Paper
            component="form"
            sx={{
              boxShadow: 'none',
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Selected&nbsp;{isAdmin ? 'admins' : 'viewers'}
          </Typography>
          <div className="bg-[#F5F5F5] rounded-sm w-[425px] h-[80px]"></div>
          <CustomButton
            label="Save"
            classes="flex mt-4 mx-auto bg-[#804EE1] text-white"
            onClick={() => handleClose(isRole)}
          />
        </Box>
      </Modal>
    </Accordion>
  );
}
