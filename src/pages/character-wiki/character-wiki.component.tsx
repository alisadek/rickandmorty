import React, { useMemo } from "react";

import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../../queries.graphql";
import { Character } from "../../__generated__/graphql";
import LoadingCard from "../../components/card/card-loading.component";

type Props = {};

const CharacterWiki = (props: Props) => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<{ character: Character }>(
    GET_CHARACTER,
    {
      variables: { id },
    }
  );

  const characterInfo = useMemo(() => {
    const value = data?.character;
    return {
      Name: value?.name,
      Status: value?.status,
      Species: value?.species,
      Type: value?.type,
      Gender: value?.gender,
      Location: value?.location?.name,
      Origin: value?.origin?.name,
    };
  }, [data]);
  if (error) return <p>{error.message}</p>;
  return (
    <Grid
      container
      xs={12}
      padding={5}
      alignItems="center"
      height="90vh"
      justifyContent="center"
    >
      {loading ? (
        <LoadingCard />
      ) : (
        <Grid
          container
          item
          direction="column"
          justifyContent="center"
          alignItems="center"
          xs={12}
          lg={4}
          md={6}
        >
          <Card
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography sx={{ height: "20%" }} variant="h6" component="div">
              {characterInfo.Name}
            </Typography>
            <CardMedia
              sx={{ width: "60%" }}
              src={data?.character.image as string}
              component="img"
            />
            <CardContent sx={{ width: "70%", height: "50%" }}>
              <Grid
                // minHeight="100%"
                container
                // flexGrow={2.5}
                item
                xs={12}
                direction="column"
                padding={3}
              >
                {data &&
                  Object.entries(characterInfo).map(([key, value]) => (
                    <Grid
                      container
                      item
                      xs={12}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6">{key}</Typography>
                      <Typography
                        sx={{ textAlign: "start", width: "60%" }}
                        component="div"
                        variant="body1"
                      >
                        {value}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default CharacterWiki;
