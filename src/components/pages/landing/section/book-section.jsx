import { useEffect, useState } from "react"
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
  return (
    <section
      className={`rounded-[20px] p-4 ${panelBg} backdrop-blur-md`}
      style={{
        border: isDark
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(255,255,255,0.28)",
        overflow: "visible",
      }}
    >
      <p className={`text-left text-xl lg:mb-1 ${theme.text}`}>BOOK</p>

      <Carousel
        opts={{ align: "center", loop: true }}
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
        className="w-full overflow-visible"
      >
        <CarouselContent className="-ml-2 overflow-visible">
          {BOOKS.map((book) => (
            <CarouselItem key={book.id} className="pl-2 basis-[50%]">
                <div
                    style={{ position: "relative", height: "240px", overflow: "visible" }}
                    onMouseEnter={(e) => {
                    e.currentTarget.querySelector(".book-cover").style.transform =
                        "translateX(-50%) translateY(-30px)"
                    }}
                    onMouseLeave={(e) => {
                    e.currentTarget.querySelector(".book-cover").style.transform =
                        "translateX(-50%) translateY(0px)"
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
                        height: "190px",
                        borderRadius: "6px",
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        zIndex: 1,
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

        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
    </section>
  )
}