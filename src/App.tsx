import { BrowserRouter, Route, Routes } from "react-router-dom";

import { appRoutes } from "./routes/routes.routes";
import LayoutProduct from "./layouts/Layout";

import IRoute from "./types/router.type";
import Signin from "./modules/login/signIn/signin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutProduct />}>
          {appRoutes.map((route: IRoute) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
        </Route>
        <Route path="/signin" element={<Signin />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
