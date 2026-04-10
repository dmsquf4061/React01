import { useRef } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const BOOKS = [
  { id: 1, src: "./img/img1.jpg", title: "Book 1" },
  { id: 2, src: "./img/img2.jpg", title: "Book 2" },
  { id: 3, src: "./img/img3.jpg", title: "Book 3" },
  { id: 4, src: "./img/img4.jpg", title: "Book 4" },
  { id: 5, src: "./img/img5.jpg", title: "Book 5" },
]

export default function BookSection({ theme, panelBg, isDark }) {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    })
  )

  const panelStyle = {
    background: isDark
      ? "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    border: isDark
      ? "1px solid rgba(0,0,0,0.28)"
      : "1px solid rgba(255,255,255,0.28)",
    boxShadow: isDark
      ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 10px rgba(0,0,0,0.18)"
      : "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.10)",
  }

  const navStyle = {
    background: isDark
      ? "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.12) 100%)",
    border: isDark
      ? "1px solid rgba(255,255,255,0.18)"
      : "1px solid rgba(255,255,255,0.28)",
    boxShadow: isDark
      ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 6px rgba(0,0,0,0.18)"
      : "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 6px rgba(0,0,0,0.10)",
    WebkitTapHighlightColor: "transparent",
  }

    const navClass = [
        "!static",
        "!left-auto",
        "!right-auto",
        "!top-auto",
        "!translate-y-0",
        "inline-flex h-8 w-8 items-center justify-center rounded-full",
        "cursor-pointer overflow-hidden select-none relative shrink-0",
        "[transform:translateZ(0)] [backface-visibility:hidden]",
        "[isolation:isolate] [contain:paint]",
        "!transition-none !duration-0 !scale-100 hover:!scale-100",
        "!bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent",
        "shadow-none",
        "[&_svg]:[transform:translateZ(0)] [&_svg]:[backface-visibility:hidden]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-full",
        "before:opacity-0 before:transition-opacity before:duration-150",
        isDark
            ? "before:bg-white/10 hover:before:opacity-100 !text-white hover:!text-white"
            : "before:bg-white/35 hover:before:opacity-100 !text-stone-600",
    ].join(" ")

  return (
    <section
      className={`rounded-[10px] py-4 md:self-start lg:h-full lg:rounded-[20px] lg:py-6 xl:rounded-[40px] ${panelBg} flex flex-col gap-4`}
      style={panelStyle}
    >
      <Carousel
        opts={{ align: "center", loop: true }}
        plugins={[autoplay.current]}
        className="w-full overflow-visible h-full flex flex-col justify-between"
      >
        <div className="flex items-center justify-between px-4 lg:px-6 mb-4">
          <p className={`text-left text-xl ${theme.text}`}>BOOK</p>

          <div className="flex items-center gap-1">
            <CarouselPrevious className={navClass} style={navStyle} />
            <CarouselNext className={navClass} style={navStyle} />
          </div>
        </div>

        <CarouselContent className="-ml-2 overflow-visible h-full">
          {BOOKS.map((book) => (
            <CarouselItem key={book.id} className="basis-[50%] pl-2 max-w-[220px] min-w-[220px]">
              <div
                className="cursor-pointer flex items-end"
                style={{
                  position: "relative",
                  height: "280px",
                  overflow: "visible",
                }}
                onMouseEnter={(e) => {
                  const cover = e.currentTarget.querySelector(".book-cover")
                  if (cover) cover.style.transform = "translateX(-50%) translateY(-20px)"
                }}
                onMouseLeave={(e) => {
                  const cover = e.currentTarget.querySelector(".book-cover")
                  if (cover) cover.style.transform = "translateX(-50%) translateY(0px)"
                }}
              >
                <img
                  src={book.src}
                  alt={book.title}
                  className="book-cover"
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    left: "50%",
                    transform: "translateX(-50%) translateY(0px)",
                    width: "calc(100% - 30px)",
                    height: "240px",
                    borderRadius: "6px",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    zIndex: 1,
                    willChange: "transform",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "150px",
                    background: isDark
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(255,255,255,0.5)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderRadius: "8px",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid rgba(255,255,255,0.6)",
                    zIndex: 2,
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}