import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import TagList from "./TagList";
import { useState } from "react";

const QuestFilter = ({ onFilterChange }) => {
   const defaultFilters = {
      search: "",
      rating: "desc",
      selectedTags: [],
   };

   const [search, setSearch] = useState(defaultFilters.search);
   const [rating, setRating] = useState(defaultFilters.rating);
   const [selectedTags, setSelectedTags] = useState(defaultFilters.selectedTags);

   const handleFilterChange = () => {
      onFilterChange({ search, rating, tags: selectedTags });
   };

   const handleSearchChange = (event) => {
      setSearch(event.target.value);
      handleFilterChange();
   };

   const handleRatingChange = (event) => {
      setRating(event.target.value);
      handleFilterChange();
   };

   const handleTagClick = (tag) => {
      const updatedTags = selectedTags.includes(tag)
         ? selectedTags.filter((t) => t !== tag)
         : [...selectedTags, tag];
      setSelectedTags(updatedTags);
      handleFilterChange();
   };

   const handleClearFilters = () => {
      setSearch(defaultFilters.search);
      setRating(defaultFilters.rating);
      setSelectedTags(defaultFilters.selectedTags);
      handleFilterChange();
   };

   return (
      <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
         <Box display="flex" gap={2}>
            <TextField
               label="Пошук за назвою"
               variant="outlined"
               value={search}
               onChange={handleSearchChange}
            />
            <FormControl sx={{ minWidth: 100 }}>
               <InputLabel>Сортування</InputLabel>
               <Select value={rating} onChange={handleRatingChange} autoWidth>
                  <MenuItem value="desc">Найкращі</MenuItem>
                  <MenuItem value="asc">Найгірші</MenuItem>
               </Select>
            </FormControl>
         </Box>
         <TagList handleTagClick={handleTagClick} selectedTags={selectedTags} />
         <Button variant="outlined" onClick={handleClearFilters}>Очистити фільтри</Button>
      </Box>
   );
};

export default QuestFilter;
