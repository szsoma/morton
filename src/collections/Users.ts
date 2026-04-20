import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {},
  access: {
    admin: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
