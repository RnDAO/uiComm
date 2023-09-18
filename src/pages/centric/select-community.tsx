import React from 'react';
import centricLayout from '../../layouts/centricLayout';
import TcBoxContainer from '../../components/shared/TcBox/TcBoxContainer';
import TcSelectCommunity from '../../components/centric/selectCommunity/TcSelectCommunity';

function SelectCommunity() {
  return (
    <>
      <TcBoxContainer
        bgcolor="white"
        className="rounded p-12 min-h-[43.75rem]"
        contentContainerChildren={<TcSelectCommunity />}
      />
    </>
  );
}

SelectCommunity.pageLayout = centricLayout;

export default SelectCommunity;
