import React, { useState } from 'react'
import { quests } from '../../constants/temporary/quests';
import QuestFilter from './QuestFilter';
import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import ContainerBlurBg from '../../UI/container/ContainerBlurBg';
import { Link } from 'react-router-dom';

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
      <><ContainerBlurBg>
         <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
            Рейтинг квестів
         </Typography>
         <Box display="flex" flexDirection="column" gap={2}>
            <QuestFilter onFilterChange={handleFilterChange} />
            <List>
               {filteredQuests.map((quest, index) => (
                  <Link key={quest.id} to={`/quests/${quest.id}`} >
                     <ListItem
                        style={{
                           backgroundColor: index & 1 ? 'rgba(255,255,255,0.3)' : 'transparent',
                           borderTop: index & 1 ? "1px solid #ddddd" : "",
                           borderBottom: index & 1 ? "1px solid #ddddd" : "",
                           cursor: 'pointer'
                        }}
                     >
                        <ListItemText
                           primary={quest.name}
                           secondary={`Рейтинг: ${quest.rating}`}
                        />
                     </ListItem>
                  </Link>
               ))}
            </List>

         </Box>
      </ContainerBlurBg>
      </>

   )
}
