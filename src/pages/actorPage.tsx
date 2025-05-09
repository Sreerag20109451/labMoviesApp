import React, { useState } from "react";
import { getPeopleList } from "../api/tmdb-api";


import { DiscoverPeople } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import ActorListTemplate from "../components/actorTemplateList";
import { Pagination } from "@mui/material";

const ActorsPage: React.FC = () => {


  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>(
    ["discoverPeople", currentPage], 
    async () => {
      // Make sure getMovies is called correctly as an async function
      return await getPeopleList(currentPage);
    },
    {
      keepPreviousData: true,
    }
  )

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };


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
                <div className="pagination-controls" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          count={data?.total_pages || 1}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>
        </>
      );
    }

}
 
export default ActorsPage;
