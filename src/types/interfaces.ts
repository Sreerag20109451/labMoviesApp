export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    genre_ids?: number[];
  }

  export interface BaseMovieListProps {
    movies: BaseMovieProps[];
    action: (m: BaseMovieProps) => React.ReactNode;
  }
  

  export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[],
    production_countries : {
      iso_3166_1 : string,
      name : string
    }[]
  }


  export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  
  export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];
  }
  export type FilterOption = "title" | "genre";

  export interface MovieListPageTemplateProps extends BaseMovieListProps {
    title: string;
  }
  
  
  export interface Review{
    id: string;
    content: string
    author: string
  }

  export interface GenreData {
    genres: {
      id: string;
      name: string
    }[];
  }
  
  export interface DiscoverMovies {
    page: number;	
    total_pages: number;
    total_results: number;
    results: BaseMovieProps[];
  }


    export interface Review {
      author: string,
      content: string,
      agree: boolean,
      rating: number,
      movieId: number,
    }



 export interface SignInType {
      email: string;
      password: string;
  };
    



// Actors

  export interface PeopleProps{

      adult?: boolean; 
      also_known_as: string[];
      biography: string;
      birthday: string;
      deathday: string;
      gender?: number; 
      homepage: string;
      id?: number;
      imdb_id: string;
      known_for_department: string;
      name: string;
      place_of_birth: string;
      popularity?: number; 
      profile_path: string;


    }
    

    export interface ActorListProps {

      actors : PeopleProps[]
    }


  export interface ActorListTemplateProps{

      actors: PeopleProps[],
      title : string
  }


  export interface DiscoverPeople {
    page: number;	
    total_pages: number;
    total_results: number;
    results: PeopleProps[];
  }

  export interface PeopleProfile {
    aspect_ratio?: number; 
    height?: number;      
    iso_639_1: string;
    file_path: string;
    vote_average?: number; 
    vote_count?: number;  
    width?: number;     
  }
  
  export interface PeopleProfileForImage {
    id?: number; // Defaults to 0
    profiles: PeopleProfile[];
  }
  

  export interface PeopleDetails {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string | null;
  }
  