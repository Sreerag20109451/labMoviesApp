import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { getGenres } from "../../api/tmdb-api";

interface SearchCriteria {
  title: string;
  genre: string;
  minRuntime: string;
  maxRuntime: string;
  language: string;
}

interface SearchUIProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const SearchUI: React.FC<SearchUIProps> = ({ onSearch }) => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [criteria, setCriteria] = useState<SearchCriteria>({
    title: "",
    genre: "",
    minRuntime: "",
    maxRuntime: "",
    language: "",
  });

  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSelectChange = (
    e: SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSearch(criteria);
  };

  const handleReset = () => {
    setCriteria({
      title: "",
      genre: "",
      minRuntime: "",
      maxRuntime: "",
      language: "",
    });
  };

  return (
    <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" p={2}>
      {/* Title */}
      <TextField
        name="title"
        label="Title"
        value={criteria.title}
        onChange={handleInputChange}
      />
      
      {/* Genre */}
      <FormControl>
        <InputLabel>Genre</InputLabel>
        <Select
          name="genre"
          value={criteria.genre}
          label="Genre"
          onChange={handleSelectChange}
          style={{ minWidth: 120 }}
        >
          <MenuItem value="">Any</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id.toString()}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {/* Min Runtime */}
      <TextField
        name="minRuntime"
        label="Min Runtime"
        type="number"
        value={criteria.minRuntime}
        onChange={handleInputChange}
      />
      
      {/* Max Runtime */}
      <TextField
        name="maxRuntime"
        label="Max Runtime"
        type="number"
        value={criteria.maxRuntime}
        onChange={handleInputChange}
      />
      
      {/* Language */}
      <TextField
        name="language"
        label="Language"
        value={criteria.language}
        onChange={handleInputChange}
      />
      
      {/* Search Button */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Search
      </Button>
      
      {/* Reset Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleReset}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default SearchUI;
