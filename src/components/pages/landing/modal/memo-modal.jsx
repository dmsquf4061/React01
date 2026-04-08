import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function MemoModal({ memo, onSave, onClose }) {
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
      style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-[1000px] flex-col gap-4 rounded-[0px] border border-pink-100 bg-white shadow-2xl rounded-[10px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute -top-2 left-8 h-4 w-16"
          style={{ background: "rgba(251,207,232,0.85)", transform: "rotate(-1deg)" }}
        />

        <p className="text-xs uppercase tracking-widest">메모장</p>

        <div
          className="relative overflow-hidden border border-pink-100 h-[500px]"        
        >
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            className="w-full h-full resize-none bg-transparent px-4 py-2 text-sm leading-[30px] outline-none placeholder:text-pink-300"
            style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 29px, #fce7f3 29px, #fce7f3 30px)",
              backgroundPositionY: "8px",
              backgroundAttachment: "local",
              backgroundColor: "transparent",
            }}
            placeholder="메모를 입력하세요..."
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="rounded-full bg-pink-50 px-4 py-2 text-xs  hover:bg-pink-100 hover:text-pink-500"
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-pink-400 px-4 py-2 text-xs text-white hover:bg-pink-500 disabled:opacity-50"
          >
            {saving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>
    </div>
  )
}