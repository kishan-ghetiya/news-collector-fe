import { ContactForm } from "@/components/forms/ContactForm";
import Head from "next/head";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

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

      <section className="bg-[#dce6f6] px-16 py-16 pb-40">
        <div className="max-w-3xl mx-auto bg-[#dce6f6] rounded-3xl border-4 border-white p-10 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-black">
            SEND US A MESSAGE
          </h2>
          <ContactForm />
        </div>
        {/* Contact Section */}
        <div className="max-w-3xl mx-auto bg-[#dce6f6] rounded-3xl border-4 border-white p-10 shadow-lg bg-white rounded-2xl mt-4 flex flex-col">
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
      </section>
    </>
  );
};

export default page;
