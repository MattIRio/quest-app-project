import Auth from "../components/Auth/AuthForm";
import Main from "../pages/Main";
import CreateQuest from "../pages/CreateQuest.jsx";
import QuestCompletion from "../pages/QuestCompletion.jsx";


export const publicRoutes = [
   { path: "/auth", component: Auth },
   { path: "/main", component: Main },
   { path: "/create_quest", component: CreateQuest },
   { path: "/quests/:questId", component: QuestCompletion }
]

export const privateRoutes = [
   { path: "/main", component: Main },
]