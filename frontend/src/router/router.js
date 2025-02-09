import Auth from "../components/Auth/AuthForm";
import Main from "../pages/Main";
import CreateQuest from "../pages/CreateQuest.jsx";
import GoBackButton from "../UI/button/GoBackButton.jsx";


export const publicRoutes = [
   { path: "/auth", component: Auth },
   { path: "/main", component: Main },
   { path: "/create_quest", component: CreateQuest }
]

export const privateRoutes = [
   { path: "/main", component: Main },
]