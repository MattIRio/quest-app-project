import { Button, Card, CardContent, Typography } from "@mui/material";
import { questService } from "../../services/questService";

export default function QuestPreview({ questData, onStart }) {


   console.log(questData)

   return (
      <Card style={{ maxWidth: 600, margin: "20px auto", padding: "20px", textAlign: "center" }}>
         <CardContent>
            <Typography variant="h5" component="div">
               {questData.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{ marginTop: 10 }}>
               {questData.description}
            </Typography>
            <Button
               variant="contained"
               color="primary"
               onClick={onStart}
               style={{ marginTop: 20 }}
            >
               Почати квест
            </Button>
         </CardContent>
      </Card>
   );
}
