interface HeroProps {
  data?: {
    headline?: string;
    video?: { url?: string } | null;
    posterImage?: { url?: string } | null;
  };
}

export default function Hero({ data }: HeroProps) {
  const headline = data?.headline ?? "Morton Backpacks";
  const posterUrl = data?.posterImage?.url ?? "/images/hero-cover.png";
  const videoUrl = data?.video?.url ?? "/videos/hero.mp4";

  return (
    <section id="shop" className="relative w-full h-[100dvh] overflow-hidden">
      {/* Background image / Video poster */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Video src placeholder — add source file here */}
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero text */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24">
        <h1 className="font-[family-name:var(--font-geist)] font-normal text-white uppercase tracking-[-2.84px] text-center w-screen whitespace-nowrap"
          data-reveal="fade-up"
          style={{ fontSize: "clamp(48px, 8vw, 200px)" }}
        >
          {headline}
        </h1>
      </div>

      {/* Video controls */}
      <div className="absolute bottom-6 right-6 flex items-center gap-[14px] bg-white/20 backdrop-blur-sm rounded-full p-1">
        <button aria-label="Play" className="w-[16px] h-[16px] flex items-center justify-center text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </button>
        <button aria-label="Mute" className="w-[16px] h-[16px] flex items-center justify-center text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="white" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
          </svg>
        </button>
      </div>
    </section>
  );
}
