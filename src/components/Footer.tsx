"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[url('/footer-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="py-16 pb-[80px]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* Contact Section */}
          <div className="bg-white rounded-2xl p-6 flex flex-col">
            <h4 className="uppercase font-medium underline text-lg mb-4">
              contact
            </h4>
            <Link
              href="mailto:test@gmail.com?subject=Your%20Mail"
              className="flex items-center gap-4 mb-4 text-black no-underline"
            >
              <Image
                src="/email.png"
                alt="Email"
                width={40}
                height={40}
                className="bg-black p-2.5 rounded-lg"
              />
              <div>hello@frenzy.webflow.io</div>
            </Link>
            <Link
              href="tel:+1231685496"
              className="flex items-center gap-4 text-black no-underline"
            >
              <Image
                src="/phone.png"
                alt="Phone"
                width={40}
                height={40}
                className="bg-black p-2.5 rounded-lg"
              />
              <div>+5 (123) 456 789 0</div>
            </Link>
          </div>

          {/* Newsletter Section */}
          <div className="bg-white rounded-2xl p-6">
            <h4 className="uppercase font-medium underline text-lg mb-4">
              newsletter
            </h4>
            <p className="mb-4 text-gray-700">
              Stay ahead of the curve with our exclusive daily newsletter
              directly in your inbox!
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="your e-mail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-black text-white py-2 rounded-md uppercase font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="fixed bottom-0 left-0 w-full bg-white text-black dark:bg-gray-900 dark:text-white z-50 shadow-inner">
        <div className="flex items-center justify-between px-6 py-4 text-sm">
          {/* Empty div to balance center alignment */}
          <div className="w-1/3" />

          {/* Center content */}
          <div className="w-1/3 text-center">
            <span>
              <Link href="/" className="font-medium hover:underline">
                News collector
              </Link>{" "}
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>

          {/* Right side icons */}
          <div className="w-1/3 flex justify-end gap-3">
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
