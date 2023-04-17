import CustomButton from '../../global/CustomButton';

interface ByHandleProps {
  title: string;

}
export default function ByHandle ({title}: ByHandleProps) {
  return (
    <div className="flex flex-row w-[49%] items-center px-2 py-1.5 justify-between rounded-lg border border-gray-200 gap-10">
          <p className="font-bold text-base">{title}</p>
          <CustomButton
          label='+ Add admin'
          classes='border-solid border  py-[6px] md:w-fit text-xs text-black'
          />
        </div>
  )
}