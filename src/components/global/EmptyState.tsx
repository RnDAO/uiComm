import { useRouter } from 'next/router';

import TcButton from '../shared/TcButton';

type IProps = {
  image: JSX.Element;
  title?: string;
  description?: string;
  customButtonLabel?: string;
};

export default function EmptyState({
  image,
  title= 'Almost there!',
  description = "To get an overview of your member's insights, community health, and more, connect your community.",
  customButtonLabel= 'Connect your community',
}: IProps) {
  const router = useRouter();
  return (
    <div className='mx-auto mt-[4rem] flex flex-col justify-center space-y-4 p-8  text-center md:w-2/3 md:p-0'>
      <div className='mx-auto'>{image}</div>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <p className='mx-auto pb-1 text-sm md:w-5/12'>{description}</p>
      <TcButton
        text={customButtonLabel}
        variant='contained'
        onClick={() => {
          router.push('/community-settings');
        }}
        className='mx-auto py-2 md:w-2/5'
      />
    </div>
  );
}