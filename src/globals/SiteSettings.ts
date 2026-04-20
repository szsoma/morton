import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  fields: [
    { name: "siteTitle", type: "text" },
    { name: "siteDescription", type: "text" },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "logoWhite", type: "upload", relationTo: "media" },
    {
      name: "navLinks",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};
