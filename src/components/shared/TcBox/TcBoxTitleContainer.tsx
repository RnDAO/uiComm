/**
 * TcBoxTitleContainer Component.
 *
 * A container dedicated for displaying titles.
 *
 * Props:
 * - children: The content that needs to be displayed inside this container.
 * - customClasses (optional): Additional classnames that can be added to the container for custom styling.
 *
 * Example:
 * ```jsx
 * <TcBoxTitleContainer customClasses="custom-class">
 *   <h1>Title Goes Here</h1>
 * </TcBoxTitleContainer>
 * ```
 */

import React from 'react';
import clsx from 'clsx';

interface ITcBoxTitleContainer {
  children: JSX.Element;
  customClasses?: string;
}

function TcBoxTitleContainer({
  children,
  customClasses,
}: ITcBoxTitleContainer) {
  return <div className={clsx(`${customClasses}`)}>{children}</div>;
}

export default TcBoxTitleContainer;
