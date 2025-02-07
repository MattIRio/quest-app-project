
import Auth from "../components/Auth/AuthForm";
import Main from "../pages/Main";
import Profile from "../pages/Profile";


export const publicRoutes = [
   { path: "/auth", component: Auth },
   { path: "/main", component: Main },
]

export const privateRoutes = [
   { path: "/profile", component: Profile }
]