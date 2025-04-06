"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {/* <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Logo" width={120} height={40} className="object-contain" />
          </Link> */}

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            <Link
              href="/categories"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Categories
            </Link>
            <Link
              href="/blog"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Posts
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center space-x-2">
            <form action="#" className="relative">
              <input
                type="search"
                id="search"
                name="query"
                placeholder="Type something"
                required
                className="border border-gray-300 rounded-full px-4 py-1 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Image src="/search.png" alt="Search" width={16} height={16} />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
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
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link href="/" className="block text-gray-800 hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-800 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="/categories"
              className="block text-gray-800 hover:text-blue-600"
            >
              Categories
            </Link>
            <Link
              href="/blog"
              className="block text-gray-800 hover:text-blue-600"
            >
              Posts
            </Link>
            <Link
              href="/contact"
              className="block text-gray-800 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
