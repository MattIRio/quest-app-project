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
      <><div style={{ backdropFilter: "blur(17px)", background: "rgba(255,255,255,0.35)", padding: 30, borderRadius: 20 }}>
         <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
            Рейтинг квестів
         </Typography>
         <Box display="flex" flexDirection="column" gap={2}>
            <QuestFilter onFilterChange={handleFilterChange} />
            <List>
               {filteredQuests.map((quest, index) => (
                  <ListItem
                     key={quest.id}
                     style={{
                        backgroundColor: index & 1 ? 'rgba(255,255,255,0.1)' : 'transparent',
                        borderTop: index & 1 ? "1px solid #ddddd" : "",
                        borderBottom: index & 1 ? "1px solid #ddddd" : "",
                     }}
                  >
                     <ListItemText
                        primary={quest.name}
                        secondary={`Рейтинг: ${quest.rating}`}
                     />
                  </ListItem>
               ))}
            </List>

         </Box>
      </div>
      </>

   )
}
