import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface NavbarProps {
  user: { name: string; role: string };
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-4">
        {/* Add language switcher or other left-side controls here if needed */}
      </div>
      <div className="flex items-center gap-2 relative">
        <FaUserCircle className="text-2xl text-blue-700" />
        <div className="flex flex-col items-start text-left">
          <span className="font-semibold text-sm">{user.name}</span>
          <span className="text-xs text-gray-400">{user.role}</span>
        </div>
        {/* Add dropdown for settings/logout if needed */}
      </div>
    </header>
  );
};

export default Navbar;
