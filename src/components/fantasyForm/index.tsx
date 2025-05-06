import {
  Box,
  Button,
  FilledInput,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { DiscoverPeople, GenreData } from "../../types/interfaces";
import { getGenres, getPeopleList } from "../../api/tmdb-api";
import { isError } from "lodash";
import Spinner from "../spinner";
import { CloudUpload } from "@mui/icons-material";

export const FantasyForm = () => {
  const { data, isLoading, isError, error } = useQuery<GenreData, Error>({
    queryKey: ["getGenres"],
    queryFn: getGenres,
  });

  const { data : cast, error :casterror, isLoading : castLoading, isError :castError} = useQuery<DiscoverPeople, Error>("discoverPeople", getPeopleList);


  
  

  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    genre: "",
    releaseDate: "",
    runtime: "",
    productionCompany: "",
    poster: null as File | null, 
  });




  const [cast1, setNewCast1] = useState({name : "" , role: "", description: "" });
  const [cast2, setNewCast2] = useState({name : "" , role: "", description: "" });
  const [movieCast, setmovieCast] = useState([cast1,cast2]);
  


  const reset = () =>
  {
 
    const emptyFormData = {
      title: "",
      overview: "",
      genre: "",
      releaseDate: "",
      runtime: "",
      productionCompany: "",
      poster: null,
    }
    
    setFormData(emptyFormData)
    setNewCast1({name : "" , role: "", description: "" })
    setNewCast2({name : "" , role: "", description: "" })
    setmovieCast([cast1,cast2])
  }

  const handleSubmit = () =>{

      let prev = movieCast
      let castMovie = [cast1,cast2]
      setmovieCast(castMovie)
      const fantasyMovie = {...formData, casts : [movieCast]}

      console.log(fantasyMovie);

      reset()
      
  }

const isFormValid = () => {
  const {
    title,
    overview,
    genre,
    releaseDate,
    runtime,
    productionCompany,
  } = formData;

  return (
    title.trim() &&
    overview.trim() &&
    genre.trim() &&
    releaseDate.trim() &&
    runtime.trim() &&
    productionCompany.trim() &&
    cast1.name.trim() &&
    cast1.role.trim() &&
    cast1.description.trim() &&
    cast2.name.trim() &&
    cast2.role.trim() &&
    cast2.description.trim()
  );
};


  if (isLoading) {
    return <Spinner />;
  }

  if ((isError && error) || (castError && casterror) ) {
    return <h1>{error ? error.message : casterror?.message}</h1>;
  }

  if (data && cast) {
    return (
      <>
        <Box
          component="section"
          sx={{ p: 2, display: "flex", justifyContent: "center" }}

        >
          <Box

            sx={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              p: 2,
              border: "1px dashed grey",
              gap: 2,
            }}
          >
              <Typography variant="h4" color="maroon" alignContent="center">
                Your Fantasy Movie
              </Typography>
              <FormControl required fullWidth>
                <TextField
                  fullWidth
                  value={formData.title}
                  label="Title"
                  name="title"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>  setFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
              </FormControl>

              <FormControl  required fullWidth>
                <TextField
                  fullWidth
                  value={formData.overview}
                  label="Overview"
                  name="overview"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>  setFormData((prev) => ({ ...prev, overview: e.target.value }))}
                />
              </FormControl>
              <FormControl required fullWidth>
                <TextField
                  fullWidth
                  type="date"
                  label="Release Date"
                  value={formData.releaseDate}
                  name="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>  setFormData((prev) => ({ ...prev, releaseDate: e.target.value }))}
                />
              </FormControl>
              <FormControl required fullWidth>
                <TextField
                  fullWidth
                  type="text"
                  label="Production Companies"
                  value={formData.productionCompany}
                  name="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>  setFormData((prev) => ({ ...prev, productionCompany: e.target.value }))}
                />
              </FormControl>
              <FormControl required fullWidth>
                <TextField
                  fullWidth
                  type="number"
                  label="Runtime"
                  value={formData.runtime}
                  name="runtime"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>  setFormData((prev) => ({ ...prev, runtime: e.target.value }))}
                />
              </FormControl>
              <FormControl required fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Generes
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.genre}
                  label="Age"
                  onChange={(e) =>  setFormData((prev) => ({ ...prev, genre: e.target.value }))}
                >
                  {data.genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.name}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box component="section" sx={{display: "flex", flexDirection: "column", gap :2}}>
              <FormControl required fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Cast 1
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cast1.name}
                  label="Age"
                  onChange={(e) =>  setNewCast1((prev) => ({ ...prev, name: e.target.value }))}
                >
                  {cast.results.map((people) => (
                    <MenuItem key={people.imdb_id} value={people.name}>
                      {people.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl required fullWidth>
                <TextField
                  fullWidth
                  value={cast1.role}
                  label="Cast 1 Role"
                  name="castrole"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>  setNewCast1((prev) => ({ ...prev, role: e.target.value }))}
                />
                   </FormControl>
                  <FormControl required fullWidth>
                <TextField
                  fullWidth
                  value={cast1.description}
                  label="Cast 1 Description"
                  name="description"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>  setNewCast1((prev) => ({ ...prev, description: e.target.value }))}
                />
                   </FormControl>
                   <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Cast 1
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cast2.name}
                  label="Age"
                  onChange={(e) =>  setNewCast2((prev) => ({ ...prev, name: e.target.value }))}
                >
                  {cast.results.map((people) => (
                    <MenuItem key={people.imdb_id} value={people.name}>
                      {people.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl required fullWidth>
                <TextField
                  fullWidth
                  value={cast2.role}
                  label="Cast 2 Role"
                  name="castrole"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>  setNewCast2((prev) => ({ ...prev, role: e.target.value }))}
                />
                   </FormControl>
                  <FormControl required fullWidth>
                <TextField
                  fullWidth
                  value={cast2.description}
                  label="Cast 2 Description"
                  name="description"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>  setNewCast2((prev) => ({ ...prev, description: e.target.value }))}
                />
                   </FormControl>
              </Box>
              <Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUpload />}
>
  Upload files
  <Input
  type="file"
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Get files first
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        poster: files[0], 
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        poster: null,
      }));
    }
  }}
/>


</Button>
<Button disabled={!isFormValid()} onClick={handleSubmit} type="submit">Create Fantasy Movie</Button>
          </Box>
        </Box>
      </>
    );
  }
};
