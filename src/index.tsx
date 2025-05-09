import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviePage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import { SessionProvider } from "./contexts/sessionContext";
import SignInPage from "./pages/loginPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import NowPlayingMoviesPage from "./pages/nowplayingMoviesPage";
import ActorsPage from "./pages/actorPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import { FantasyPage } from "./pages/fantasyPage";
import FantasyMoviePage from "./pages/fantasyMoviePage";
import { FantasyProvider } from "./contexts/fantasyContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SessionProvider>
          <SiteHeader />
          <MoviesContextProvider>
            <FantasyProvider>
            <Routes>

            <Route path="/fantasy" element={<FantasyMoviePage />} />
            <Route path="/fantasy/create" element={<FantasyPage />} />
            <Route path="/actors/:id" element={<ActorDetailsPage />} />
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/movies/nowplaying" element={<NowPlayingMoviesPage />} />
              <Route path="/login" element={<SignInPage></SignInPage>}></Route>
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />

              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route
                path="/movies/favourites"
                element={<FavouriteMoviesPage />}
              />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            </FantasyProvider>
          </MoviesContextProvider>
        </SessionProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
