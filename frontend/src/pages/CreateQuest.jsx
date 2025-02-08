import React from 'react'
import {Button, Paper, Box, Typography, Grid2, TextField} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function CreateQuest()
{
    return (
        <Paper elevation={1}
               sx={{
                   p: 4,
                   width: '100%',
                   boxSizing: 'border-box',
               }}>
            <Button
                variant="contained" // Стиль кнопки
                startIcon={<ArrowBackIcon />}
                sx={{display: 'absolute', mb:3}}
                >
                    Go back
                </Button>

            <Typography variant="h4" gutterBottom>
                Create new quest
            </Typography>

            <Grid2 container spacing={5} mb={4} sx={{ width: '100%'}}>
                <Grid2 item>
                    <Box
                        sx={{
                            width:{
                                xs: 100,
                                sm: 200,
                                md: 250,
                                lg: 300,
                                xl: 350,} ,
                            height: {
                                xs: 100,
                                sm: 200,
                                md: 250,
                                lg: 300,
                                xl: 350,},
                            backgroundColor: 'secondary.main', // Колір фону
                            display: 'flex',     // Використовуємо Flexbox для центрування
                            alignItems: 'center', // Центруємо по вертикалі
                            justifyContent: 'center', // Центруємо по горизонталі
                            color: 'black',      // Колір тексту
                            borderRadius: 4,     // Закруглені кути (опціонально)
                        }}
                    >
                        <Typography variant="h6" sx={{textTransform:'uppercase', fontWeight:'bold'}}>img</Typography>
                    </Box>
                </Grid2>
                <Grid2 item sx={{width: '60%'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField fullWidth label="Title" variant="filled"  />
                        <TextField fullWidth label="Description" multiline variant="filled" minRows={5}  />
                    </Box>
                </Grid2>
            </Grid2>
            <Grid2 container sx={{display: 'flex', justifyContent: {md:'end', sml:'start'}}}>
                <Button variant='contained' endIcon={<ArrowForwardIcon />}>
                    next
                </Button>
            </Grid2>
        </Paper>
    )
}