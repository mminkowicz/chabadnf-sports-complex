import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "8rohmxes",   // from sanity.config.ts
  dataset: "production",   // from sanity.config.ts
  apiVersion: "2023-09-01", // or today’s date
  useCdn: false,            // set false to avoid cached data while testing
});
