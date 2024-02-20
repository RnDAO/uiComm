/**
 * TcBoxContainer Component.
 *
 * This is a container component that combines a title and content area.
 *
 * Props:
 * - titleContainerChildren: Element that will be rendered in the title container.
 * - contentContainerChildren: Element that will be rendered in the content container.
 *
 * Example:
 * ```jsx
 * <TcBoxContainer
 *   titleContainerChildren={<h1>Title</h1>}
 *   contentContainerChildren={<p>Some content here.</p>}
 * />
 * ```
 */

import { Box, BoxProps } from '@mui/material';

import TcBoxContentContainer from './TcBoxContentContainer';
import TcBoxTitleContainer from './TcBoxTitleContainer';

interface ITcBoxContainer extends Omit<BoxProps, 'children'> {
  titleContainerChildren?: JSX.Element | React.ReactElement;
  contentContainerChildren?: JSX.Element | React.ReactElement;
}

function TcBoxContainer({
  titleContainerChildren,
  contentContainerChildren,
  ...props
}: ITcBoxContainer) {
  return (
    <Box className='overflow-hidden rounded-xl shadow-lg' {...props}>
      {titleContainerChildren && (
        <TcBoxTitleContainer children={titleContainerChildren} />
      )}
      {contentContainerChildren && (
        <TcBoxContentContainer children={contentContainerChildren} />
      )}
    </Box>
  );
}

export default TcBoxContainer;
