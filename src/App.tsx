import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { appRoutes } from "./routes/routes.routes";
import LayoutMain from "./layouts/Layout";
import PrivateRouter from "./routes/PrivateRouter";

import IRoute from "./types/router.type";
import { PATH_SIGNIN, PATH_NEW_SALE } from "./routes/routes.paths";

import Signin from "./modules/login/signIn/signin";
import NotFound404 from "./pages/not_found/404";
import NewSalePage from "./pages/new_sale/NewSalePage";
import User from "./modules/user";
import { isAuthenticated } from "./utils/localStorage/localStorega";

const App = () => {
  const user = isAuthenticated();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <PrivateRouter>
                <LayoutMain />
              </PrivateRouter>
            }
          >
            {appRoutes.map((route: IRoute) => {
              console.log(route?.role?.includes(user.role_id), "sagg");

              return (
                <Route
                  path={route.path}
                  element={
                    route?.role?.includes(user.role_id) == true ? (
                      <NotFound404 />
                    ) : (
                      route.component
                    )
                  }
                  key={route.path}
                />
              );
            })}
          </Route>

          {/* <Route path="admin">
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
          </Route> */}

          <Route path={PATH_NEW_SALE} element={<NewSalePage />} />

          <Route path={PATH_SIGNIN} element={<Signin />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
