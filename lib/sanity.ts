import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getProducts() {
  return client.fetch(`
    *[_type == "product" && available == true] | order(featured desc, name asc) {
      _id, name, slug, origin, roastLevels, pricingTiers, moq,
      shortDescription, image, featured, inStock, badge
    }
  `);
}

export async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product" && available == true && featured == true][0...6] {
      _id, name, slug, origin, roastLevels, pricingTiers, moq,
      shortDescription, image, inStock, badge
    }
  `);
}