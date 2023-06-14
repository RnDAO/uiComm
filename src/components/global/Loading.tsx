import { Box, CircularProgress } from '@mui/material';

interface LoadingProps {
  height: string;
}

function Loading({ height }: LoadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height,
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}

Loading.defaultProps = {
  height: '10rem',
};

export default Loading;
