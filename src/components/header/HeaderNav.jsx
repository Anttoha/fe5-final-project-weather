import React from "react";
import { cn } from "../../shared/utils/cn";

const HeaderNav = ({ setIsMenuOpen, className = "" }) => {
  return (
    <nav className={cn("flex site-md:flex-row flex-col", className)}>
      <ul className={cn("flex flex-col gap-6.25 site-md:flex-row site-md:gap-11.25 site-xl:gap-12.25")}>
        <li>
          <a href="#" className="font-alternates font-medium text-[10px] site-xl:text-xs pointer-events-none" onClick={() => setIsMenuOpen?.(false)}>Who we are</a>
        </li>
        <li>
          <a href="#" className="font-alternates font-medium text-[10px] site-xl:text-xs pointer-events-none" onClick={() => setIsMenuOpen?.(false)}>Contacts</a>
        </li>
        <li>
          <a href="#" className="font-alternates font-medium text-[10px] site-xl:text-xs pointer-events-none" onClick={() => setIsMenuOpen?.(false)}>Menu</a>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
