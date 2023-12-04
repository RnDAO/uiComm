import { Box, CircularProgress } from '@mui/material';

interface LoadingProps {
  height?: string;
  size?: number | string;
}

function Loading({ height = '10rem', size = 40 }: LoadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height,
      }}
    >
      <CircularProgress color="secondary" size={size} />
    </Box>
  );
}

export default Loading;
