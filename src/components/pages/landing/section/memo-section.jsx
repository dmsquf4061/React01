// 메모 섹션 컴포넌트 (클릭 시 모달 열림)
export default function MemoSection({
  isLg,
  isDark,
  theme,
  memo,
  memoDate,
  onMemoOpen,
}) {
  const MEMO_SIZE = 350

  const tapeStyle = (() => {
    if (isDark && (theme?.id === "stone" || theme?.swatch === "#363636")) {
      return {
        background: "rgb(255 255 255 / 50%)",
        border: "1px solid rgba(255,255,255,0.35)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
      }
    }

    return {
      background: `${theme?.swatch}50`,
    }
  })()

  // 바깥에 보여줄 메모 미리보기
  const previewText =
    memo && memo.trim()
      ? memo
      : "메모를 입력하면 여기에서 일부 내용을 바로 확인할 수 있어요."

  return (
    <div
      className="relative z-20 h-full overflow-visible lg:absolute"
      style={{
        top: 0,
        right: 0,
        width: isLg ? `${MEMO_SIZE}px` : "100%",
        height: isLg ? `${MEMO_SIZE}px` : "100%",
      }}
    >
      {/* 상단 테이프 느낌 장식 */}
      <div
        className="absolute -top-1 right-6 z-30 h-6 w-24 rotate-[6deg] shadow-sm"
        style={tapeStyle}
      />

      {/* 내부 컨텐츠 영역 */}
      <div className="flex h-full w-full items-stretch overflow-visible p-0 lg:pb-4 lg:pl-4">
        {/* 메모 버튼 (전체 클릭 영역) */}
        <button
          type="button"
          onClick={onMemoOpen}
          className="
            relative flex h-[220px] min-h-[260px] h-full w-full cursor-pointer flex-col lg:justify-center gap-3
            rounded-[8px] p-4 text-left
            lg:h-full lg:rounded-[16px] lg:p-6
            xl:rounded-[32px]
          "
          style={{
            background: isDark
              ? "linear-gradient(rgb(0 0 0 / 30%) 0%, rgb(0 0 0 / 10%) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: isDark
              ? "1px solid rgb(0 0 0 / 28%)"
              : "1px solid rgba(255,255,255,0.28)",
            boxShadow: isDark
              ? "inset 0 1px 0 rgb(0 0 0 / 35%), 0px 10px 30px rgb(0 0 0 / 10%)"
              : "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.10)",
          }}
        >
          {/* 상단 타이틀 */}
          <div className="w-full text-center lg:text-left">
            <p className={`text-xl lg:mb-1 ${theme.text}`}>PERSONAL</p>
            <p className={`text-xl ${theme.text}`}>NOTEBOOK</p>
          </div>

          {/* 메모 미리보기 */}
          <div className="flex-1 overflow-hidden">
            <p
              className={`
                line-clamp-5 whitespace-pre-wrap break-words text-sm leading-6 text-center lg:text-left
                ${isDark ? "text-white/65" : "text-stone-600"}
              `}
            >
              {previewText}
            </p>
          </div>

          {/* 메모 날짜 표시 (있을 때만) */}
          {memoDate && (
            <p className={`w-full text-center text-sm lg:text-left ${theme.subtext}`}>
              {memoDate}
            </p>
          )}
        </button>
      </div>
    </div>
  )
}