import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerimg from "../../assets/others/authentication2.png";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosCommon from "../../Hook/useAxiosCommon";
import Swal from "sweetalert2";

const Register = () => {
  const { updateUserProfile, CreateUser, googleSignIn } = useContext(AuthContext);
  const [ShowPassword, SetShowPassword] = useState(false);
  const navigate = useNavigate()
  const axiosCommon = useAxiosCommon()
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    CreateUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
  
        // Update profile
        updateUserProfile(data.name, data.image)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,

            }
            axiosCommon.post('/users', userInfo)
            .then(result => {
              console.log(result.data);
              navigate(from)
            })
            
          })
          .catch((error) => {
            console.error('Error updating profile:', error);
          });
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  }




    const handleWithGoogleLoginIn = () => {
      googleSignIn()
        .then((res) => {
      console.log(res.user);
      const userInfo = {
        email: res.user?.email,
        name: res.user?.displayName,
      }

      axiosCommon.post('/users', userInfo)
      .then(res => {
        console.log(res.data);
        if(res.data.insertedId){
          Swal.fire({
            title: "Sucessfully signed in",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from)
        }
      })
        })
    };

  return (
    <div>
      <Helmet>
        <title>Register - MedConsultPro</title>
      </Helmet>
      <div className="font-[sans-serif] ">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
            <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="mb-10">
                  <h3 className="text-3xl font-extrabold">Registration!</h3>
                  <p className="text-sm mt-4">
                    Registration to your account and explore a world of
                    possibilities. Your journey begins here.
                  </p>
                </div>
                <div>
                  <label className="text-sm mb-2 block">User Name</label>
                  <div className="relative flex items-center">
                    <input
                      name="name"
                      {...register("name", { required: true })}
                      type="text"
                      className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                      placeholder="Enter Your Name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                {errors.name && (
                  <span className="text-red-500"> This field is required</span>
                )}

                <div>
                  <label className="text-sm mb-2 block">photoURL</label>
                  <div className="relative flex items-center">
                    <input
                      name="image"
                      {...register("image", { required: true })}
                      type="text"
                      className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                      placeholder="Image Link"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                {errors.image && (
                  <span className="text-red-500"> This field is required</span>
                )}
                <div>
                  <label className="text-sm mb-2 block">User Email</label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      {...register("email", { required: true })}
                      type="email"
                      className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                      placeholder="Enter Your Email"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 682.667 682.667"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path
                            d="M0 512h512V0H0Z"
                            data-original="#000000"
                          ></path>
                        </clipPath>
                      </defs>
                      <g
                        clipPath="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          fill="none"
                          strokeMiterlimit="10"
                          strokeWidth="40"
                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <span className="text-red-500"> This field is required</span>
                )}
                <div>
                  <label className="text-sm mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        maxLength: 20,
                        pattern:
                          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                      })}
                      type={ShowPassword ? "text" : "password"}
                      className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-[#333]"
                      placeholder="Enter password"
                    />
                    {/* ShowPassword */}
                    <span
                      onClick={() => SetShowPassword(!ShowPassword)}
                      className="w-4 h-4 absolute right-4 cursor-pointer"
                    >
                      {ShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </span>
                  </div>
                </div>
                {errors.password?.type === "required" && (
                  <span className="text-red-500"> Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500">
                    {" "}
                    Password must be at least 8 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-500">
                    {" "}
                    Password must be less than 20 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500">
                    Your password must have at least a special
                    symbol, upper and lower case letters and a number
                  </span>
                )}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-blue-600 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div className="!mt-10">
                  <button
                    type="submit"
                    className="w-full shadow-xl rounded-2xl py-2.5 px-4 text-sm font-semibold text-white bg-[#3498db] hover:bg-blue-700 focus:outline-none"
                  >
                    Registration
                  </button>
                </div>
                <p className="text-sm !mt-10 text-center">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap cursor-pointer font-bold"
                  >
                    Sign In
                  </Link>
                </p>
                <div className="!mt-10 space-x-8 flex justify-center">
                  <button 
                  
                  onClick={handleWithGoogleLoginIn}
                  
                  type="button" className="border-none outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30px"
                      className="inline"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#fbbd00"
                        d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                        data-original="#fbbd00"
                      />
                      <path
                        fill="#0f9d58"
                        d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                        data-original="#0f9d58"
                      />
                      <path
                        fill="#31aa52"
                        d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                        data-original="#31aa52"
                      />
                      <path
                        fill="#3c79e6"
                        d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                        data-original="#3c79e6"
                      />
                      <path
                        fill="#cf2d48"
                        d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                        data-original="#cf2d48"
                      />
                      <path
                        fill="#eb4132"
                        d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                        data-original="#eb4132"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:h-[600px] max-md:mt-10">
              <img
                src={registerimg}
                className="w-full h-full object-cover rounded-xl"
                alt="Dining Experience"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
