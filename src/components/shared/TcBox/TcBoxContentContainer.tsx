/**
 * TcBoxContentContainer Component.
 *
 * A generic container for content.
 *
 * Props:
 * - children: The content that will be displayed inside this container.
 *
 * Example:
 * ```jsx
 * <TcBoxContentContainer>
 *   <p>This is some content inside the container.</p>
 * </TcBoxContentContainer>
 * ```
 */

import React from 'react';

interface ITcBoxContentContainer {
  children: JSX.Element | React.ReactElement;
}

function TcBoxContentContainer({ children }: ITcBoxContentContainer) {
  return <div>{children}</div>;
}

export default TcBoxContentContainer;
