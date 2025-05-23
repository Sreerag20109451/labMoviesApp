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
  }
    



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

  export interface  LoginResp {

      message: string,
      token: string,
      username: string
  }
  

  export interface ReviewAdd{

    movieId: number
    content : String,
    rating : 1 | 2| 3| 4| 5,
    
  }

  export interface BackendReview {

    content: string;
    movieId: number;
    reviewDate: string;
    reviewId: number;
    reviewerId: string;
    rating: number
  }

export interface BackendReviews {

  reviews: BackendReview[]
}

export interface TranslatedReview {

  translatedText :  string
}

export interface BackendFavouriteMovie {
  userId: string;        
  movieId: number;       
  movieTitle: string;    
  poster_path: string;   
}

export type MovieSortKey = "title" | "release_date" | "vote_average" | "popularity" | "runtime" | "revenue";


 export interface Cast {
  name: string;
  role: string;
  description: string;
}


export interface FantasyMovie {
  userId : string
  title: string;
  overview: string;
  genre: string;
  releaseDate: string;
  runtime: string;
  productionCompany: string;
  poster: File | null;
  casts: Cast[];  
}



export interface SearchCriteria {
  title: string;
  language: string;
  runtime: string
  voteAverage: string  
}