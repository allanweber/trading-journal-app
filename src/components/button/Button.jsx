import LoadingButton from '@mui/lab/LoadingButton';

export const Button = ({
  children,
  fullWidth,
  icon,
  variant,
  type = 'submit',
  loading = false,
  ...rest
}) => {
  if (!variant) {
    variant = 'contained';
  }
  return (
    <LoadingButton
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      loading={loading}
      {...(icon && { startIcon: icon })}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
};
