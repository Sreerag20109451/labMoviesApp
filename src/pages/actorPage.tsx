import React from "react";
import { getPeopleList } from "../api/tmdb-api";


import { DiscoverPeople } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import ActorListTemplate from "../components/actorTemplateList";

const ActorsPage: React.FC = () => {


  const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>("discoverPeople", getPeopleList);


  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

if(data){

    
    const actors = data ? data.results : [];
    return (
        <>
          <ActorListTemplate
            title="Discover Actors"
            actors={actors}
          />
        </>
      );
    }

}
 
export default ActorsPage;
