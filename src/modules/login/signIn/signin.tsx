import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserType } from "../../../types/user.type";
import { authenticated } from "../../../utils/localStorage/localStorega";
import { signIn } from "../../../store/slice/auth.slice";
import { useAppDispatch } from "../../../hook/hook";

const Signin = () => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<UserType>();
  const navigate = useNavigate();
  const disPatch = useAppDispatch();

  const onSubmit: SubmitHandler<UserType> = async (user: UserType) => {
    disPatch(signIn(user));
    authenticated(user, () => {
      navigate("/");
    });
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center bg-contain bg-center bg-no-repeat"
        // style={{ backgroundImage: 'url("https://res.cloudinary.com/di6ykd558/image/upload/v1669608623/quan-ly-kho-hang-chuyen-nghiep_v2m5fx.jpg")' }}
        >
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img src="https://res.cloudinary.com/dywsyrah3/image/upload/v1669193368/poly_wareh_j06pfe_y53k83.png" className="w-24 mx-auto" />
            </div>
            <div className="mt-12 flex flex-col text-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Đăng nhập tài khoản
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex-1 mt-8">
                  <div className="flex flex-col items-center">
                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                      <div className="bg-white p-2 rounded-full">
                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                          <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                          <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                          <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                          <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                        </svg>
                      </div>
                      <span className="ml-4">
                        Đăng nhập với Google
                      </span>
                    </button>
                    {/* <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                      <div className="bg-white p-1 rounded-full">
                        <svg className="w-6" viewBox="0 0 32 32">
                          <path fillRule="evenodd" d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
                        </svg>
                      </div>
                      <span className="ml-4">
                        Sign Up with GitHub
                      </span>
                    </button> */}
                  </div>
                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Đăng nhập với email
                    </div>
                  </div>
                  <div className="mx-auto max-w-xs">
                    <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                      id="email" type="email" placeholder="Email" autoComplete="off"
                      {...register("email", { required: true })} />
                    <div className="pt-1 text-left">
                      {errors.email && (
                        <span className="text-red-500 text-md">
                          Bạn chưa nhập Email
                        </span>
                      )}
                    </div>
                    <input aria-label="enter Password"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                      id="password" type="password" placeholder="Mật khẩu" autoComplete="off"
                      {...register("password", { required: true })} />
                    <div className="pt-1 text-left">
                      {errors.password && (
                        <span className="text-red-500 text-md">
                          Bạn chưa nhập mật khẩu
                        </span>
                      )}
                    </div>
                    <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">
                        Đăng nhập
                      </span>
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Tôi chưa có tài khoản! <Link to="/signup" className="hover:underline decoration-solid border-dotted text-black font-semibold hover:text-green-700">Đăng ký ngay!</Link>

                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex-1 bg-gray-800 text-center hidden lg:flex">
            <div className="m-12 mt-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://res.cloudinary.com/di6ykd558/image/upload/v1669605099/phan-mem-quan-ly-kho_n4j0in.png")' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
