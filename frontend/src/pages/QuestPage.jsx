import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { questService } from "../services/questService";
import { CircularProgress, Container } from "@mui/material";
import QuestPreview from "../components/QuestCompletionSection/QuestPreview";
import QuestCompletion from "../components/QuestCompletionSection/QuestCompletion";
import RateQuest from "../components/QuestCompletionSection/RateQuest";
import { useRedirectToMain } from "../hooks/useRedirectToMain";

export default function QuestPage() {
   const [started, setStarted] = useState(false);
   const params = useParams();
   const { data: questData, isLoading } = questService.useGetQuestByIdQuery(params.questId);
   const [startQuest, { isLoading: isStarting }] = questService.useStartQuestMutation();
   const [rateQuest, { isLoading: isRateLoading }] = questService.useRateQuestMutation();
   const back = useRedirectToMain()
   const [currQuestData, setCurrQuestData] = useState(null)
   const [isQuestGoing, setIsGoing] = useState(false)
   console.log(currQuestData)

   const handleStart = async () => {
      try {
         const res = await startQuest({
            questId: params.questId,
            startedAt: Date.now()
         });
         setIsGoing(true)
         setCurrQuestData(res.data)
         setStarted(true);
      } catch (error) {
         console.error("Помилка старту квесту:", error);
      }
   };

   const handleRate = async (userGrade) => {
      try {
         const res = await rateQuest({
            questId: currQuestData.id,
            userGrade
         });
         back()
      } catch (error) {
         console.error("Помилка старту квесту:", error);
      }
   };

   if (isLoading || isStarting) {
      return (
         <Container style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <CircularProgress />
         </Container>
      );
   }

   return (
      <Container style={{ marginTop: "20px" }}>
         {!started ? (
            <QuestPreview questData={questData} onStart={handleStart} />
         ) : (
            <>
               <QuestCompletion questData={currQuestData} setIsGoing={setIsGoing} />
               {
                  !isQuestGoing && <RateQuest onSubmit={(rating) => handleRate(rating)} />
               }
            </>

         )}

      </Container>
   );
}
