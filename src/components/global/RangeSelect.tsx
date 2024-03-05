type Props = {
  className?: string;
  options: optionItem[];
  icon: JSX.Element;
  active: number | string;
  onClick: (value: number) => void;
};

type optionItem = {
  title: string;
  value: number;
};

const RangeSelect = ({ options, icon, onClick, active }: Props) => {
  return (
    <>
      <div className='rounded-md bg-gray-background px-3'>
        <ul className='text-light-gray flex flex-row items-center py-1'>
          <div className='mr-3'>{icon}</div>
          {options.length > 0
            ? options.map((el) => (
                <li
                  onClick={(e) => {
                    onClick(el.value);
                  }}
                  key={el.value}
                  className={
                    active === el.value
                      ? 'text-light-gray cursor-pointer whitespace-nowrap rounded-md bg-white py-1 px-2 text-sm hover:bg-lite md:px-1.5'
                      : 'text-light-gray cursor-pointer whitespace-nowrap rounded-md py-1 px-3 text-sm hover:bg-lite md:px-1.5'
                  }
                >
                  <div>{el.title}</div>
                </li>
              ))
            : ''}
        </ul>
      </div>
    </>
  );
};

export default RangeSelect;
