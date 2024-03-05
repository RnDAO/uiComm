import { useRouter } from 'next/router';
import CustomButton from './CustomButton';

type IProps = {
  image: JSX.Element;
  title: string;
  description: string;
  customButtonLabel: string;
};

export default function EmptyState({
  image,
  title,
  description,
  customButtonLabel,
}: IProps) {
  const router = useRouter();
  return (
    <div className="text-center flex flex-col justify-center p-8 md:p-0 md:w-2/3  mx-auto space-y-4 mt-[4rem]">
      <div className="mx-auto">{image}</div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm md:w-5/12 mx-auto pb-1">{description}</p>
      <CustomButton
        label={customButtonLabel}
        classes="bg-secondary text-white mx-auto"
        onClick={() => {
          router.push('/community-settings');
        }}
      />
    </div>
  );
}

EmptyState.defaultProps = {
  title: 'Almost there!',
  description:
    "To get an overview of your member's insights, community health, and more, connect your community.",
  customButtonLabel: 'Connect your community',
};
