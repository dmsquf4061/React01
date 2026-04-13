export default function MemoSection({
  isLg,
  isDark,
  theme,
  memoDate,
  onMemoOpen,
}) {
  const MEMO_SIZE = 350

  return (
    <div
      className="z-20 relative lg:absolute h-full overflow-visible"
      style={{
        top: 0,
        right: 0,
        width: isLg ? `${MEMO_SIZE}px` : "100%",
        height: isLg ? `${MEMO_SIZE}px` : "100%",
      }}
    >
      {/* 테이프 - relative wrapper 제거 */}

      <div
        className={`absolute right-6 z-30 h-6 w-24 -top-1 rotate-[6deg] shadow-sm ${theme.accent}`}
      />

      <div className="flex h-full w-full items-stretch p-0 lg:pb-4 lg:pl-4 overflow-visible">
        <button
          type="button"
          onClick={onMemoOpen}
          className="relative cursor-pointer flex min-h-[260px] h-full h-[220px] w-full flex-col justify-center gap-2 rounded-[8px] p-4 lg:justify-between text-left lg:h-full lg:rounded-[16px] lg:p-6 xl:rounded-[32px]"
          style={{
            background: isDark ? "linear-gradient(rgb(0 0 0 / 30%) 0%, rgb(0 0 0 / 10%) 100%)" : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: isDark ? "1px solid rgb(0 0 0 / 28%)" : "1px solid rgba(255,255,255,0.28)",
            boxShadow: isDark
              ? "inset 0 1px 0 rgb(0 0 0 / 35%), 0px 10px 30px rgb(0 0 0 / 10%)"
              : "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.10)",
          }}
        >
          <div className="w-full text-center lg:text-left">
            <p className={`text-xl lg:mb-1 ${theme.text}`}>PERSONAL</p>
            <p className={`text-xl ${theme.text}`}>NOTEBOOK</p>
          </div>

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