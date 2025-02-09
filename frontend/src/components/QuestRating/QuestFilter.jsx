import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import TagList from "./TagList";
import { useState } from "react";
import CreateQuestButton from "../CreateQuestSection.jsx/CreateQuestButton";

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
      <Box display="flex" gap={2} flexWrap="wrap">
         <Box display="flex" gap={2} width="100%">
            <TextField
               label="Пошук за назвою"
               variant="outlined"
               value={search}
               onChange={handleSearchChange}
               sx={{ flex: "1 1 100%" }}
            />
            <FormControl sx={{ minWidth: 100, flex: "1 1 100%" }} variant="outlined">
               <InputLabel>Сортування</InputLabel>
               <Select
                  value={rating}
                  onChange={handleRatingChange}
                  label="Сортування" // Важливо для коректного позиціонування
               >
                  <MenuItem value="desc">Найкращі</MenuItem>
                  <MenuItem value="asc">Найгірші</MenuItem>
               </Select>
            </FormControl>


            <CreateQuestButton />
         </Box>
         <TagList handleTagClick={handleTagClick} selectedTags={selectedTags} />
         <Button variant="outlined" onClick={handleClearFilters}>Очистити фільтри</Button>
      </Box>
   );
};

export default QuestFilter;
