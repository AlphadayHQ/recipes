import type { FC } from "react";
import { Link } from "react-router-dom";

const Logo: FC = () => {
  return (
    <div className="flex items-center whitespace-nowrap">
      <Link
        to="/"
        className="relative flex items-center font-bold tracking-[-1px] no-underline"
      >
        <img
          src="/logo.png"
          alt="Alphaday"
          className="mr-1.25 block h-8 focus:outline-none"
        />
        <div className="text-[19px] sm:text-[23.5px] text-white font-semibold">
          <span>AlphaRecipes</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
