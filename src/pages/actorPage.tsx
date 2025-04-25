import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies, getPeopleList } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { BaseMovieProps, DiscoverMovies, DiscoverPeople } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
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
    };

}
 
export default ActorsPage;
