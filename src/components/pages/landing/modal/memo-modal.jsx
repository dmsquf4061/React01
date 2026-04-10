import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MemoModal({ memo, onSave, onClose, theme, isDark }) {
  const [draft, setDraft] = useState(memo ?? "")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    try {
      setSaving(true)
      await onSave(draft)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className={`
          relative flex w-full max-w-[1000px] flex-col gap-2 overflow-hidden rounded-[10px] shadow-2xl py-4
          ${isDark ? "bg-black" : "bg-white"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex px-4 items-center justify-between">
          <p className={`text-left text-xl ${theme.text}`}>PERSONAL NOTEBOOK</p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className={`
              z-20 flex h-8 w-8 items-center justify-center rounded-full
              transition cursor-pointer
              ${isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-400 hover:text-stone-700"}
            `}
            style={{
              WebkitTapHighlightColor: "transparent",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            aria-label="닫기"
          >
            <X size={25} strokeWidth={1.5} />
          </button>
        </div>

        <div
          className={`
            relative h-[480px] overflow-hidden
            ${isDark ? "bg-black" : "bg-white"}
          `}
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
              backgroundImage:
                "repeating-linear-gradient(#c4c4c400, #dadada00 29px, rgb(211 211 211 / 39%) 29px, rgb(245 245 245 / 10%) 30px)",
              backgroundPositionY: "8px",
              backgroundAttachment: "local",
              backgroundColor: "transparent",
            }}
            placeholder="메모를 입력하세요..."
          />
        </div>

        <div className="flex justify-center px-4">
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="cursor-pointer rounded-full bg-stone-400 px-4 py-2 text-[14px] w-[100px] text-white hover:bg-stone-500 disabled:opacity-50"
          >
            저장
            {/* {saving ? "저장 중..." : "저장"} */}
          </Button>
        </div>
      </div>
    </div>
  )
}