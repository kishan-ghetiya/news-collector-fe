"use client";
import Link from "next/link";
import { useState } from "react";
import NewsCollectorLogo from "./icons/NewsCollectorLogo";
import Button from "./ui/Button";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="max-w-7xl mx-auto mt-14 px-4">
        <div className="flex items-center justify-between h-20 shadow-lg bg-white rounded-xl px-4 sm:px-6 lg:px-8 transition-all duration-300 hover:shadow-xl">
          {/* Logo */}
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

            <div className="hidden md:flex gap-4">
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-125"
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
              >
                {item}
              </Link>
            ))}
            <div className="border-t pt-2 space-y-2">
              <Link
                href="/login"
                className="block pl-4 text-purple-700 hover:bg-purple-50 rounded-lg py-2 transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block pl-4 text-purple-700 hover:bg-purple-50 rounded-lg py-2 transition-all duration-300"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
