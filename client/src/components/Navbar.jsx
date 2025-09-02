import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

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

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className="w-full flex justify-between items-center p-4 
    sm:p-6 sm:px-24 absolute top-0"
    >
      <div className="w-28 sm:2-32">Auth</div>
      {userData ? (
        <div
          className="w-8 h-8 flex items-center justify-center bg-black p-1
         rounded-md text-white relative group cursor-pointer"
        >
          {userData.name[0].toUpperCase()}
          <div
            className="absolute hidden group-hover:block top-5 right-0 mt-2 z-10
           bg-white shadow-lg rounded-md border border-gray-200 min-w-40 overflow-hidden"
          >
            <div className="py-1">
              {!userData.isAccountVerified && (
                <div
                  onClick={sendVerificationOtp}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100
              cursor-pointer text-sm whitespace-nowrap"
                >
                  Verify Email
                </div>
              )}

              <div
                onClick={() => logout()}
                className="px-3 py-2 text-red-600 hover:bg-red-50 
              cursor-pointer text-sm whitespace-nowrap"
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full text-gray-800 px-6 py-2 transition-all hover:bg-gray-100"
        >
          Log in
        </button>
      )}
    </div>
  );
};

export default Navbar;
