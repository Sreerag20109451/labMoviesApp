import React from "react";
import { MovieSortKey } from "../../types/interfaces";

interface SortSelectorProps {
  sortKey: MovieSortKey;
  onChange: (key: MovieSortKey) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ sortKey, onChange }) => {
  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <label htmlFor="sortBy">Sort by: </label>
      <select
        id="sortBy"
        value={sortKey}
        onChange={(e) => onChange(e.target.value as MovieSortKey)}
        style={{ padding: "5px", marginLeft: "10px" }}
      >
        <option value="title">Title</option>
        <option value="release_date">Release Date</option>
        <option value="vote_average">Rating</option>
        <option value="popularity">Popularity</option>
        <option value="runtime">Runtime</option>
        <option value="revenue">Revenue</option>
      </select>
    </div>
  );
};

export default SortSelector;
