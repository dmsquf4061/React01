// 메모 섹션 컴포넌트 (클릭 시 모달 열림)
export default function MemoSection({
  isLg,
  isDark,
  theme,
  memoDate,
  onMemoOpen,
}) {
  // lg 이상일 때 고정 크기
  const MEMO_SIZE = 350

  return (
    // 전체 컨테이너 (lg에서는 우측 고정)
    <div
      className="z-20 relative lg:absolute h-full overflow-visible"
      style={{
        top: 0,
        right: 0,
        // lg 이상일 때만 고정 사이즈
        width: isLg ? `${MEMO_SIZE}px` : "100%",
        height: isLg ? `${MEMO_SIZE}px` : "100%",
      }}
    >
      {/* 상단 테이프 느낌 장식 */}
      <div
        className={`absolute right-6 z-30 h-6 w-24 -top-1 rotate-[6deg] shadow-sm ${theme.accent}`}
      />

      {/* 내부 컨텐츠 영역 */}
      <div className="flex h-full w-full items-stretch p-0 lg:pb-4 lg:pl-4 overflow-visible">
        {/* 메모 버튼 (전체 클릭 영역) */}
        <button
          type="button"
          onClick={onMemoOpen} // 클릭 시 메모 모달 열기
          className="
            relative cursor-pointer flex min-h-[260px] h-full h-[220px] w-full flex-col justify-center gap-2
            rounded-[8px] p-4 lg:justify-between text-left
            lg:h-full lg:rounded-[16px] lg:p-6 xl:rounded-[32px]
          "
          style={{
            // 다크/라이트 배경
            background: isDark
              ? "linear-gradient(rgb(0 0 0 / 30%) 0%, rgb(0 0 0 / 10%) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",

            backdropFilter: "blur(32px)", // 유리 효과
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

          {/* 메모 날짜 표시 (있을 때만) */}
          {memoDate && (
            <p className={`w-full text-center lg:text-left text-sm ${theme.subtext}`}>
              {memoDate}
            </p>
          )}
        </button>
      </div>
    </div>
  )
}