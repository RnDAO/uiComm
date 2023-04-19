import clsx from 'clsx';

interface Props {
  level: string,
  title: string
}

export default function DiscordRoleCard({level, title}: Props) {
  return (
    <div className="flex flex-row p-1 w-fit rounded-md border border-solid border-gray-200 gap-2 items-center">
      <div
        className={clsx(
          'rounded-full w-3 h-3',
          level === '1'
            ? 'bg-yellow'
            : level === '2'
            ? 'bg-blue-700'
            : 'bg-red-600'
        )}
      ></div>
      <span>{title}</span>
    </div>
  );
}
