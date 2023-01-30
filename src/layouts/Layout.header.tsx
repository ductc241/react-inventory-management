import { useNavigate } from "react-router-dom";
import { logout } from "../api/login.api";
import { UserICon } from "../components/icons";

const LayoutHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div
      className="py-2 bg-white"
      style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 5px" }}
    >
      <div className="container flex justify-end">
        <div className="p-3 rounded-full hover:bg-gray-100 hover:cursor-pointer">
          <UserICon
            width={20}
            height={20}
            fill="#9e9e9e"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
