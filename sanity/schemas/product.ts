import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Product Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (R) => R.required() }),
    defineField({
      name: "origin", title: "Origin", type: "string",
      options: { list: [
        { title: "Benguet",  value: "benguet"  },
        { title: "Sagada",   value: "sagada"   },
        { title: "Kalinga",  value: "kalinga"  },
        { title: "Mt. Apo",  value: "mt-apo"   },
        { title: "Bukidnon", value: "bukidnon" },
      ]},
      validation: (R) => R.required(),
    }),
    defineField({
      name: "roastLevels", title: "Available Roast Levels", type: "array",
      of: [{ type: "string" }],
      options: { list: [
        { title: "Green (Unroasted)", value: "green"  },
        { title: "Light Roast",       value: "light"  },
        { title: "Medium Roast",      value: "medium" },
        { title: "Dark Roast",        value: "dark"   },
      ]},
    }),
    defineField({
      name: "pricingTiers", title: "Pricing Tiers", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "weight", title: "Weight", type: "string", options: { list: ["100g","250g","500g","1kg"] } }),
          defineField({ name: "price",  title: "Price (PHP)", type: "number" }),
        ],
      }],
    }),
    defineField({
      name: "moq", title: "Minimum Order Quantity", type: "object",
      fields: [
        defineField({ name: "quantity", title: "Quantity", type: "number" }),
        defineField({ name: "unit",     title: "Unit",     type: "string", options: { list: ["grams","kg","bags","packs"] } }),
      ],
    }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3 }),
    defineField({ name: "image",     title: "Product Image",       type: "image", options: { hotspot: true } }),
    defineField({ name: "featured",  title: "Featured on Homepage", type: "boolean", initialValue: false }),
    defineField({ name: "inStock",   title: "In Stock",             type: "boolean", initialValue: true  }),
    defineField({ name: "available", title: "Visible on Site",      type: "boolean", initialValue: true  }),
    defineField({ name: "badge",     title: "Badge (e.g. New, Bestseller)", type: "string" }),
  ],
});