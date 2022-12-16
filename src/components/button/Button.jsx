import LoadingButton from '@mui/lab/LoadingButton';

export const Button = ({
  children,
  fullWidth,
  type = 'submit',
  variant = 'contained',
  loading = false,
  secondary = false,
  ...rest
}) => {
  return (
    <LoadingButton
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      loading={loading}
      {...(secondary && { color: 'secondary' })}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
};
