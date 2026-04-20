import type { GlobalConfig } from "payload";

const linkField = (name: string) => ({
  name,
  type: "array" as const,
  fields: [
    { name: "label", type: "text" as const, required: true },
    { name: "url", type: "text" as const, required: true },
  ],
});

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    { name: "blurb", type: "text" },
    { name: "newsletterHeading", type: "text" },
    { name: "newsletterDescription", type: "text" },
    linkField("serviceLinks"),
    linkField("aboutLinks"),
    linkField("socialLinks"),
    { name: "copyrightText", type: "text" },
  ],
};
