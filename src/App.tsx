import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { appRoutes } from "./routes/routes.routes";
import LayoutProduct from "./layouts/Layout";

import IRoute from "./types/router.type";
import Signin from "./modules/login/signIn/signin";
import Signup from "./modules/login/signup/signup";
import Admin from "./pages/admin/admin";
import PrivateRouter from "./routes/PrivateRouter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PrivateRouter>
              <LayoutProduct />
            </PrivateRouter>
          }
        >
          {appRoutes.map((route: IRoute) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
        </Route>
        <Route path="admin">
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Admin />} />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
