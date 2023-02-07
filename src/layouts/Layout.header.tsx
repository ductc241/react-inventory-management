import { useNavigate } from "react-router-dom";
import { logout } from "../api/login.api";
import { UserICon, UsersIcon } from "../components/icons";

const LayoutHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div
      className="py-3 bg-white"
      style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 5px" }}
    >
      <div className="px-10 flex justify-end items-center gap-x-10">
        {/* <div className="flex items-center gap-x-3">
          <UsersIcon width={17} height={17} />
          <p className="font-semibold text-[#233044]">Người dùng</p>
        </div> */}
        <div
          className="p-[10px] rounded-full hover:cursor-pointer shadow-morphism"
          title="Đăng xuất"
        >
          <UserICon width={17} height={17} fill="red" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
