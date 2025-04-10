import { ContactForm } from "@/components/forms/ContactForm";
import Head from "next/head";
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

      <section className="bg-[#dce6f6] px-16 py-32">
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
