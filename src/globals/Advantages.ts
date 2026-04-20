import type { GlobalConfig } from "payload";

export const Advantages: GlobalConfig = {
  slug: "advantages",
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "word",
          type: "text",
          required: true,
        },
        {
          name: "tooltipText",
          type: "richText",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "gridArea",
          type: "text",
        },
      ],
    },
  ],
};
