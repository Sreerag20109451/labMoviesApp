import React, { useContext, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import ratings from "./ratingCategories";
import { BaseMovieProps, Review, ReviewAdd } from "../../types/interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { postReview } from "../../api/tmdb-api";


const ReviewForm: React.FC<BaseMovieProps> = (movie) => {

    const [open, setOpen] = useState(false); 
    const handleSnackClose = () => {
        setOpen(false);
        navigate("/movies/favourites");
      };
    const defaultValues = {
        defaultValues: {
          content : "",
          movieId : movie.id ,
          rating: 3 as 1 | 2 | 3 | 4 | 5,
        }
      }
    
      const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
      } = useForm<ReviewAdd>(defaultValues);
    
      const navigate = useNavigate();
      const context = useContext(MoviesContext);
      const [rating, setRating] = useState(3);
    
    
      const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRating(Number(event.target.value));
      };
      const onSubmit: SubmitHandler<ReviewAdd> = async (review) => {
        try {
          await postReview({
            content: review.content,
            rating: rating as 1 | 2 | 3 | 4 | 5, // safely cast
            movieId: movie.id, // convert movie.id to string
          });
          setOpen(true);
        } catch (err) {
          console.error("Failed to submit review:", err);
        }
      };
    
      return (
        <Box component="div" sx={styles.root}>
          <Typography component="h2" variant="h3">
            Write a review
            <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
         onClose={handleSnackClose}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">
            Thank you for submitting a review
          </Typography>
        </Alert>
      </Snackbar>
          </Typography>
          <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="content"
              control={control}
              rules={{
                required: "Review cannot be empty.",
                minLength: { value: 10, message: "Review is too short" },
              }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Review text"
                  id="review"
                  multiline
                  minRows={10}
                />
              )}
            />
            {errors.content && (
              <Typography variant="h6" component="p">
                {errors.content.message}
              </Typography>
            )}
    
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="select-rating"
                  select
                  variant="outlined"
                  label="Rating Select"
                  value={rating}
                  onChange={handleRatingChange}
                  helperText="Don't forget your rating"
                >
                  {ratings.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
    
            <Box >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={styles.submit}
              >
                Submit
              </Button>
              <Button
                type="reset"
                variant="contained"
                color="secondary"
                sx={styles.submit}
                onClick={() => {
                  reset({
                    content: "",
                    rating : 3 as 1 | 2 | 3 | 4 | 5, 
                  });
                }}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Box>
      );
    };
    
    export default ReviewForm;