import React from 'react';
import TcTitle from '../components/twitter/shared/TcTitle';
import { defaultLayout } from '../layouts/defaultLayout';

function growth() {
  return (
    <div>
      <TcTitle title={'test'} variant="h3" />
    </div>
  );
}

growth.pageLayout = defaultLayout;

export default growth;
