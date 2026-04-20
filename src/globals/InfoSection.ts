import type { GlobalConfig } from "payload";

export const InfoSection: GlobalConfig = {
  slug: "info-section",
  fields: [
    {
      name: "body",
      type: "richText",
      required: true,
    },
    {
      name: "buttonLabel",
      type: "text",
      defaultValue: "Learn more",
    },
    {
      name: "buttonLink",
      type: "text",
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
