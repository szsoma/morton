import Button from "./ui/Button";

function extractPlainText(root: any): string {
  if (!root?.root?.children) return "";
  return root.root.children
    .map((node: any) => node.children?.map((c: any) => c.text ?? "").join("") ?? "")
    .join("\n");
}

const defaultBody =
  "Ultra-fast, ultra-refined. The Ultra Collection is engineered for speed with aero-tuned, Bluesign®-approved fabrics that cut drag and maximize efficiency. A second-skin fit moves with you, while moisture-wicking tech and strategic ventilation keep you cool when the pace heats up. Reflective details, radio pockets, and bonded seams add pro-level function—because every watt counts.";

interface InfoSectionProps {
  data?: {
    body?: any;
    buttonLabel?: string;
    buttonLink?: string;
    backgroundImage?: { url?: string } | null;
  };
}

export default function InfoSection({ data }: InfoSectionProps) {
  const bodyText = data?.body ? extractPlainText(data.body) : defaultBody;
  const buttonLabel = data?.buttonLabel ?? "Learn more";
  const bgImage = data?.backgroundImage?.url ?? "/images/info-bg.png";

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[785px] mx-auto px-6 md:px-16 flex flex-col gap-5" data-reveal="stagger">
        <p className="font-[family-name:var(--font-geist)] font-normal text-[12px] text-white tracking-[0.36px] uppercase leading-[1.5]"
          data-reveal-child>
          {bodyText}
        </p>
        <div data-reveal-child>
          <Button variant="small" text={buttonLabel} />
        </div>
      </div>
    </section>
  );
}
