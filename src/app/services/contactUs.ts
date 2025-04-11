import { ContactUsPayload, ContactUsResponse } from "@/types/contact";
import apiClient from "../lib/apiClient";

export const contactUs = {
  contactus: (data: ContactUsPayload) =>
    apiClient<ContactUsResponse>("contact-us/submit", {
      method: "POST",
      body: data,
    }),
};
