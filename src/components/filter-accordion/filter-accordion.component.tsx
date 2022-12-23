import * as React from "react";
import MUIAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, Chip, Grid } from "@mui/material";

const FILTERS = [
  { name: "Status", options: ["Alive", "Dead", "Unknown"] },
  { name: "Species", options: ["Alive", "Dead", "Unknown"] },
  { name: "Gender", options: ["Alive", "Dead", "Unknown"] },
];

type Props = {
  onFilterValueChanged?: (filter: Record<string, string>) => void;
  activeFilters?: Record<string, string>;
};

const FilterAccordion = (props: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const { activeFilters, onFilterValueChanged } = props;
  const handleFilterSelect = (filter: Record<string, string>) => {
    onFilterValueChanged?.(filter);
  };
  return (
    <div>
      {FILTERS.map((filter) => (
        <MUIAccordion
          expanded={expanded === filter.name}
          onChange={handleChange(filter.name)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              {filter.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {filter.options.map((op) => (
              <Grid container alignItems="center">
                <Chip
                  variant={
                    !activeFilters?.[filter.name] ? "outlined" : "filled"
                  }
                  onClick={() => handleFilterSelect({ [filter.name]: op })}
                  title={op}
                  label={op}
                />
              </Grid>
            ))}
          </AccordionDetails>
        </MUIAccordion>
      ))}
    </div>
  );
};

export default FilterAccordion;
