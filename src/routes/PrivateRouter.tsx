import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hook/hook";
import { isAuthenticated } from "../utils/localStorage/localStorega";

type Props = {
  children: JSX.Element;
};

const PrivateRouter = (props: Props) => {
  // const useSelector = useAppSelector;

  // const { user } = useSelector((store) => store.auth);

  if (!localStorage.getItem("user")) {
    return <Navigate to="/signin" />;
  }

  return props.children;
};

export default PrivateRouter;
