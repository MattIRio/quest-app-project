export const handleFilterChange = () => {
   onFilterChange({ search, rating, tags: selectedTags });
};

export const handleSearchChange = (event) => {
   setSearch(event.target.value);
   handleFilterChange();
};

export const handleRatingChange = (event) => {
   setRating(event.target.value);
   handleFilterChange();
};

export const handleTagClick = (tag) => {
   const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
   setSelectedTags(updatedTags);
   handleFilterChange();
};

export const handleClearFilters = () => {
   setSearch(defaultFilters.search);
   setRating(defaultFilters.rating);
   setSelectedTags(defaultFilters.selectedTags);
   handleFilterChange();
};
