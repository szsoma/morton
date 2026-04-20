import Button from "./ui/Button";

interface ContactSectionProps {
  data?: {
    badge?: string;
    headline?: string;
    bodyText?: string;
    buttonLabel?: string;
    productImage?: { url?: string } | null;
  };
}

export default function ContactSection({ data }: ContactSectionProps) {
  const badge = data?.badge ?? "Custom design";
  const headline = data?.headline ?? "Can't find what you want?";
  const bodyText = data?.bodyText ?? "Spice up your bag with your favorite colors";
  const buttonLabel = data?.buttonLabel ?? "Send message";
  const productImage = data?.productImage?.url ?? "/images/contact-product.png";

  return (
    <section id="custom" className="w-full bg-gray-50">
      <div className="mx-auto max-w-[1440px] h-[100-dvh] min-h-[600px] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-6 md:px-10 py-16">
        {/* Text content */}
        <div className="flex flex-col gap-6 max-w-[459px]" data-reveal="fade-right">
          <div className="flex flex-col gap-4">
            <span className="inline-block bg-gray-300 font-[family-name:var(--font-geist-mono)] font-semibold text-[12px] text-black tracking-[-0.24px] uppercase px-[5px] py-[2px] rounded-[2px] w-fit">
              {badge}
            </span>
            <h2 className="font-[family-name:var(--font-geist)] font-semibold text-black uppercase tracking-[-1.16px]"
              style={{ fontSize: "clamp(36px, 4vw, 58px)" }}
            >
              {headline}
            </h2>
          </div>
          <p className="font-[family-name:var(--font-geist)] font-normal text-[14px] text-black tracking-[-0.28px] leading-[1.2]">
            {bodyText}
          </p>
          <div>
            <Button variant="dark" text={buttonLabel} />
          </div>
        </div>

        {/* Product image */}
        <div className="w-[272px] h-[340px] overflow-hidden rounded-sm flex-shrink-0" data-reveal="fade-left">
          <img
            src={productImage}
            alt="Custom Morton backpack"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
