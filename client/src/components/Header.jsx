import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);
  return (
    <div className="flex flex-col item-center mt-20 px-4 text-center text-gray-800">
      <div className="space-y-20">
        <h1 className="text-6xl font-bold"> MERN AUTH</h1>

        <p className="text-3xl"> Hey {userData ? userData.name : "Jon Doe"} </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quidem
          nostrum eligendi, saepe autem non commodi nobis nam nesciunt explicabo
          amet. Blanditiis adipisci delectus amet numquam officia quae.
          Cupiditate, vel?
        </p>

        <button className="border border-gray-500 rounded-full px-8 py-2">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Header;
