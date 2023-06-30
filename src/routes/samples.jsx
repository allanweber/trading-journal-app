import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import {
  Box,
  DialogContentText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Accordion } from '../components/accordion';
import { Alert } from '../components/alert';
import { Button } from '../components/button/Button';
import { FormButtons } from '../components/button/FormButtons';
import { ColorPicker } from '../components/color-picker';
import { ColorfulCurrency } from '../components/colorful-currency';
import { ColorfulPercentage } from '../components/colorful-percentage';
import { CurrencySelect } from '../components/currency-select';
import { DateTime } from '../components/date-time';
import { DateTimeDisplay } from '../components/datetime-display';
import { useConfirmationModal } from '../components/dialog/Confirmation';
import { Dialog } from '../components/dialog/Dialog';
import { Direction } from '../components/direction/Direction';
import { DirectionDisplay } from '../components/direction/DirectionDisplay';
import { Dropdown } from '../components/dropdown';
import { Duration } from '../components/duration';
import { EntrySelect } from '../components/entry-select';
import { Feedback } from '../components/feedback';
import { GraphSelect } from '../components/graph-select';
import { Header } from '../components/header';
import { LoadingPage } from '../components/loading-page';
import { NumberInput } from '../components/number-input';
import { Search } from '../components/search';
import { StatusCard } from '../components/status-card';
import { StrategySelect } from '../components/strategy-select';
import { ThemeChange } from '../components/theme-change';
import { TimeGroup } from '../components/time-group';
import { TimeSelect } from '../components/time-select';
import { useToastr } from '../components/toastr/Toastr';
import { WinLose } from '../components/win-lose';

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

//
//
//TODO: Missing components:
// - DateRange
// - Multi Select Dropdown (Strategies)
// - Uploader dummy
// - Nav Bar dummy
// - User menu with avatar
// - Notification menu
// - Journal Select and Menu
// - Table(s)
// - Tabs

const Fragment = ({ children }) => {
  return (
    <Box margin={1}>
      <Grid container spacing={1}>
        {children}
      </Grid>
    </Box>
  );
};

const DialogContent = () => {
  return (
    <Box>
      <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText>
      <TextField
        autoFocus
        id="name"
        label="Email Address"
        type="email"
        fullWidth
      />
    </Box>
  );
};

