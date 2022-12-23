import { Badge, Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { useGetOpenTradesCount } from '../../services/EntryQueries';
import { ClosedEntries } from './ClosedEntries';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tab"
      hidden={value !== index}
      id={`entries-tabpanel-${index}`}
      aria-labelledby={`entries-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `entries-tab-${index}`,
    'aria-controls': `entries-tabpanel-${index}`,
  };
}

export const Entries = ({ journal }) => {
  const [value, setValue] = useState(0);
  const { data: openCount, isSuccess } = useGetOpenTradesCount(journal.id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="entries tabs"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab
            label={<Typography fontSize="1rem">Closed</Typography>}
            {...a11yProps(0)}
          ></Tab>
          <Tab
            label={
              <Badge
                badgeContent={
                  isSuccess && openCount.trades > 0 ? openCount.trades : 0
                }
                max={99}
                showZero={false}
                color="success"
              >
                <Typography fontSize="1rem">Open</Typography>
              </Badge>
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ClosedEntries journal={journal} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
};
