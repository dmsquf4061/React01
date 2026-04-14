import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

// 메모 입력 모달 컴포넌트
export default function MemoModal({ memo, onSave, onClose, theme, isDark }) {
  // 메모 입력 상태 (초기값: 기존 메모)
  const [draft, setDraft] = useState(memo ?? "")
  // 저장 중 상태 (버튼 비활성화 용도)
  const [saving, setSaving] = useState(false)

  // 저장 버튼 클릭 시 실행
  const handleSave = async () => {
    try {
      setSaving(true) // 저장 시작
      await onSave(draft) // 부모에 저장 요청
      onClose() // 저장 후 모달 닫기
    } finally {
      setSaving(false) // 저장 상태 해제
    }
  }

  return (
    // 전체 화면 오버레이 (배경 클릭 시 닫힘)
    <div
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.25)", // 반투명 배경
        backdropFilter: "blur(4px)", // 블러 효과
        WebkitBackdropFilter: "blur(4px)",
      }}
      onClick={onClose} // 바깥 클릭 시 닫기
    >
      {/* 모달 본체 */}
      <div
        className={`
          relative flex w-full max-w-[1000px] flex-col gap-2 overflow-hidden rounded-[10px] shadow-2xl py-4
          ${isDark ? "bg-black" : "bg-white"} // 다크모드 대응
        `}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        {/* 상단 헤더 영역 */}
        <div className="flex px-4 items-center justify-between">
          <p className={`text-left text-xl ${theme.text}`}>PERSONAL NOTEBOOK</p>

          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation() // 이벤트 버블링 방지
              onClose() // 모달 닫기
            }}
            className={`
              z-20 flex h-8 w-8 items-center justify-center rounded-full
              transition cursor-pointer
              ${isDark
                ? "text-stone-400 hover:text-white"
                : "text-stone-400 hover:text-stone-700"} // 다크/라이트 hover 색상
            `}
            style={{
              WebkitTapHighlightColor: "transparent", // 모바일 클릭 하이라이트 제거
              backdropFilter: "blur(8px)", // 버튼 블러
              WebkitBackdropFilter: "blur(8px)",
            }}
            aria-label="닫기"
          >
            <X size={25} strokeWidth={1.5} />
          </button>
        </div>

        {/* 텍스트 입력 영역 컨테이너 */}
        <div
          className={`
            relative h-[480px] overflow-hidden
            ${isDark ? "bg-black" : "bg-white"} // 배경색
          `}
        >
          {/* 메모 입력 textarea */}
          <textarea
            autoFocus // 자동 포커스
            value={draft} // 입력값 바인딩
            onChange={(e) => setDraft(e.target.value)} // 입력 상태 업데이트
            rows={5}
            className={`
              h-full w-full resize-none bg-transparent px-4 py-2 text-sm leading-[30px] outline-none
              placeholder:text-stone-300
              ${isDark ? "text-white/70" : "text-stone-600"} // 텍스트 색상
            `}
            style={{
              // 줄 노트 느낌 배경
              backgroundImage:
                "repeating-linear-gradient(#c4c4c400, #dadada00 29px, rgb(211 211 211 / 39%) 29px, rgb(245 245 245 / 10%) 30px)",
              backgroundPositionY: "8px",
              backgroundAttachment: "local",
              backgroundColor: "transparent",
              WebkitTapHighlightColor: "transparent",
            }}
            placeholder="메모를 입력하세요..."
          />
        </div>

        {/* 하단 저장 버튼 영역 */}
        <div className="flex justify-center px-4">
          <Button
            type="button"
            onClick={handleSave} // 저장 실행
            disabled={saving} // 저장 중 비활성화
            className="cursor-pointer rounded-full bg-stone-400 px-4 py-2 text-[14px] w-[100px] text-white hover:bg-stone-500 disabled:opacity-50"
          >
            저장
            {/* 저장 상태 표시용 (필요 시 사용) */}
            {/* {saving ? "저장 중..." : "저장"} */}
          </Button>
        </div>
      </div>
    </div>
  )
}