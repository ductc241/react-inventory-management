import { Navigate } from "react-router-dom";
type Props = {
  children: JSX.Element;
};

const PrivateRouter = (props: Props) => {
  if (!localStorage.getItem("user")) {
    return <Navigate to="/signin" />;
  }

  return props.children;
};
export default PrivateRouter;
