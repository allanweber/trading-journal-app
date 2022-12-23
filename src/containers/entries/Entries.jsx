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

export const Entries = ({ journal }) => {
  const [value, setValue] = useState(0);
  const count = useGetOpenTradesCount(journal.id).data.trades;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('load');

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
          <Tab label={<Typography fontSize="1rem">Closed</Typography>}></Tab>
          <Tab
            label={
              <Badge
                badgeContent={count > 0 ? count : 0}
                max={99}
                showZero={false}
                color="success"
              >
                <Typography fontSize="1rem">Open</Typography>
              </Badge>
            }
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
