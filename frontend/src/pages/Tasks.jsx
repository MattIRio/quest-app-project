import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import AddQuestBlock from "../components/Quests/AddQuestBlock.jsx";
export default function Tasks(){

    return (
        <Paper elevation={2} >
            <Button
                variant="contained" // Стиль кнопки
                startIcon={<ArrowBackIcon />}
                sx={{display: 'absolute', my:3, mx:2}}
            >
                Go back
            </Button>
           <Stack direction="row" sx={{display: "flex", justifyContent: 'space-around', alignItems:'end'}}>
            <Typography variant="h5" gutterBottom>Name of quest</Typography>
               <TextField
                   id="standard-number"
                   label="Minutes"
                   type="number"
                   variant="standard"
                   slotProps={{
                       inputLabel: {
                           shrink: true,
                       },
                   }}
               />
           </Stack>
            <Stack direction='column' alignItems="center"  spacing={4} sx={{my:8}}>
            <AddQuestBlock />
            <AddQuestBlock />
            <AddQuestBlock />
            <AddQuestBlock />
            <AddQuestBlock />
            </Stack>
        </Paper>
)
}