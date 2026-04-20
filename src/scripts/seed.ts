import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function richText(text: string) {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", text, version: 1 }],
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

async function uploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filePath: string,
) {
  const resolved = path.resolve(process.cwd(), filePath);
  const doc = await payload.create({
    collection: "media",
    data: {},
    filePath: resolved,
  });
  console.log(`  Uploaded: ${filePath} -> media id ${String(doc.id)}`);
  return String(doc.id);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function seed() {
  console.log("Initializing Payload...");
  const payload = await getPayload({ config });

  // -----------------------------------------------------------------------
  // 1. Upload all images
  // -----------------------------------------------------------------------
  console.log("\n--- Uploading images ---");

  const productImageIds: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const id = await uploadMedia(
      payload,
      `public/images/products/product-${i}.png`,
    );
    productImageIds.push(id);
  }

  const advantageImageIds: string[] = [];
  for (let i = 1; i <= 4; i++) {
    const id = await uploadMedia(
      payload,
      `public/images/advantages/image-${i}.png`,
    );
    advantageImageIds.push(id);
  }

  const heroCoverId = await uploadMedia(
    payload,
    "public/images/hero-cover.png",
  );
  const infoBgId = await uploadMedia(payload, "public/images/info-bg.png");
  const contactProductId = await uploadMedia(
    payload,
    "public/images/contact-product.png",
  );

  // -----------------------------------------------------------------------
  // 2. Create products
  // -----------------------------------------------------------------------
  console.log("\n--- Creating products ---");

  const productsData = [
    {
      name: "Jupiter 28 - 32L Backpack + 2L Sling",
      price: 175.99,
      image: productImageIds[0],
      isNew: true,
      order: 1,
    },
    {
      name: "Jupiter 28 - 32L backpack",
      price: 175.99,
      image: productImageIds[1],
      isNew: true,
      order: 2,
    },
    {
      name: "Jupiter 28 - 32L Backpack",
      price: 175.99,
      image: productImageIds[2],
      isNew: false,
      order: 3,
    },
    {
      name: "Jupiter 18L Tote bag",
      price: 175.99,
      image: productImageIds[3],
      isNew: false,
      order: 4,
    },
    {
      name: "Jupiter 18L Tote bag",
      price: 175.99,
      image: productImageIds[4],
      isNew: false,
      order: 5,
    },
  ];

  for (const product of productsData) {
    await payload.create({ collection: "products", data: product });
    console.log(`  Created product: ${product.name}`);
  }

  // -----------------------------------------------------------------------
  // 3. Update globals
  // -----------------------------------------------------------------------
  console.log("\n--- Updating globals ---");

  // Hero
  await payload.updateGlobal({
    slug: "hero",
    data: {
      headline: "Morton Backpacks",
      posterImage: heroCoverId,
    },
  });
  console.log("  Updated Hero");

  // InfoSection
  await payload.updateGlobal({
    slug: "info-section",
    data: {
      body: richText(
        "Ultra-fast, ultra-refined. The Ultra Collection is engineered for speed with aero-tuned, Bluesign\u00AE-approved fabrics that cut drag and maximize efficiency. A second-skin fit moves with you, while moisture-wicking tech and strategic ventilation keep you cool when the pace heats up. Reflective details, radio pockets, and bonded seams add pro-level function\u2014because every watt counts.",
      ),
      buttonLabel: "Learn more",
      backgroundImage: infoBgId,
    },
  });
  console.log("  Updated InfoSection");

  // Advantages
  await payload.updateGlobal({
    slug: "advantages",
    data: {
      items: [
        {
          word: "Quality",
          tooltipText: richText(
            "Ultra-fast, ultra-refined. The Ultra Collection is engineered for speed with aero-tuned, Bluesign\u00AE-approved fabrics that cut drag and maximize efficiency. A second-skin fit moves with you, while moisture-wicking tech and strategic ventilation keep you cool when the pace heats up.",
          ),
          image: advantageImageIds[0],
          gridArea: "1 / 2 / 2 / 3",
        },
        {
          word: "Bold",
          tooltipText: richText(
            "Ultra-fast, ultra-refined. The Ultra Collection is engineered for speed with aero-tuned, Bluesign\u00AE-approved fabrics that cut drag and maximize efficiency. A second-skin fit moves with you, while moisture-wicking tech and strategic ventilation keep you cool when the pace heats up.",
          ),
          image: advantageImageIds[1],
          gridArea: "2 / 4 / 3 / 5",
        },
        {
          word: "Love",
          tooltipText: richText(
            "Designed with passion for cyclists who demand the best from their gear.",
          ),
          image: advantageImageIds[2],
          gridArea: "3 / 1 / 4 / 2",
        },
        {
          word: "LONG-LASTING",
          tooltipText: richText(
            "Built to endure thousands of kilometers. Premium materials and reinforced construction ensure your Morton bag goes the distance season after season.",
          ),
          image: advantageImageIds[3],
          gridArea: "3 / 3 / 4 / 4",
        },
      ],
    },
  });
  console.log("  Updated Advantages");

  // ContactSection
  await payload.updateGlobal({
    slug: "contact-section",
    data: {
      badge: "Custom design",
      headline: "Can't find what you want?",
      bodyText: "Spice up your bag with your favorite colors",
      buttonLabel: "Send message",
      productImage: contactProductId,
    },
  });
  console.log("  Updated ContactSection");

  // Footer
  await payload.updateGlobal({
    slug: "footer",
    data: {
      blurb: "All orders ship within 24 business hours.\n3-year product warranty\n30-day returns",
      newsletterHeading: "Get updates about new drops!",
      newsletterDescription:
        "Receive updates on pre-access, product drops, exclusive member offers, events, and more \u2014 delivered right to your inbox.",
      serviceLinks: [
        { label: "Contact", url: "#custom" },
        { label: "Shipping", url: "#" },
        { label: "Returns", url: "#" },
        { label: "Warranty", url: "#" },
      ],
      aboutLinks: [
        { label: "Press", url: "#" },
        { label: "About me", url: "#" },
        { label: "Changelog", url: "#" },
        { label: "Materials", url: "#" },
      ],
      socialLinks: [
        { label: "Instagram", url: "#" },
        { label: "TikTok", url: "#" },
      ],
      copyrightText: "COPYRIGHT 20-25. MORTON Backpacks.\nAll rights reserved.",
    },
  });
  console.log("  Updated Footer");

  // SiteSettings
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      siteTitle: "Morton",
      siteDescription: "Morton Backpacks - Premium cycling bags and accessories",
      navLinks: [
        { label: "Shop", href: "#shop" },
        { label: "Custom", href: "#custom" },
        { label: "About", href: "#about" },
      ],
    },
  });
  console.log("  Updated SiteSettings");

  // -----------------------------------------------------------------------
  // Done
  // -----------------------------------------------------------------------
  console.log("\nSeed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
