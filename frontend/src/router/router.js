
import Auth from "../components/Auth/AuthForm";
import Main from "../pages/Main";
import Profile from "../pages/Profile";
import CreateQuest from "../pages/CreateQuest.jsx";
import Tasks from "../pages/Tasks.jsx";


export const publicRoutes = [
   { path: "/auth", component: Auth },
<<<<<<< HEAD
   { path: "/main", component: Main },
   {path: "/create_quest", component: CreateQuest},
   {path: "/create_quest/tasks", component: Tasks},
=======

>>>>>>> 261a82d (rewrite login service for get instead of post method)
]

export const privateRoutes = [
   { path: "/main", component: Main },
]