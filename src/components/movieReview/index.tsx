import React from "react";
import { BackendReview, Review } from "../../types/interfaces";

const MovieReview: React.FC<BackendReview> =  (props) => {

  

  return (
    <>
      <p>Review By: {props.reviewerId} </p>
      <p>{props.content} </p>
    </>
  );
};
export default MovieReview
