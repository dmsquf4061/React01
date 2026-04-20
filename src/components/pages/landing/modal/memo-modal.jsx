import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"

export default function MemoModal({ memo, onSave, onClose, theme, isDark }) {
  const [draft, setDraft] = useState(memo ?? "")
  const [saving, setSaving] = useState(false)
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
      onComplete: onClose,
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

  const handleSave = async () => {
    try {
      setSaving(true)
      await onSave(draft)
      handleClose()
    } finally {
      setSaving(false)
    }
  }

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
          relative flex w-full max-w-[1000px] flex-col gap-2 overflow-hidden rounded-[10px] py-4 shadow-2xl
          ${isDark ? "bg-black" : "bg-white"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4">
          <p className={`text-xl ${theme.text}`}>PERSONAL NOTEBOOK</p>

          <button
            type="button"
            onClick={handleClose}
            className={`
              z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition
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
            <X size={25} strokeWidth={1.5} />
          </button>
        </div>

        {/* textarea 영역 */}
        <div
          className={`relative h-[480px] overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}
        >
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            className={`
              h-full w-full resize-none bg-transparent px-4 py-2 text-sm leading-[30px] outline-none
              placeholder:text-stone-300
              ${isDark ? "text-white/70" : "text-stone-600"}
            `}
            style={{
              backgroundImage: isDark
                ? "repeating-linear-gradient(rgba(255,255,255,0) 0px, rgba(255,255,255,0) 29px, rgba(255,255,255,0.14) 29px, rgba(255,255,255,0.04) 30px)"
                : "repeating-linear-gradient(#c4c4c400, #dadada00 29px, rgb(211 211 211 / 39%) 29px, rgb(245 245 245 / 10%) 30px)",
              backgroundPositionY: "8px",
              backgroundAttachment: "local",
              backgroundColor: "transparent",
              WebkitTapHighlightColor: "transparent",
            }}
            placeholder="메모를 입력하세요..."
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-center px-4">
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-[100px] rounded-full bg-stone-400 text-white hover:bg-stone-500 disabled:opacity-50"
          >
            {saving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>
    </div>
  )
}