import { Button } from "@mui/material";

export default function AddTaskButton({ onClick }) {
   return (
      <center>
         <Button variant="outlined" elevation={5} sx={{
            display: 'flex',
            minWidth: '50%',
            minHeight: '4rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: "column"
         }} onClick={() => onClick()}>
            +AddTAsk
         </Button>
      </center>
   )
}