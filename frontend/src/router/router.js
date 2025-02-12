import Auth from "../components/Auth/AuthForm";
import Main from "../pages/Main";
import CreateQuest from "../pages/CreateQuest.jsx";
import Profile from "../pages/Profile.jsx";
import QuestPage from "../pages/QuestPage.jsx";
import QuestCompletion from "../components/QuestCompletionSection/QuestCompletion.jsx";


export const publicRoutes = [
   { path: "/auth", component: Auth }
]

export const privateRoutes = [
   { path: "/main", component: Main },
   { path: "/create_quest", component: CreateQuest },
   { path: "/quests/:questId", component: QuestPage },
   { path: "/profile", component: Profile }
]