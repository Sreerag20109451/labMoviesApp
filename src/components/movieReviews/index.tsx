import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/aws-backend-apis";

import { MovieDetailsProps, BackendReview } from "../../types/interfaces"; 
import { useQuery } from "react-query";
import { getMovie } from "../../api/tmdb-api";

const styles = {
    table: {
        minWidth: 550,
    },
};

const MovieReviews: React.FC<MovieDetailsProps> = ({ id }) => {
    
    const { data, error, isLoading } = useQuery(
        ["movieReviews", id],
        () => getMovieReviews(id),
        {
            enabled: !!id, // only fetch if id is available
        }
    );

      
    const { data: movie, error: movieErr, isLoading: LoadingMovie } = useQuery(
        ["movie", id],
        () => getMovie(String(id)),
        {
            enabled: !!id, // only fetch if id is available
        }
    );


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }

    if(data && data.reviews)

    {
        return (
            <TableContainer component={Paper}>
                <Table sx={styles.table} aria-label="reviews table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Author</TableCell>
                            <TableCell align="center">Excerpt</TableCell>
                            <TableCell align="right">More</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.reviews.map((review: BackendReview) => (
                            <TableRow key={review.reviewId}>
                                <TableCell component="th" scope="row">
                                    {review.reviewerId}
                                </TableCell>
                                <TableCell>{review.content.slice(0, 100)}...</TableCell>
                                <TableCell>
                                    <Link
                                        to={`/reviews/${review.reviewId}`}
                                        state={{
                                            review,
                                            movie: movie,
                                        }}
                                    >
                                        Full Review
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    
};

export default MovieReviews;
