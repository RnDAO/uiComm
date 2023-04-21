import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { MdClose } from 'react-icons/md';
import { VscSearch } from 'react-icons/vsc';
import InputBase from '@mui/material/InputBase';

interface QuickSearchToolbarProps {
  onChange: (event: any) => void;
  value: string;
}

export default function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
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
        value={props.value}
        onChange={props.onChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search member"
        inputProps={{
          'aria-label': 'search google maps',
        }}
      />
    </Paper>
  );
}
