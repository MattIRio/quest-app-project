import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { privateRoutes, publicRoutes } from './router';
import React from 'react';




const AppRouter = () => {
   return (
      <>
         <Routes>

            {
               publicRoutes.map(route =>
                  <Route
                     key={route.path}
                     path={route.path}
                     element={<route.component />}
                  />
               )
            }
            {
               privateRoutes.map(route =>
                  <Route
                     key={route.path}
                     path={route.path}
                     element={<PrivateRoute routePage={<route.component />} />}
                  />
               )
            }
            <Route path={"*"} element={<Navigate to="/main" />} />
         </Routes >
      </>
   )
}


export default AppRouter;