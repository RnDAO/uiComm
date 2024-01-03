import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import TcLink from './TcLink';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { MdChevronRight } from 'react-icons/md';
import TcText from './TcText';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface TcBreadcrumbsProps {
  items: BreadcrumbItem[];
}

function TcBreadcrumbs({ items }: TcBreadcrumbsProps) {
  const router = useRouter();

  const handleClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    path: string
  ) => {
    event.preventDefault();
    router.push(path);
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<MdChevronRight fontSize="medium" />}
    >
      {items.map((item, index) => (
        <TcLink
          key={item.label}
          href={item.path || '#'}
          onClick={(event) => handleClick(event, item.path || '')}
          underline={'none'}
          className={`${
            index === items.length - 1
              ? 'pointer-events-none text-black'
              : 'text-gray-500'
          }`}
          to={item.path || '#'}
        >
          <TcText text={item.label} variant="body2" />
        </TcLink>
      ))}
    </Breadcrumbs>
  );
}

export default TcBreadcrumbs;
