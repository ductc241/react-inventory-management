import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { appRoutes } from "./routes/routes.routes";
import LayoutProduct from "./layouts/Layout";
import PrivateRouter from "./routes/PrivateRouter";

import IRoute from "./types/router.type";
import { PATH_SIGNIN, PATH_SIGNUP } from "./routes/routes.paths";

import Signup from "./modules/login/signup/signup";
import Signin from "./modules/login/signIn/signin";

const App = () => {
  return (
    <>
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

          {/* <Route path="admin">
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route> */}

          <Route path={PATH_SIGNIN} element={<Signin />} />
          <Route path={PATH_SIGNUP} element={<Signup />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
