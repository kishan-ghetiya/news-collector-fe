"use client";

import Link from "next/link";
import { useState } from "react";
import NewsCollectorLogo from "./icons/NewsCollectorLogo";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItem";
import Backdrop from "./Menu/Backdrop";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="max-w-7xl mx-auto mt-14 px-4">
        <div className="flex items-center justify-between h-16 shadow-lg bg-white rounded-xl px-4 sm:px-6 lg:px-8 transition-all duration-300 hover:shadow-xl">
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

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            {/* Restored Search Component */}
            <div className="hidden md:flex items-center space-x-2">
              <form action="#" className="relative">
                <input
                  type="search"
                  placeholder="Search articles"
                  className="border border-gray-200 rounded-full px-4 py-1.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300 w-48 hover:w-56"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>
            </div>

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
                      <div className="h-[1px] w-0 bg-purple-700 transition-all duration-500 group-hover:w-full mt-[2px] opacity-60" />
                    </div>
                  </Link>
                )
              )}
            </nav>

            {/* User Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-purple-100 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>

          {/* User Menu Dropdown */}
          {isMenuOpen && (
            <>
              <Menu
                onClose={() => {
                  setIsMenuOpen(false);
                }}
              >
                <MenuItem href={"/login"}>Login</MenuItem>
                <MenuItem href={"/register"}>Register</MenuItem>
              </Menu>
              <span onClick={() => setIsMenuOpen(false)}>
                <Backdrop />
              </span>
            </>
          )}

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        <div
          className={`md:hidden mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="py-2 space-y-3 bg-white rounded-lg shadow-lg">
            {[
              "Home",
              "About",
              "Categories",
              "Posts",
              "Contact",
              "Login",
              "Register",
            ].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="block pl-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 rounded-lg py-2 transition-all duration-300 transform hover:translate-x-2 group"
              >
                {item}
                <div className="w-0 h-[1px] bg-purple-700 mt-1 transition-all duration-500 group-hover:w-3/4 opacity-60" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
