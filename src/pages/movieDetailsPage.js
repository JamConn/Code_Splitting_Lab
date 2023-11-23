import React from "react";
import { getMovie } from "../api";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

const MovieDetails = (props) => {
  const { id } = useParams();

  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery(["movie", { id: id }], getMovie);

  if (isLoading) {
    return <h3>Waiting for data </h3>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <h1>Movie Details </h1>
      <Link to={`/movies/${id}/reviewers`}>See reviewers</Link>
      <pre>{JSON.stringify(movie, null, 2)}</pre>;
    </>
  );
};

export default MovieDetails;
