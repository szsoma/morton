import type { GlobalConfig } from "payload";

export const ContactSection: GlobalConfig = {
  slug: "contact-section",
  fields: [
    {
      name: "badge",
      type: "text",
      defaultValue: "Custom design",
    },
    {
      name: "headline",
      type: "text",
      required: true,
    },
    {
      name: "bodyText",
      type: "text",
    },
    {
      name: "buttonLabel",
      type: "text",
      defaultValue: "Send message",
    },
    {
      name: "productImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
