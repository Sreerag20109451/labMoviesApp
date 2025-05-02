import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // assuming you're using React Router
import { CircularProgress, Container, Alert } from "@mui/material";
import { PeopleDetails, PeopleProps } from "../types/interfaces";
import { useQuery } from "react-query";
import { getPerson } from "../api/tmdb-api";
import ActorDetails from "../components/actorDetails";


const ActorDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery<PeopleDetails, Error>(
    ["actor", id],
    ()=> getPerson(id||"")
  );



  if (isLoading) return <CircularProgress sx={{ mt: 4, display: "block", mx: "auto" }} />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  if(data){

    return (

        <Container sx={{ mt: 4 }}>
            <ActorDetails {...data} ></ActorDetails>
        </Container>
      );
  }

  
};

export default ActorDetailsPage;
