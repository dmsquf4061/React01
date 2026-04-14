import { X } from "lucide-react"

// 이미지 상세 모달 컴포넌트
export default function BookModal({ item, onClose, theme, isDark }) {
  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className={`
          relative flex w-full max-w-[1000px] flex-col gap-2 overflow-hidden rounded-[10px] py-4 shadow-2xl
          ${isDark ? "bg-black" : "bg-white"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 헤더 영역 */}
        <div className="flex items-center justify-between px-4">
          <p className={`text-left text-xl ${theme.text}`}>IMAGE VIEW</p>

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

        {/* 본문 영역 */}
        <div
          className={`
            grid grid-cols-1 gap-0 overflow-auto
            md:grid-cols-[1.1fr_0.9fr] h-[500px]
            ${isDark ? "bg-black" : "bg-white"}
          `}
        >
          {/* 이미지 영역 */}
          <div className="relative h-[320px] lg:h-full overflow-auto">
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* 설명 영역 */}
          <div className="flex h-[320px] flex-col justify-between px-4 py-4 md:h-[500px] md:px-5">
            <div>
              <p className={`text-2xl font-semibold ${theme.text}`}>
                {item.title}
              </p>

              <p
                className={`mt-4 text-sm leading-[30px] ${
                  isDark ? "text-white/70" : "text-stone-600"
                }`}
              >
                {item.description ?? "이미지에 대한 간단한 설명이 들어가는 영역입니다."}
              </p>
            </div>

            <div
              className={`
                rounded-[10px] px-4 py-3 text-sm leading-6
                ${isDark
                  ? "bg-white/5 text-white/50"
                  : "bg-stone-50 text-stone-500"}
              `}
            >
              필요한 경우 여기에 날짜, 카테고리, 태그 같은 정보도 추가할 수 있어요.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}