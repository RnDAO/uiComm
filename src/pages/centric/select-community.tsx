import React from 'react';
import centricLayout from '../../layouts/centricLayout';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcSelectCommunity from '../../components/centric/selectCommunity/TcSelectCommunity';

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
