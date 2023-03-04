import React from 'react';
import CustomTab from '../components/global/CustomTab';
import { defaultLayout } from '../layouts/defaultLayout';

const Statistics = () => (
  <CustomTab labels={['Active members', 'Disengaged members']}>
    <div>daskj</div>
    <div>dasj</div>
  </CustomTab>
);

Statistics.pageLayout = defaultLayout;

export default Statistics;
