
import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { getNowPlaying } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import Spinner from "../components/spinner";

import PlayListAddIcon from "../components/cardIcons/playlistAddIcon";
import { useQuery } from "react-query";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};



const NowPlayingMoviesPage: React.FC = () => {

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("now_playing_movies", getNowPlaying);


  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };



  console.log(data?.results);

  if (isLoading) {
    return  <Spinner/>
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if(data?.results){


    console.log(data.results);
    
    const displayedMovies = filterFunction(data.results);

    return (

      <>
      <PageTemplate
        title='Now Playing'
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <PlayListAddIcon {...movie} />
        }}
      
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>

    )
  }




};
export default NowPlayingMoviesPage;
