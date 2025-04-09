"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[url('/footer-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="py-[150px] pb-[110px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
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

          {/* Socials Section */}
          <div className="bg-white rounded-2xl p-6">
            <h4 className="uppercase font-medium underline text-lg mb-4">
              socials
            </h4>
            <div className="flex gap-4">
              {["fb", "twitter", "insta", "you", "pint"].map((icon, i) => (
                <Link
                  key={i}
                  href={`http://www.${icon === "you" ? "youtube" : icon === "pint" ? "pinterest" : icon}.com/`}
                  target="_blank"
                >
                  <Image
                    src={`/${icon}.png`}
                    alt={icon}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </Link>
              ))}
            </div>
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
      <div className="bg-black text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          © 2024 Frenzy - HTML Template. Made by{" "}
          <Link href="#" className="underline">
            Max Themes
          </Link>
        </div>
      </div>
    </footer>
  );
}
