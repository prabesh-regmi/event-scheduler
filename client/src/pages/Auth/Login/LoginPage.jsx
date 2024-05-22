/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SubmitSpinner from "../../../components/common/SubmitSpinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { login } from "../../../redux/slices/loginSlice";
import { handleLogin } from "../../../services";
import { toast } from "react-toastify";

function LoginPage() {
  const [isLogging, setIsLogging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const { isAuthenticated } = useSelector((store) => store.login);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    toast.warn(
      "Wait few minuets for the first time to connect backend, It is hosted in free tier so it will be stop when inactive"
    );
  }, []);
  const handleToggle = () => {
    setPasswordShown(!passwordShown);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const OnSubmit = async (payload) => {
    setIsLogging(true);
    const user = await handleLogin(payload);
    if (user.id) {
      dispatch(login({ user }));
      reset();
      navigate(-1);
    }
    setErrorMessage(user.message);
    setIsLogging(false);
  };
  return (
    <section className="bg-gray-100 min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-10 border">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl md:mt-0 xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 ">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-center text-purple-800 uppercase md:text-2xl">
            Welcome back
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(OnSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
                <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-bodyText rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="name@company.com"
                autoComplete="email"
                {...register("email", {
                  required: "Email cannot be empty",
                })}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
                <span className="text-red-600">*</span>
              </label>
              <div className="relative flex w-full h-full">
                <input
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-bodyText rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="Enter your Password"
                  {...register("password", {
                    required: "Password cannot be empty",
                  })}
                  autoComplete="current-password"
                />

                <div className="absolute right-0 flex items-center justify-center h-full mr-3">
                  {passwordShown ? (
                    <VisibilityOutlinedIcon onClick={handleToggle} />
                  ) : (
                    <VisibilityOffOutlinedIcon onClick={handleToggle} />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <p className="text-gray-500 ">Remember me</p>
                </div>
              </div>
              <Link
                className="text-sm font-medium text-primary hover:underline"
                to="/login"
              >
                Forgot password?
              </Link>
            </div>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <button
              type="submit"
              disabled={isLogging}
              className="w-full disabled:cursor-not-allowed text-white h-12 bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary hover:bg-white hover:text-primary border border-2 border-primary"
            >
              {isLogging ? (
                <div className="flex justify-center">
                  <SubmitSpinner className="w-8 text-white animate-spin" />
                </div>
              ) : (
                <span>Sign in</span>
              )}
            </button>
            <p className="text-sm font-light text-gray-500">
              Don&apos;t have an account yet?
              <NavLink
                className="ml-1 text-sm font-medium text-primary hover:underline hover:text-blue-700"
                to="/register"
              >
                SignUp
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
