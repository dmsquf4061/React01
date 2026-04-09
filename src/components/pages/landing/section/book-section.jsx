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
  { id: 1, src: "./public/img/img1.jpg", title: "Book 1" },
  { id: 2, src: "./public/img/img2.jpg", title: "Book 2" },
  { id: 3, src: "./public/img/img3.jpg", title: "Book 3" },
  { id: 4, src: "./public/img/img4.jpg", title: "Book 4" },
  { id: 5, src: "./public/img/img5.jpg", title: "Book 5" },
]

export default function BookSection({ theme, panelBg, isDark }) {
  return (
    <section
      className={`rounded-[20px] p-4 ${panelBg} backdrop-blur-md`}
      style={{
        border: isDark
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(255,255,255,0.28)",
      }}
    >
      <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${theme.text}`}>
        BOOK
      </p>

      <Carousel
        opts={{ align: "center", loop: true }}
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {BOOKS.map((book) => (
            <CarouselItem key={book.id} className="pl-2 basis-[60%]">
              <div
                style={{ position: "relative", height: "200px", overflow: "hidden" }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector(".book-cover").style.transform =
                    "translateX(-50%) translateY(-50px)"
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
                    bottom: "30px",
                    left: "50%",
                    transform: "translateX(-50%) translateY(0px)",
                    width: "110px",
                    height: "150px",
                    borderRadius: "6px",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    zIndex: 1,
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "70px",
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