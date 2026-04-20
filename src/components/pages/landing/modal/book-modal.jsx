import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import gsap from "gsap"

export default function BookModal({ item, onClose, theme, isDark }) {
  const [isClosing, setIsClosing] = useState(false)

  const overlayRef = useRef(null)
  const modalRef = useRef(null)

  // 등장 애니메이션
  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    )

    tl.fromTo(
      modalRef.current,
      {
        y: 60,
        scale: 0.95,
        opacity: 0,
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
      "<"
    )

    return () => {
      tl.kill()
    }
  }, [])

  // 닫기 애니메이션
  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)

    const tl = gsap.timeline({
      onComplete: () => {
        onClose?.()
      },
    })

    tl.to(modalRef.current, {
      y: 40,
      scale: 0.96,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    })

    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      },
      "<"
    )
  }

  if (!item) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className={`
          relative flex w-full max-w-[1000px] flex-col overflow-hidden rounded-[10px] shadow-2xl
          lg:flex-row lg:rounded-[24px]
          ${isDark ? "bg-black" : "bg-white"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
            type="button"
            onClick={handleClose}
            className={`
              absolute right-4 top-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition
              ${isDark ? "text-white/70 hover:text-white" : "text-stone-500 hover:text-stone-800"}
            `}
            style={{
              background: isDark
                ? "rgba(255,255,255,0.10)"
                : "rgba(255,255,255,0.22)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.16)"
                : "1px solid rgba(255,255,255,0.28)",
              boxShadow: isDark
                ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 16px rgba(0,0,0,0.14)"
                : "inset 0 1px 0 rgba(255,255,255,0.30), 0 6px 16px rgba(0,0,0,0.08)",
              WebkitTapHighlightColor: "transparent",
            }}
            aria-label="닫기"
          >
            <X size={22} strokeWidth={1.8} />
          </button>

        {/* 이미지 영역 */}
        <div className="h-[320px] w-full shrink-0 overflow-hidden lg:h-[620px] lg:w-[46%]">
          <img
            src={item.src}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 텍스트 영역 */}
        <div
          className="flex min-h-[280px] flex-1 flex-col justify-between p-5 text-left lg:min-h-[620px] lg:p-8"
          style={{
            background: isDark
              ? "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
          }}
        >
          <div className="space-y-4">
            <p className={`text-sm tracking-[0.16em] ${theme.subtext}`}>
              BOOK DETAIL
            </p>

            <h3 className={`text-2xl lg:text-3xl ${theme.text}`}>
              {item.title}
            </h3>

            <p
              className={`whitespace-pre-wrap break-words text-sm leading-7 lg:text-base ${
                isDark ? "text-white/70" : "text-stone-600"
              }`}
            >
              {item.description}
            </p>
          </div>

          {/* <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className={`
                inline-flex h-10 min-w-[110px] cursor-pointer items-center justify-center rounded-full px-5 text-sm transition
                ${isDark ? "text-white" : "text-stone-700"}
              `}
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.10)"
                  : "rgba(255,255,255,0.50)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.14)"
                  : "1px solid rgba(0,0,0,0.08)",
                boxShadow: isDark
                  ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 6px 18px rgba(0,0,0,0.18)"
                  : "inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 18px rgba(0,0,0,0.08)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              닫기
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}