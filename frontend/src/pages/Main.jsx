import { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Pagination, Avatar, Box, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TableContainer, TextField, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { quests } from '../constants/temporary/quests';
import CreateQuestButton from '../components/CreateQuestSection.jsx/CreateQuestButton';
import QuestFilter from '../components/QuestRating/QuestFilter';
import Rating from '../components/QuestRating/Rating';




const Main = () => {

   return (
      <>
         <Rating />
      </>
   );
};

export default Main;

