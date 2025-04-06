"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NewsCollectorLogo from "./icons/NewsCollectorLogo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
              <span className="text-base font-bold text-gray-900 no-underline">
                News
              </span>
              <span className="text-base text-purple">Collector</span>
            </div>
          </Link>

          {/* Desktop Menu with double underline effect */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "About", "Categories", "Posts", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="relative text-gray-700 font-medium group transition-all duration-300 no-underline"
              >
                <span className="group-hover:text-purple transition-colors duration-300">
                  {item}
                </span>
                <div className="absolute inset-x-0 -bottom-1">
                  <div className="h-[2px] w-0 bg-purple transition-all duration-400 group-hover:w-full opacity-80" />
                  <div className="h-[1px] w-0 bg-purple transition-all duration-500 group-hover:w-full mt-[2px] opacity-60" />
                </div>
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center space-x-2">
            <form action="#" className="relative">
              <input
                type="search"
                placeholder="Type something"
                className="border border-gray-300 rounded-full px-4 py-1 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-purple transition-all duration-300 w-48 hover:w-56"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src="/search.png"
                  alt="Search"
                  width={16}
                  height={16}
                  className="hover:opacity-70 transition-opacity duration-300"
                />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none transition-transform duration-300 hover:scale-125"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
          className={`md:hidden mt-2 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}
        >
          <div className="py-2 space-y-3 bg-white rounded-lg shadow-lg">
            {["Home", "About", "Categories", "Posts", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="block pl-4 text-gray-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg py-2 transition-all duration-300 transform hover:translate-x-2 group"
              >
                {item}
                <div className="w-0 h-[1px] bg-blue-900 mt-1 transition-all duration-500 group-hover:w-3/4 opacity-60" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
