import type { GlobalConfig } from "payload";

export const Hero: GlobalConfig = {
  slug: "hero",
  fields: [
    {
      name: "headline",
      type: "text",
      defaultValue: "Morton Backpacks",
      required: true,
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "posterImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
