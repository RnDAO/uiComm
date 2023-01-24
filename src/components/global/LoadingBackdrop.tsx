import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop() {
  return (
    <Backdrop
      open={true}
      sx={{ color: '#804EE1', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" size={"80px"} />
    </Backdrop>
  );
}
