import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface MyTabsProps {
  labels: string[];
}

const MyTabs: React.FC<MyTabsProps> = ({ labels }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      {labels.map((label) => (
        <Tab key={label} label={label} />
      ))}
    </Tabs>
  );
};

MyTabs.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MyTabs;
