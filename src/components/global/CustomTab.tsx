import { ReactElement, SyntheticEvent, useState } from 'react';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box } from '@mui/material';

interface ICustomTab {
  activeTab: string;
  onTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  labels: string[];
  content: ReactElement[];
  tabWidth?: string;
}

function CustomTab({
  activeTab,
  onTabChange,
  labels,
  content,
  tabWidth,
}: ICustomTab) {
  return (
    <>
      <TabContext value={activeTab}>
        <TabList
          onChange={onTabChange}
          aria-label="custom tabs"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            '@media (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            },
          }}
        >
          {labels.map((label: string, index: number) => (
            <Tab
              key={index}
              label={label}
              value={`${index + 1}`}
              sx={{
                width: tabWidth ? tabWidth : '214px',
                height: '40px',
                '@media (max-width: 600px)': {
                  width: '50%',
                  padding: '0',
                },
              }}
            />
          ))}
        </TabList>
        {content.map((con: ReactElement, index: number) => (
          <TabPanel
            sx={{ marginTop: 0, padding: 0 }}
            key={index}
            value={`${index + 1}`}
          >
            {con}
          </TabPanel>
        ))}
      </TabContext>
    </>
  );
}

export default CustomTab;
