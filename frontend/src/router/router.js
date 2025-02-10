import Auth from "../components/Auth/AuthForm";
import Main from "../pages/Main";
import CreateQuest from "../pages/CreateQuest.jsx";
<<<<<<< HEAD
import QuestCompletion from "../pages/QuestCompletion.jsx";
=======
import Profile from "../pages/Profile.jsx";
>>>>>>> 64dd24c0b29b046f5ea932f27b69479ddc566d41


export const publicRoutes = [
   { path: "/auth", component: Auth },
   { path: "/main", component: Main },
   { path: "/create_quest", component: CreateQuest },
<<<<<<< HEAD
   { path: "/quests/:questId", component: QuestCompletion }
=======
   {path: "/profile", component: Profile },

>>>>>>> 64dd24c0b29b046f5ea932f27b69479ddc566d41
]

export const privateRoutes = [
   { path: "/main", component: Main },
]