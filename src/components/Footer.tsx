"use client";

import Button from "./ui/Button";

const defaultServiceLinks = [
  { label: "Contact", url: "#" },
  { label: "Shipping", url: "#" },
  { label: "Returns", url: "#" },
  { label: "Warranty", url: "#" },
];
const defaultAboutLinks = [
  { label: "Press", url: "#" },
  { label: "About me", url: "#" },
  { label: "Changelog", url: "#" },
  { label: "Materials", url: "#" },
];
const defaultSocialLinks = [
  { label: "Instagram", url: "#" },
  { label: "TikTok", url: "#" },
];

interface FooterProps {
  data?: {
    blurb?: string;
    newsletterHeading?: string;
    newsletterDescription?: string;
    serviceLinks?: { label: string; url: string }[];
    aboutLinks?: { label: string; url: string }[];
    socialLinks?: { label: string; url: string }[];
    copyrightText?: string;
  };
}

export default function Footer({ data }: FooterProps) {
  const blurb =
    data?.blurb ??
    "All orders ship within 24 business hours.\n3-year product warranty\n30-day returns";
  const newsletterHeading =
    data?.newsletterHeading ?? "Get updates about new drops!";
  const newsletterDescription =
    data?.newsletterDescription ??
    "Receive updates on pre-access, product drops, exclusive member offers, events, and more — delivered right to your inbox.";
  const serviceLinks = data?.serviceLinks ?? defaultServiceLinks;
  const aboutLinks = data?.aboutLinks ?? defaultAboutLinks;
  const socialLinks = data?.socialLinks ?? defaultSocialLinks;
  const copyrightText =
    data?.copyrightText ?? "COPYRIGHT 20-25. MORTON Backpacks.";

  return (
    <footer className="bg-black w-full">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Top section */}
        <div
          className="flex flex-col md:flex-row items-start justify-between gap-12 pt-24 pb-16"
          data-reveal="fade-up"
        >
          {/* Left: info + newsletter */}
          <div className="flex flex-col gap-8 max-w-[440px]">
            <p className="font-[family-name:var(--font-geist-mono)] font-semibold text-[20px] text-white uppercase leading-tight">
              {blurb.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < blurb.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="font-[family-name:var(--font-geist)] font-semibold text-[14px] text-white">
                  {newsletterHeading}
                </p>
                <p className="font-[family-name:var(--font-geist)] font-normal text-[14px] text-white/70 leading-[1.2]">
                  {newsletterDescription}
                </p>
              </div>
              <div className="flex flex-col gap-4 max-w-[440px]">
                <input
                  type="email"
                  placeholder="email"
                  className="border-2 border-white bg-transparent text-white font-[family-name:var(--font-geist)] font-medium text-[14px] px-[10px] py-[12px] placeholder:text-white/50 focus:outline-none focus:border-morton-neon focus:shadow-[0_0_0_2px_rgba(229,252,116,0.3)] transition-all duration-200"
                />
                <Button variant="small" text="Subscribe" className="w-fit" />
              </div>
            </div>
          </div>

          {/* Right: link columns */}
          <div
            className="flex gap-5 text-white text-[14px]"
            data-reveal="stagger"
          >
            <div className="flex flex-col gap-6 w-[95px]" data-reveal-child>
              <p className="font-[family-name:var(--font-geist-mono)] font-semibold uppercase">
                Service
              </p>
              <div className="flex flex-col gap-[10px] font-[family-name:var(--font-geist)] font-normal whitespace-nowrap">
                {serviceLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    className="hover:text-morton-neon transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 w-[95px]" data-reveal-child>
              <p className="font-[family-name:var(--font-geist-mono)] font-semibold uppercase">
                About
              </p>
              <div className="flex flex-col gap-[10px] font-[family-name:var(--font-geist)] font-normal whitespace-nowrap">
                {aboutLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    className="hover:text-morton-neon transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 w-[95px]" data-reveal-child>
              <p className="font-[family-name:var(--font-geist-mono)] font-semibold uppercase">
                Social
              </p>
              <div className="flex flex-col gap-[10px] font-[family-name:var(--font-geist)] font-normal whitespace-nowrap">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    className="hover:text-morton-neon transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: full-width white logo + copyright */}
        <div className="flex flex-col gap-4 pb-8 pt-4">
          <img
            src="/images/logo.svg"
            alt="Morton logo"
            className="w-full h-auto object-contain"
          />
          <div className="font-[family-name:var(--font-geist)] font-normal text-[12px] text-white leading-[1.2]">
            <p>{copyrightText}</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
