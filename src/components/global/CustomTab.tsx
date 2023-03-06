import { ReactElement, SyntheticEvent, useState } from 'react';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box } from '@mui/material';

interface ICustomTab {
  labels: string[];
  content: ReactElement[];
}

function CustomTab({ labels, content }: ICustomTab) {
  const [activeTab, setActiveTab] = useState('1');

  const handleChange = (
    event: SyntheticEvent<Element, globalThis.Event>,
    newValue: string
  ) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ typography: 'body5' }}>
      <TabContext value={activeTab}>
        <TabList onChange={handleChange} aria-label="custom tabs">
          {labels.map((label: string, index: number) => (
            <Tab
              key={index}
              label={label}
              value={`${index + 1}`}
              disabled={`${index + 1}` ? true : false}
            />
          ))}
        </TabList>
        {content.map((con: ReactElement, index: number) => (
          <TabPanel
            key={index}
            value={`${index + 1}`}
            className="shadow-lg rounded-md"
          >
            {con}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default CustomTab;
