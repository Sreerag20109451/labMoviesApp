import truncate from "lodash/truncate";
import { BaseMovieProps, MovieDetailsProps, MovieSortKey } from "./types/interfaces";


type SortableMovies = BaseMovieProps[] | MovieDetailsProps[];


export const excerpt = (string: string) => {
    return truncate(string, {
        length: 400, 
        separator: /,?\.* +/,
}
)
}



export const sortMovies = (movies: SortableMovies , key: MovieSortKey): SortableMovies => {
    return [...movies].sort((a, b) => {
      switch (key) {
        case "title":
          return a.title.localeCompare(b.title);
        case "release_date":
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        case "vote_average":
          return b.vote_average - a.vote_average;
        case "popularity":
          return b.popularity - a.popularity;
        case "runtime":
          return b.runtime - a.runtime;
        case "revenue":
          return b.revenue - a.revenue;
        default:
          return 0;
      }
    });
  };
