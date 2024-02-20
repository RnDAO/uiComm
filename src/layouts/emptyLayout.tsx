import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const emptyLayout = ({ children }: Props) => {
  return (
    <>
      <div className='w-screen'>
        <main>{children}</main>
      </div>
    </>
  );
};
