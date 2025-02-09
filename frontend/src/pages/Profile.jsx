import React from "react";
import {
    Container,
    Grid2,
    Typography,
    Paper,
    Stack,
    styled
} from "@mui/material";
import ChangeAvatar from "../components/Profile/ChangeAvatar";
import DataField from "../components/Profile/DataField.jsx";
import CompletedQuests from "../components/Profile/CompletedQuests.jsx";
import {completedQuestsList} from "../constants/temporary/quests.js";


const ProfileContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
}));

const Profile = () => {

    return (
        <Container maxWidth="lg">
            <ProfileContainer elevation={3}>
                <Grid2 container spacing={4}>
                   <ChangeAvatar />
                    <Stack spacing={3} alignItems="start" sx={{py:4}}>
                        <DataField data="Joe Dohn" style="nickname" />
                        <DataField data="example.gmail.com" style="email" />
                    </Stack>
                    <Grid2 item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Completed Quests
                        </Typography>
                    </Grid2>
                    <CompletedQuests data={completedQuestsList} />
                </Grid2>
            </ProfileContainer>
        </Container>
    );
};

export default Profile;
