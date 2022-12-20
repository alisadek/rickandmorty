import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Maybe } from "../../__generated__/graphql";
import { Chip } from "@mui/material";

type Props = {
  image?: Maybe<string>;
  name?: Maybe<string>;
  species?: Maybe<string>;
  status?: Maybe<string>;
};

type Status = "Alive" | "Dead" | "Unknown";
type TColor =
  | "success"
  | "error"
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | "info";
const statusColor: Record<Status, TColor> = {
  Alive: "success",
  Dead: "error",
  Unknown: "warning",
};

export default function MediaCard(props: Props) {
  const { image, name, species, status } = props;
  return (
    <Card
      sx={{
        width: "390px",
        ":hover": { transform: "scale(1.05)" },
        position: "relative",
        cursor: "pointer",
      }}
    >
      <CardMedia
        sx={{ height: "200px" }}
        component="img"
        height="140"
        src={`${image}` as string}
        alt={name as string}
      />
      <Chip
        sx={{
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
        color={statusColor[status as Status]}
        label={status}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          species: {species}
        </Typography>
      </CardContent>
    </Card>
  );
}
