import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "isNew", "order"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "isNew",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" || operation === "update") {
          if (data.name) {
            data.slug = data.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
          }
        }
        return data;
      },
    ],
  },
};