export const Samples = () => {
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const confirmation = useConfirmationModal();
  const toastr = useToastr();

  const openDialog = () => {
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(false);
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  const confirmationClick = useCallback(
    async (entry) => {
      const result = await confirmation.showConfirmation(
        'Confirm Deletion',
        <div>
          <Typography fontSize={20}>
            Are you sure do you want to remove this {entry.type}?
          </Typography>
          <Typography fontSize={14}>All data will be removed</Typography>
          <Typography fontSize={14}>This action can not be undone</Typography>
        </div>
      );
      if (result) {
        toastr.showToastr('Confirmed');
      } else {
        toastr.showToastr('Canceled');
      }
    },
    [confirmation, toastr]
  );

  const toastrClick = () => {
    toastr.showToastr('Toastr message 1');
    toastr.showToastr('Toastr message 2');
    toastr.showToastr('Toastr message 3');
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ThemeChange />
      </Box>
      <Grid container component="main" spacing={2}>
        <Grid container item xs={12} md={4} flexDirection="column">
          <Fragment>
            <Grid item md={12} xs={12}>
              <Typography variant="h1">Typography H1</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography variant="h3">Typography H3</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="h5">Typography H5</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="body1">Typography body1</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="body2">Typography body2</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="subtitle1">Typography subtitle1</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography variant="subtitle2">Typography subtitle2</Typography>
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <ColorfulCurrency value={-1000} currency="REAL" />
            </Grid>
            <Grid item md={6} xs={12}>
              <ColorfulCurrency value={1000} currency="DOLLAR" />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <ColorfulPercentage value={-0.15} />
            </Grid>
            <Grid item md={6} xs={12}>
              <ColorfulPercentage value={0.56} />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <CurrencySelect label="Currency" fullWidth value="EURO" />
            </Grid>
            <Grid item md={6} xs={12}>
              <CurrencySelect
                label="Currency"
                fullWidth
                error={true}
                helperText="currency required"
                value="DOLLAR"
              />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={4} xs={12}>
              <DateTime
                label="Date and time"
                fullWidth
                value="2019-12-31 11:57"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <DateTime
                label="Date and time"
                fullWidth
                error={true}
                helperText="Date and time required"
                value="2019-12-31 11:57"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <DateTime
                label="Date"
                fullWidth
                dateOnly
                value="2019-12-31 11:57"
              />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={12} xs={12}>
              <DateTimeDisplay date="2019-12-31 11:57" />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <Dropdown
                fullWidth
                value={'1'}
                items={[
                  { value: '1', label: 'value 1' },
                  { value: '2', label: 'value 2' },
                  { value: '3', label: 'value 3' },
                ]}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Dropdown
                fullWidth
                items={[{ value: '1', label: 'value 1' }]}
                error={true}
                helperText="Value required"
              />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <GraphSelect fullWidth value="RENKO" />
            </Grid>
            <Grid item md={6} xs={12}>
              <GraphSelect
                fullWidth
                value="RENKO"
                error={true}
                helperText="Value required"
              />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <StrategySelect />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={3} xs={12}>
              <NumberInput label="Number" fullWidth value={1} />
            </Grid>
            <Grid item md={3} xs={12}>
              <NumberInput label="Number" fullWidth value={1} scale={2} />
            </Grid>
            <Grid item md={3} xs={12}>
              <NumberInput label="Number" fullWidth value={0} zeroIsNull />
            </Grid>
            <Grid item md={3} xs={12}>
              <NumberInput
                label="Number"
                fullWidth
                value={1}
                error={true}
                helperText="Value Invalid"
              />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={12} xs={12}>
              <Search placeholder="Search something" />
            </Grid>
          </Fragment>
        </Grid>
        <Grid container item xs={12} md={4} flexDirection="column">
          <Fragment>
            <Grid item md={12} xs={12}>
              <Accordion title="Accordion">
                <Typography variant="body1">Accordion data</Typography>
              </Accordion>
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={4} xs={6}>
              <Button>Primary</Button>
            </Grid>
            <Grid item md={4} xs={6}>
              <Button loading={true}>Primary</Button>
            </Grid>
            <Grid item md={4} xs={6}>
              <Button variant="outlined">Outlined</Button>
            </Grid>
            <Grid item md={4} xs={6}>
              <Button variant="outlined" loading={true}>
                Outlined
              </Button>
            </Grid>
            <Grid item md={4} xs={6}>
              <Button secondary>Secondary</Button>
            </Grid>
            <Grid item md={4} xs={6}>
              <Button secondary loading={true}>
                Secondary
              </Button>
            </Grid>
            <Grid item md={4} xs={6}>
              <Button icon={<DownloadOutlinedIcon />}>Primary Icon</Button>
            </Grid>
            <Grid item md={4} xs={6}>
              <Button variant="outlined" icon={<DownloadOutlinedIcon />}>
                Outlined Icon
              </Button>
            </Grid>
            <Grid item md={4} xs={6}>
              <Button secondary icon={<DownloadOutlinedIcon />}>
                Secondary Icon
              </Button>
            </Grid>
          </Fragment>

          <Fragment>
            <Grid item md={6} xs={12}>
              <FormButtons submit="Save" cancel="Cancel" />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormButtons submit="Save" cancel="Cancel" loading={true} />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={12} xs={12}>
              <ColorPicker />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <Button onClick={openDialog}>Open Dialog</Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button onClick={confirmationClick}>Open Confirmation</Button>
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={4} xs={12}>
              <Button onClick={toastrClick}>Open Toastr</Button>
            </Grid>
            <Grid item md={8} xs={12}>
              <Button onClick={() => setLoading(true)}>
                Open Page loading for 2 seconds
              </Button>
              <LoadingPage loading={loading} />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <Direction />
            </Grid>
            <Grid item md={6} xs={12}>
              <Direction size="small" value="SHORT" />
            </Grid>
            <Grid item md={6} xs={12}>
              <Direction size="large" />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <DirectionDisplay direction="LONG" />
            </Grid>
            <Grid item md={6} xs={12}>
              <DirectionDisplay direction="SHORT" />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <WinLose />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <StatusCard
                title="Some Status"
                value="Text value"
                percentage={0.13}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StatusCard title="Some Status" value={2150.33} currency="EURO" />
            </Grid>
            <Grid item md={6} xs={12}>
              <StatusCard
                title="Some Status"
                value={-2150.33}
                currency="DOLLAR"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <StatusCard
                title="Some Status"
                value={350.33}
                icon={<AccountBalanceWalletOutlinedIcon />}
                percentage={-0.13}
                currency="REAL"
              />
            </Grid>
          </Fragment>
        </Grid>
        <Grid container item xs={12} md={4} flexDirection="column">
          <Fragment>
            <Grid item md={4} xs={12}>
              <Alert show={true}> Plain</Alert>
            </Grid>
            <Grid item md={4} xs={12}>
              <Alert show={true} severity="error">
                Error
              </Alert>
            </Grid>
            <Grid item md={4} xs={12}>
              <Alert show={true} severity="info">
                Info
              </Alert>
            </Grid>
            <Grid item md={4} xs={12}>
              <Alert show={true} severity="success">
                Success
              </Alert>
            </Grid>
            <Grid item md={4} xs={12}>
              <Alert show={true} severity="warning">
                Warning
              </Alert>
            </Grid>
          </Fragment>

          <Fragment>
            <Grid item md={2} xs={2}>
              <Duration start="2023-01-01 17:00:00" end="2023-01-01 17:08:00" />
            </Grid>
            <Grid item md={2} xs={2}>
              <Duration start="2023-01-01 17:00:00" end="2023-01-01 17:00:40" />
            </Grid>
            <Grid item md={2} xs={2}>
              <Duration start="2023-01-01 17:00:00" end="2023-01-02 17:08:00" />
            </Grid>
            <Grid item md={2} xs={2}>
              <Duration start="2023-01-01 17:00:00" end="2023-01-08 17:08:00" />
            </Grid>
            <Grid item md={2} xs={2}>
              <Duration start="2023-01-01 17:00:00" end="2023-01-25 17:08:00" />
            </Grid>
            <Grid item md={2} xs={2}>
              <Duration start="2023-01-01" end="2023-02-05" />
            </Grid>
            <Grid item md={2} xs={2}>
              <Duration start="2023-01-01" end="2023-03-05" />
            </Grid>
            <Grid item md={2} xs={2}>
              <Duration start="2022-01-01" end="2023-01-05" />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <TimeGroup />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={6} xs={12}>
              <TimeSelect />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={12} xs={12}>
              <EntrySelect />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={12} xs={12}>
              <Feedback
                header="Feedback"
                subtitle="This is a feedback"
                icon={<ExtensionOutlinedIcon />}
                to="/"
                toLabel="Go to home"
              />
            </Grid>
          </Fragment>
          <Fragment>
            <Grid item md={4} xs={6}>
              <Header title="Only Title" />
            </Grid>
            <Grid item md={4} xs={6}>
              <Header subtitle="Only subtitle" />
            </Grid>
            <Grid item md={4} xs={6}>
              <Header title="Header" subtitle=" and subtitle" />
            </Grid>
          </Fragment>
        </Grid>
      </Grid>
      <Dialog
        open={dialog}
        onClose={closeDialog}
        title="Dialog Title"
        icon={<ExtensionOutlinedIcon />}
      >
        <DialogContent />
      </Dialog>
    </div>
  );
};
