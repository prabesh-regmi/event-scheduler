/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { registerHandler } from "../../../services";
import SubmitSpinner from "../../../components/common/SubmitSpinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { login } from "../../../redux/slices/loginSlice";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((store) => store.login);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);

  const validatePasswordMatch = (value) => {
    const password = getValues("password");
    return value === password || "Passwords do not match";
  };
  const onSubmit = async (payload) => {
    setMessage("");
    setIsLoading(true);
    const user = await registerHandler(payload);
    if (user.id) {
      dispatch(login({ user }));
      reset();
      setIsLoading(false);
      navigate("/");
    }
    setMessage(user.message);
    setIsLoading(false);
  };
  return (
    <section className="bg-gray-100 min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-10 border">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl md:mt-0 xl:p-0">
        <div className="p-6 space-y-3 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl uppercase text-center text-purple-800">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Full Name
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.name ? "border-red-300" : ""
                }`}
                placeholder="Enter you Full Name"
                autoComplete="name"
                {...register("name", {
                  required: "Full Name cannot be empty",
                })}
              />
              {errors.name && (
                <p className="text-red-600 text-sm pt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
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
                className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  errors.email ? "border-red-300" : ""
                }`}
                placeholder="name@company.com"
                autoComplete="email"
                {...register("email", {
                  required: "Email cannot be empty",
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm pt-1">
                  {errors.email.message}
                </p>
              )}
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
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    errors.password ? "border-red-300" : ""
                  }`}
                  placeholder="Enter your Password"
                  autoComplete="password1"
                  {...register("password", {
                    required: "Password cannot be empty",
                  })}
                />

                <div className="absolute right-0 flex justify-center items-center h-full mr-3">
                  {passwordShown ? (
                    <VisibilityOutlinedIcon
                      onClick={() => {
                        setPasswordShown(!passwordShown);
                      }}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      onClick={() => {
                        setPasswordShown(!passwordShown);
                      }}
                    />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm pt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
                <span className="text-red-600">*</span>
              </label>
              <div className="relative flex w-full h-full">
                <input
                  type={passwordShown ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    errors.confirmPassword ? "border-red-300" : ""
                  }`}
                  placeholder="Re Enter you Password"
                  autoComplete="password2"
                  {...register("confirmPassword", {
                    required: "Confirm Password cannot be empty",
                    validate: validatePasswordMatch,
                  })}
                />

                <div className="absolute right-0 flex justify-center items-center h-full mr-3">
                  {passwordShown ? (
                    <VisibilityOutlinedIcon
                      onClick={() => {
                        setPasswordShown(!passwordShown);
                      }}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      onClick={() => {
                        setPasswordShown(!passwordShown);
                      }}
                    />
                  )}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm pt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  I accept the Terms and Conditions
                </label>
              </div>
            </div>
            {message && (
              <div className="my-4">
                <ErrorMessage message={message} />
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full disabled:cursor-not-allowed text-white h-12 bg-primary-600 border border-primary-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center btn-primary"
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <SubmitSpinner />
                </div>
              ) : (
                <span>Create an account</span>
              )}
            </button>
            <p className="text-sm font-light text-gray-500">
              Already have an account?
              <NavLink to="/login" className="text-blue-700 ml-1">
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
