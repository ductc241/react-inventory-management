import { BrowserRouter, Route, Routes } from "react-router-dom";

import { appRoutes } from "./routes/routes.routes";
import LayoutProduct from "./layouts/Layout.product";

import IRoute from "./types/router.type";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
