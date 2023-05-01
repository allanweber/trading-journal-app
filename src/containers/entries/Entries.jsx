import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { ClosedEntries } from './ClosedEntries';
import { OpenEntries } from './OpenEntries';

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
        <Box sx={{ pt: 1 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const Entries = ({ journal }) => {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          aria-label="entries tabs"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label={<Typography fontSize="1rem">Closed</Typography>}></Tab>
          <Tab label={<Typography fontSize="1rem">Open</Typography>} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ClosedEntries journal={journal} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OpenEntries journal={journal} />
      </TabPanel>
    </Box>
  );
};
