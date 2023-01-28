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
    <div className="px-10 py-2 bg-white">
      <div className="flex justify-end">
        <div className="p-3 rounded-full hover:bg-gray-100">
          <UserICon
            width={20}
            height={20}
            className="hover:cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
