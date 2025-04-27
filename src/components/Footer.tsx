"use client";

import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-cover bg-center bg-no-repeat">
      <div className="fixed bottom-0 left-0 w-full bg-white text-black dark:bg-gray-900 dark:text-white z-50 shadow-inner">
        <div className="flex justify-end items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <form className="flex items-center gap-3">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Stay ahead with our daily updates!
            </p>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-md text-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="font-medium transition-colors duration-300 bg-purple text-white py-2 px-6 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between px-6 py-3 text-sm w-full">
          <div className="flex-1 text-center">
            <span>
              © {new Date().getFullYear()}{" "}
              <Link href="/" className="font-medium hover:underline text-white">
                News collector
              </Link>{" "}
              • All rights reserved.
            </span>
          </div>

          <div className="flex gap-3">
            <a
              href="https://github.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="hover:text-blue-500" />
            </a>
            <a
              href="https://twitter.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-blue-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
