"use client";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBell, FaCog, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import NewsCollectorLogo from "./icons/NewsCollectorLogo";
import Button from "./ui/Button";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <div className="container mx-auto mt-14 px-4">
        <div className="flex items-center justify-between h-20 shadow-lg bg-white rounded-xl px-4 sm:px-6 lg:px-8 transition-all duration-300 hover:shadow-xl">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 transition-transform duration-300 group-hover:scale-105">
              <NewsCollectorLogo />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-gray-900">News</span>
              <span className="text-base text-purple-700">Collector</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex space-x-8">
              {["Home", "About", "Categories", "Posts", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                    className="relative text-gray-700 font-medium group transition-all duration-300"
                  >
                    <span className="group-hover:text-purple-700 transition-colors duration-300">
                      {item}
                    </span>
                    <div className="absolute inset-x-0 -bottom-1">
                      <div className="h-[2px] w-0 bg-purple-700 transition-all duration-400 group-hover:w-full opacity-80" />
                    </div>
                  </Link>
                )
              )}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {!user ? (
                <>
                  <Link href="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 focus:outline-none group"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full  bg-purple  flex items-center justify-center text-white font-bold">
                        {user.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="font-medium text-gray-700 hidden lg:inline">
                      {user.fullName.split(" ")[0]}
                    </span>
                    <IoMdArrowDropdown
                      className={`text-gray-500 transition-transform duration-200 ${
                        isDropdownOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaUserCircle className="mr-3 text-gray-400" />
                        My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaCog className="mr-3 text-gray-400" />
                        Settings
                      </Link>
                      <Link
                        href="/notifications"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaBell className="mr-3 text-gray-400" />
                        Notifications
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          3
                        </span>
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <FaSignOutAlt className="mr-3" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-125"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <div
          className={`md:hidden mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="py-2 space-y-3 bg-white rounded-lg shadow-lg">
            {["Home", "About", "Categories", "Posts", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="block pl-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg py-2 transition-all duration-300 transform hover:translate-x-2 group"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="border-t pt-2 space-y-2">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="block pl-4 text-purple-700 hover:bg-purple-50 rounded-lg py-2 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block pl-4 text-purple-700 hover:bg-purple-50 rounded-lg py-2 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    className="block pl-4 text-gray-700 hover:bg-purple-50 rounded-lg py-2 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block pl-4 text-red-500 hover:bg-red-50 rounded-lg py-2 transition-all duration-300 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
