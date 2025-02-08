import {Box, Button, Paper} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AddQuestBlock() {
    return(
        <Button variant="outlined" elevation={5} sx={{
            display: 'flex',
            minWidth: '50%',
            minHeight: '4rem',
            justifyContent: 'center',
            alignItems: 'center',

        }}>
            <AddCircleIcon fontSize='large' />
        </Button>
    )
}