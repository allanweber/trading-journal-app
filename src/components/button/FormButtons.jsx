import Grid from '@mui/material/Grid';
import { Button } from './Button';

export const FormButtons = ({
  loading,
  onCancel,
  submit,
  cancel,
  submitDisabled = false,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Button fullWidth onClick={onCancel} secondary type="button">
          {cancel && cancel}
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button fullWidth loading={loading} disabled={submitDisabled}>
          {submit && submit}
        </Button>
      </Grid>
    </Grid>
  );
};
