import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContext);

  const navigate = useNavigate();

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedIn, userData]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-blue-200 
  to-purple-400"
    >
      <div
        className=" flex items-center justify-center bg-black px-10
         rounded-md text-white relative group cursor-pointer mb-10"
      >
        <div
        // className="absolute hidden group-hover:block top-5 right-0 mt-2 z-10
        //  bg-white shadow-lg rounded-md border border-gray-200 min-w-40 overflow-hidden"
        >
          <div className="">
            {!userData.isAccountVerified && (
              <div
                onClick={sendVerificationOtp}
                className="px-10 py-2 text-white hover:text-red-500
              cursor-pointer text-sm whitespace-nowrap"
              >
                CLICK TO VERIFY EMAIL
              </div>
            )}
          </div>
        </div>
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-600 text-sm p-8 shadow-lg "
      >
        <h1 className="text-white text-2xl"> Email Verify OTP </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your 6 digits code sent to you email id.
        </p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-blue-900 text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        <button className="rounded-full text-white mt-3 w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900">
          verify email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
