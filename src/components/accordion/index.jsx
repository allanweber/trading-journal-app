import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useColors } from '../../hooks/useColors';

export const Accordion = ({
  title,
  children,
  fontSize = 18,
  override = false,
}) => {
  const colors = useColors();

  if (override) {
    return <Box>{children}</Box>;
  }

  return (
    <MuiAccordion
      variant="outlined"
      sx={{
        flexGrow: 1,
        backgroundColor: colors.primary[400],
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontSize={fontSize}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};
