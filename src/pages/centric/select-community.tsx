import React from 'react';

import TcSelectCommunity from '../../components/centric/selectCommunity/TcSelectCommunity';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import centricLayout from '../../layouts/centricLayout';

function SelectCommunity() {
  return (
    <>
      <TcBoxContainer
        data-testid='tcbox-container'
        bgcolor='white'
        className='rounded p-4 py-6 md:min-h-[43.75rem] md:p-12'
        contentContainerChildren={<TcSelectCommunity />}
      />
    </>
  );
}

SelectCommunity.pageLayout = centricLayout;

export default SelectCommunity;
