"use client";

import { useState } from "react";

interface Advantage {
  word: string;
  tooltipText: string;
  gridArea: string;
  tooltipPosition: { left?: string; right?: string; top: string };
}

function extractPlainText(root: any): string {
  if (!root?.root?.children) return "";
  return root.root.children
    .map((node: any) => node.children?.map((c: any) => c.text ?? "").join("") ?? "")
    .join("\n");
}

const defaultAdvantages: Advantage[] = [
  {
    word: "Quality",
    tooltipText:
      "Ultra-fast, ultra-refined. The Ultra Collection is engineered for speed with aero-tuned, Bluesign®-approved fabrics that cut drag and maximize efficiency. A second-skin fit moves with you, while moisture-wicking tech and strategic ventilation keep you cool when the pace heats up.",
    gridArea: "1 / 2 / 2 / 3",
    tooltipPosition: { left: "60px", top: "34px" },
  },
  {
    word: "Love",
    tooltipText: "Designed with passion for cyclists who demand the best from their gear.",
    gridArea: "3 / 1 / 4 / 2",
    tooltipPosition: { top: "34px", left: "0" },
  },
  {
    word: "LONG-LASTING",
    tooltipText:
      "Built to endure thousands of kilometers. Premium materials and reinforced construction ensure your Morton bag goes the distance season after season.",
    gridArea: "3 / 3 / 4 / 4",
    tooltipPosition: { top: "34px", left: "0" },
  },
  {
    word: "Bold",
    tooltipText:
      "Ultra-fast, ultra-refined. The Ultra Collection is engineered for speed with aero-tuned, Bluesign®-approved fabrics that cut drag and maximize efficiency. A second-skin fit moves with you, while moisture-wicking tech and strategic ventilation keep you cool when the pace heats up.",
    gridArea: "2 / 4 / 3 / 5",
    tooltipPosition: { right: "-18px", top: "58px" },
  },
];

const defaultImages = [
  { src: "/images/advantages/image-1.png", gridArea: "1 / 1 / 2 / 2" },
  { src: "/images/advantages/image-2.png", gridArea: "1 / 4 / 2 / 5" },
  { src: "/images/advantages/image-3.png", gridArea: "3 / 2 / 4 / 3" },
  { src: "/images/advantages/image-4.png", gridArea: "3 / 4 / 4 / 5" },
];

interface AdvantagesProps {
  data?: {
    items?: Array<{
      word?: string;
      tooltipText?: any;
      image?: { url?: string } | null;
      gridArea?: string;
      id?: string;
    }>;
  };
}

function AdvantageWord({ advantage, ...rest }: { advantage: Advantage } & React.HTMLAttributes<HTMLDivElement>) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative cursor-default"
      style={{ gridArea: advantage.gridArea }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      <p
        className="font-[family-name:var(--font-geist-mono)] font-normal text-black uppercase tracking-[-1.28px] whitespace-nowrap"
        style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
      >
        {advantage.word}
      </p>
      <div
          className={`absolute bg-gray-100 p-[10px] z-10 transition-opacity duration-200 ${hovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{
            ...advantage.tooltipPosition,
            width: "272px",
          }}
        >
          <p className="font-[family-name:var(--font-geist)] font-normal text-[12px] text-black tracking-[0.36px] uppercase leading-[1.3] text-justify">
            {advantage.tooltipText}
          </p>
        </div>
    </div>
  );
}

export default function Advantages({ data }: AdvantagesProps) {
  let advantages: Advantage[];
  let images: { src: string; gridArea: string }[];

  if (data?.items?.length) {
    // Split CMS items into advantages (have word) and images (have image but no word)
    const cmsAdvantages = data.items.filter((item) => item.word);
    const cmsImages = data.items.filter((item) => item.image && !item.word);

    // Map CMS advantages, keeping default tooltipPosition per word
    advantages = cmsAdvantages.map((item, index) => {
      // Find the matching default to get its tooltipPosition
      const defaultAdv = defaultAdvantages.find((d) => d.word === item.word) ?? defaultAdvantages[index] ?? defaultAdvantages[0];
      return {
        word: item.word ?? defaultAdv.word,
        tooltipText: item.tooltipText ? extractPlainText(item.tooltipText) : defaultAdv.tooltipText,
        gridArea: item.gridArea ?? defaultAdv.gridArea,
        tooltipPosition: defaultAdv.tooltipPosition,
      };
    });

    images = cmsImages.map((item, index) => ({
      src: item.image?.url ?? defaultImages[index]?.src ?? "",
      gridArea: item.gridArea ?? defaultImages[index]?.gridArea ?? "",
    }));

    // Fallback to defaults if either array is empty after splitting
    if (!advantages.length) advantages = defaultAdvantages;
    if (!images.length) images = defaultImages;
  } else {
    advantages = defaultAdvantages;
    images = defaultImages;
  }

  return (
    <section className="w-full px-4 md:px-[58px] py-16 md:py-20">
      {/* Desktop grid */}
      <div className="hidden lg:grid gap-x-[33px] gap-y-4" style={{ gridTemplateColumns: "210px 1fr 1fr 210px" }} data-reveal="stagger">
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden rounded-sm" style={{ gridArea: img.gridArea, aspectRatio: "2/3" }} data-reveal-child>
            <img src={img.src} alt="" className="w-full h-full object-contain" />
          </div>
        ))}
        {advantages.map((adv) => (
          <AdvantageWord key={adv.word} advantage={adv} data-reveal-child />
        ))}
      </div>

      {/* Mobile / tablet: stacked */}
      <div className="lg:hidden flex flex-col gap-8" data-reveal="stagger">
        {[
          { type: "image", src: images[0]?.src },
          { type: "advantage", data: advantages[0] },
          { type: "image", src: images[1]?.src },
          { type: "advantage", data: advantages[3] ?? advantages[1] },
          { type: "image", src: images[2]?.src },
          { type: "advantage", data: advantages[2] },
          { type: "image", src: images[3]?.src },
          { type: "advantage", data: advantages[1] },
        ].map((item, i) =>
          item.type === "image" ? (
            <div key={i} className="overflow-hidden rounded-sm" style={{ aspectRatio: "2/3" }} data-reveal-child>
              <img src={item.src!} alt="" className="w-full h-full object-contain" />
            </div>
          ) : (
            <AdvantageWord key={item.data!.word} advantage={item.data!} data-reveal-child />
          )
        )}
      </div>
    </section>
  );
}
