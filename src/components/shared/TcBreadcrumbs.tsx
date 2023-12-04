/**
 * `TcBreadcrumbs` Component
 *
 * This component is used for displaying a breadcrumb navigation interface. It is built
 * using Material-UI's `Breadcrumbs` and a custom `TcLink` component for navigation.
 *
 * Props:
 * - `items`: An array of `BreadcrumbItem` objects. Each `BreadcrumbItem` should have:
 *   - `label` (string): The text displayed for the breadcrumb link.
 *   - `path` (string): The navigation path the breadcrumb link points to.
 *
 * Usage:
 * <TcBreadcrumbs
 *   items={[
 *     { label: 'Home', path: '/' },
 *     { label: 'About', path: '/about' },
 *     { label: 'Contact', path: '/contact' }
 *   ]}
 * />
 *
 * This component renders breadcrumbs for the provided `items` array. Each item in the array
 * represents a single breadcrumb link. The component uses flexbox for alignment and spacing,
 * and includes a hover effect on the links for better user interaction.
 */

import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useRouter } from 'next/router';
import TcLink from './TcLink';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

interface BreadcrumbItem {
  label: string;
  path: string;
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
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item) => (
        <div
          className="flex items-center text-gray-500 hover:text-black ease-in"
          key={item.label}
        >
          <MdOutlineKeyboardArrowLeft size={20} />
          <TcLink
            color="inherit"
            style={{ cursor: 'pointer' }}
            to={item.path}
            onClick={(event) => handleClick(event, item.path)}
          >
            {item.label}
          </TcLink>
        </div>
      ))}
    </Breadcrumbs>
  );
}

export default TcBreadcrumbs;
