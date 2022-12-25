import * as React from "react";
import MUIAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button,  Chip, Grid } from "@mui/material";
import { Filters, FilterTypes } from "../types";

const FILTERS = [
  { name: "Status", options: ["Alive", "Dead", "Unknown"] },
  {
    name: "Species",
    options: [
      "Alien",
      "Humanoid",
      "Animal",
      "Human",
      "Poopybutthole",
      "unknown",
      "Mythological Creature",
      "Disease",
    ],
  },
  { name: "Gender", options: ["Male", "Female", "Genderless", "unknown"] },
];

type Props = {
  onFilterValueChanged?: (filter: Filters) => void;
  activeFilters?: Filters;
  clearFilters?: () => void;
};

const FilterAccordion = (props: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const { activeFilters, onFilterValueChanged, clearFilters } = props;
  const handleFilterSelect = (filter: Filters) => {
    onFilterValueChanged?.(filter);
  };
  return (
    <div>
      {FILTERS.map((filter) => (
        <MUIAccordion
          key={filter.name}
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
              <Grid
                key={op}
                container
                height="100%"
                paddingX={2}
                alignItems="start"
                spacing={3}
                direction="column"
              >
                <Grid item>
                  <Chip
                    variant={
                      activeFilters?.[
                        filter.name.toLocaleLowerCase() as FilterTypes
                      ] !== op
                        ? "outlined"
                        : "filled"
                    }
                    onClick={() =>
                      handleFilterSelect({
                        [filter.name.toLocaleLowerCase()]: op,
                      } as Filters)
                    }
                    title={op}
                    label={op}
                  />
                </Grid>
              </Grid>
            ))}
          </AccordionDetails>
        </MUIAccordion>
      ))}
      <Button onClick={clearFilters} variant="text">
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterAccordion;
