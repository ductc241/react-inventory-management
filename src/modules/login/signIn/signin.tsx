import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserType } from "../../../types/user.type";
import { authenticated } from "../../../utils/localStorage/localStorega";
import { toast } from "react-toastify";
import { signin } from "../../../api/auth";

const Signin = () => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<UserType>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<UserType> = async (user: UserType) => {
    const { data } = await signin(user);

    data.error
      ? toast.error(`${data.error}`)
      : (toast.success(`${data[0].correct}`),
        authenticated(data[1], () => {
          navigate("/");
        }));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center bg-contain bg-center bg-no-repeat">
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img
                src="https://res.cloudinary.com/dywsyrah3/image/upload/v1669193368/poly_wareh_j06pfe_y53k83.png"
                className="w-24 mx-auto"
              />
            </div>
            <div className="mt-12 flex flex-col text-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Đăng nhập tài khoản
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex-1 mt-8">
                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Đăng nhập với email
                    </div>
                  </div>
                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                      id="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="off"
                      {...register("email", { required: true })}
                    />
                    <div className="pt-1 text-left">
                      {errors.email && (
                        <span className="text-red-500 text-md">
                          Bạn chưa nhập Email
                        </span>
                      )}
                    </div>
                    <input
                      aria-label="enter Password"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                      id="password"
                      type="password"
                      placeholder="Mật khẩu"
                      autoComplete="off"
                      {...register("password", { required: true })}
                    />
                    <div className="pt-1 text-left">
                      {errors.password && (
                        <span className="text-red-500 text-md">
                          Bạn chưa nhập mật khẩu
                        </span>
                      )}
                    </div>
                    <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Đăng nhập</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex-1 bg-gray-800 text-center hidden lg:flex">
            <div
              className="m-12 mt-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://res.cloudinary.com/di6ykd558/image/upload/v1669605099/phan-mem-quan-ly-kho_n4j0in.png")'
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
