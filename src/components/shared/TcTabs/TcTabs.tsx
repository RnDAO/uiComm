import React from 'react';
import { Tabs, TabsProps } from '@mui/material';

interface ITcTabsProps extends TabsProps {
  children: React.ReactElement | React.ReactElement[];
}

/**
 * `TcTabs` is a functional React component that renders Material-UI's `Tabs` component
 * along with any child components passed to it. This component allows for the standard
 * functionality of MUI's `Tabs` while also enabling the insertion of `Tab` components
 * or other custom elements as children.
 *
 * @param {ITcTabsProps} props - Includes standard properties of MUI's `Tabs` component
 * and any additional props defined in `ITcTabsProps`. The `children` prop is explicitly
 * typed to accept either a single React element or an array of React elements, which are
 * typically `Tab` components.
 *
 * @returns {React.ReactElement} - A `Tabs` component from Material-UI, rendering the passed
 * children within.
 */
function TcTabs({ children, ...props }: ITcTabsProps): React.ReactElement {
  return <Tabs {...props}>{children}</Tabs>;
}

export default TcTabs;
