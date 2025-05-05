import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import RemoveFromFavourites from "../components/cardIcons/removeFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import SortSelector from "../components/sortUi";
import { sortMovies } from "../util";
import { MovieDetailsProps, MovieSortKey } from "../types/interfaces";


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

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);
  const [sortKey, setSortKey] = useState<MovieSortKey>("title");

  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    }))
  );

  const isLoading = favouriteMovieQueries.find((m) => m.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries
  .map((q) => q.data)
  .filter((movie): movie is MovieDetailsProps => movie !== undefined);

const displayedMovies = sortMovies(filterFunction(allFavourites), sortKey);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => (
          <>
            <RemoveFromFavourites {...movie} />
            <WriteReview {...movie} />
          </>
        )}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <SortSelector sortKey={sortKey} onChange={setSortKey} />
    </>
  );
};

export default FavouriteMoviesPage;
