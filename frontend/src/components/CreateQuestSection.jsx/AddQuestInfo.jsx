import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { MultimediaInput } from "./AddTaskkSection/MultimediaInput";

export default function AddQuestInfo() {
   const [questData, setQuestData] = useState({
      title: "",
      description: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setQuestData((prev) => ({ ...prev, [name]: value }));
      console.log(questData)
   };

   return (
      <div style={{ borderRadius: 15, padding: "30px", background: "rgba(255,255,255,0.7)" }}>
         <Typography variant="h4" gutterBottom>
            Create new quest
         </Typography>

         <div style={{ width: "100%", display: "flex", gap: 20 }}>
            <Box sx={{ display: "flex" }}>
               <MultimediaInput />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, flex: "1 1 100%" }}>
               <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={questData.title}
                  onChange={handleChange}
               />
               <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  minRows={5}
                  value={questData.description}
                  onChange={handleChange}
               />
            </Box>
         </div>
      </div>
   );
}
