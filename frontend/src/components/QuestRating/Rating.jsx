import React, { useState } from 'react'
import { quests } from '../../constants/temporary/quests';
import QuestFilter from './QuestFilter';
import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

export default function Rating() {
   const [filteredQuests, setFilteredQuests] = useState(quests);
   const handleFilterChange = ({ search, rating, tags }) => {
      let filtered = quests.filter((quest) =>
         quest.name.toLowerCase().includes(search.toLowerCase())
      );
      if (tags.length) {
         filtered = filtered.filter((quest) => tags.some((tag) => quest.tags.includes(tag)));
      }
      filtered.sort((a, b) => (rating === "asc" ? a.rating - b.rating : b.rating - a.rating));
      setFilteredQuests(filtered);
   };
   return (
      <>
         <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
            Рейтинг квестів
         </Typography>
         <Box display="flex" flexDirection="column" gap={2}>
            <QuestFilter onFilterChange={handleFilterChange} />
            <Paper elevation={3}>
               <List>
                  {filteredQuests.map((quest) => (
                     <ListItem key={quest.id}>
                        <ListItemText primary={quest.name} secondary={`Рейтинг: ${quest.rating}`} />
                     </ListItem>
                  ))}
               </List>
            </Paper>
         </Box>

      </>

   )
}
