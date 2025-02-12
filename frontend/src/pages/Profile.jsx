import React from "react";
import {
   Container,
   Grid2,
   Typography,
   Stack,
} from "@mui/material";
import ChangeAvatar from "../components/Profile/ChangeAvatar";
import DataField from "../components/Profile/DataField.jsx";
import CompletedQuests from "../components/Profile/CompletedQuests.jsx";
import { completedQuestsList } from "../constants/temporary/quests.js";
import ContainerBlurBg from "../UI/container/ContainerBlurBg.jsx";
import { userService } from "../services/userService.js";
import Loader from "../UI/Loader/Loader.jsx";
import { Navigate, useNavigate } from "react-router-dom";




const Profile = () => {


   const { data, isLoading } = userService.useGetUserInfoQuery()
   const navigate = useNavigate()
   if (isLoading) return <Loader />
   if (!data) navigate("/auth")
   console.log(currentData)
   return (
      <Container maxWidth="lg">
         <ContainerBlurBg>
            <Grid2 container spacing={4}>
               <ChangeAvatar />
               <Stack spacing={3} alignItems="start" sx={{ py: 4 }}>
                  <DataField data={data.userName} style="nickname" />
                  <>{data.email}</>
               </Stack>
            </Grid2>
            <Grid2 container spacing={2}>
               <Typography variant="h5" >
                  Completed Quests
               </Typography>
               <CompletedQuests data={completedQuestsList} />
            </Grid2>
         </ContainerBlurBg>
      </Container>
   );
};

export default Profile;
