import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Accordion as MuiAccordion,
} from '@mui/material';
import Typography from '@mui/material/Typography';

export const Accordion = ({
  title,
  children,
  fontSize = 18,
  override = false,
}) => {
  if (override) {
    return <Box>{children}</Box>;
  }

  return (
    <MuiAccordion
      variant="outlined"
      sx={{
        flexGrow: 1,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontSize={fontSize}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};
