import React from "react";

type ButtonVariant = "small" | "dark";

interface ButtonProps {
  variant?: ButtonVariant;
  text?: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant = "small",
  text = "Shop now",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-[family-name:var(--font-geist-mono)] font-semibold uppercase whitespace-nowrap transition-colors duration-200";

  const variants: Record<ButtonVariant, string> = {
    small:
      "bg-white gap-[2px] px-[6px] py-[4px] text-black text-[12px] tracking-[-0.24px] hover:bg-gray-100",
    dark:
      "bg-black gap-[10px] px-[14px] py-[10px] text-morton-neon text-[20px] tracking-[-0.4px] hover:bg-neutral-900",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      <svg
        className={variant === "small" ? "w-[14px] h-[14px]" : "w-[18px] h-[18px]"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      <span>{text}</span>
    </button>
  );
}
