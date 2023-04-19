import dynamic from 'next/dynamic';

const icons = {
  check: dynamic(() => import('@@/icons/check.svg')),
  tag: dynamic(() => import('@@/icons/tag.svg')),
} as { [keys: string]: any };

export default function WrapIcon({ children, ...rest }: React.HTMLAttributes<HTMLOrSVGElement>) {
  const Icon = icons[children as string];

  if (Icon) {
    return <Icon {...rest} />;
  }

  return <span {...rest}>{children}</span>;
}
