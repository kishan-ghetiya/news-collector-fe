import { ContactForm } from "@/components/forms/ContactForm";
import Head from "next/head";
import Image from "next/image";
import { FC } from "react";

const page: FC = () => {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Contact us for inquiries and support."
        />
      </Head>

      <section className="bg-[#dce6f6] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Block */}
            <div className="bg-white rounded-3xl shadow-md p-8">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/dec2.jpg"
                  alt="Contact Icon"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <p className="text-gray-700 text-base font-medium">
                  Contact us for inquiries.
                </p>
              </div>
              <hr className="border-black my-4" />
              <h2 className="text-4xl font-bold tracking-wide uppercase text-black">
                Contact
              </h2>
            </div>

            {/* Right Block */}
            <div className="space-y-6">
              <a
                href="tel:+51234567890"
                className="block bg-[#dce6f6] text-center text-xl text-black font-medium rounded-2xl border-4 border-white px-6 py-5 shadow-md"
              >
                +5 (123) 456-78-90
              </a>
              <a
                href="mailto:info@frenzzy.com"
                className="block bg-[#dce6f6] text-center text-xl text-black font-medium rounded-2xl border-4 border-white px-6 py-5 shadow-md"
              >
                info@frenzzy.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#dce6f6] px-16">
        <div className="max-w-3xl mx-auto bg-[#dce6f6] rounded-3xl border-4 border-white p-10 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-black">
            SEND US A MESSAGE
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default page;
