import React, { useState } from "react";
import { BackendReview } from "../../types/interfaces";
import { languages } from "./languages";
import {
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getTranslatedReview } from "../../api/aws-backend-apis";

const MovieReview: React.FC<BackendReview> = (props) => {
  const [selected, setSelected] = useState<string>("en");
  const [language, setLanguage] = useState<string>("English")
  const [isTranslated, setIsTranslated] = useState(false);
  const [translatedText, setTranslatedText] = useState("");

  const selectLang = async (e: SelectChangeEvent) => {
    const lang = e.target.value;
  
    setSelected(lang);
    const resp = await getTranslatedReview(props.reviewId, props.movieId , lang);
    setTranslatedText(resp.translatedText);
    setIsTranslated(true);
    const langname =languages.find((lang) => lang.code === selected)?.name
    console.log(`${langname} is langname`);
    setLanguage(langname || "English" ) 
    console.log(selected);
    
  };

  return (
    <>
      <Typography variant="subtitle2" gutterBottom>
        Review By: {props.reviewerId}
      </Typography>

      <Typography variant="body1" paragraph>
        {!isTranslated ? props.content : `${translatedText}`}
      </Typography>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="language-select-label">Translate to</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={selected}
          label="Translate to"
          onChange={selectLang}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {isTranslated && selected !== "en" && (
        <Typography
          variant="caption"
          sx={{ mt: 1, fontStyle: "italic", color: "gray", display: "block" }}
        >{`Translated to ${language}`}
        </Typography>
      )}
    </>
  );
};

export default MovieReview;
