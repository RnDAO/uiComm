import React from 'react';

/**
 * Interface defining the properties for TcIconContainer.
 * @interface ITcIconContainerProps
 */
interface ITcIconContainerProps {
  /**
   * Children elements to be rendered inside the container.
   * This should be a single React element, typically an icon or a small component.
   * @type {React.ReactElement}
   */
  children: React.ReactElement;
}

/**
 * A container component designed to display its children in a circular, centered fashion.
 * Ideal for icons or small elements.
 *
 * @param {ITcIconContainerProps} props - The properties passed to the component.
 * @returns {JSX.Element} A div element with applied styling and containing the children.
 */
function TcIconContainer({ children }: ITcIconContainerProps): JSX.Element {
  return (
    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-100'>
      {children}
    </div>
  );
}

export default TcIconContainer;
