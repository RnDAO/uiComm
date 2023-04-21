import { MdClose } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';

interface Props {
  avatar: string;
  name: string;
  isOwner: boolean;
  length: number;
}

export default function UserHandleCard({
  avatar,
  name,
  isOwner,
  length,
}: Props) {
  return (
    <div className="flex flex-row p-1 w-fit rounded-md border border-solid border-gray-200 gap-2 items-center text-sm">
      <img src={avatar} width="15" height="15" alt="avatar"></img>
      <span>{name}</span>
      {isOwner && length !== 1 || !isOwner && (
        <IconButton onClick={() => console.log('close')}>
          <MdClose className='w-[15px] h-[15px]' />
        </IconButton>
      )}
    </div>
  );
}
