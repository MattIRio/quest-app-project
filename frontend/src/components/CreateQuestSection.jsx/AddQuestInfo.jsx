import { Box, Button, Grid2, Paper, TextField, Typography } from "@mui/material";
import { MultimediaInput } from "./AddTaskkSection/MultimediaInput";

export default function AddQuestInfo() {
   return (
      <div style={{ border: "1px solid #ddd", margin: 10, borderRadius: 15, padding: "20px" }}>

         <Typography variant="h4" gutterBottom>
            Create new quest
         </Typography>

         <div style={{ width: '100%', display: "flex", gap: 20 }}>
            <Box
               sx={{
                  display: 'flex',
               }}
            >
               <MultimediaInput />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: "1 1 100%" }}>
               <TextField fullWidth label="Title" />
               <TextField fullWidth label="Description" multiline minRows={5} />
            </Box>
         </div>

      </div>
   )
}