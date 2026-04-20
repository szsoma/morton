import { getPayload } from "payload";
import config from "@payload-config";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSlider from "@/components/ProductSlider";
import InfoSection from "@/components/InfoSection";
import Advantages from "@/components/Advantages";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const payload = await getPayload({ config });

  const [hero, infoSection, advantages, contactSection, footer, siteSettings, products] =
    await Promise.all([
      payload.findGlobal({ slug: "hero" }),
      payload.findGlobal({ slug: "info-section" }),
      payload.findGlobal({ slug: "advantages" }),
      payload.findGlobal({ slug: "contact-section" }),
      payload.findGlobal({ slug: "footer" }),
      payload.findGlobal({ slug: "site-settings" }),
      payload.find({
        collection: "products",
        sort: "order",
      }),
    ]);

  return (
    <>
      <Navbar navLinks={siteSettings.navLinks} />
      <main className="pt-[37px]">
        <Hero data={hero} />
        <ProductSlider products={products.docs as any} />
        <InfoSection data={infoSection} />
        <Advantages data={advantages} />
        <ContactSection data={contactSection} />
        <Footer data={footer} />
      </main>
    </>
  );
}
