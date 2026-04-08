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
      className="z-20 lg:absolute h-full"
      style={{
        top: 0,
        right: 0,
        width: isLg ? `${MEMO_SIZE}px` : "100%",
        height: isLg ? `${MEMO_SIZE}px` : "100%",
      }}
    >
      {/* 테이프 - relative wrapper 제거 */}
      <div
        className={`absolute right-6 z-30 h-6 w-24 -top-2 rotate-[6deg] shadow-sm lg:top-3 ${theme.accent}`}
      />

      <div className="flex h-full w-full items-stretch p-0 lg:pb-4 lg:pl-4">
        <button
          type="button"
          onClick={onMemoOpen}
          className="relative flex h-full h-[220px] w-full flex-col justify-center gap-2 overflow-hidden rounded-[10px] px-4 py-6 text-left lg:h-full lg:rounded-[20px] lg:px-6 lg:py-10 xl:rounded-[40px]"
          style={{
            background: isDark ? "linear-gradient(rgb(0 0 0 / 30%) 0%, rgb(0 0 0 / 10%) 100%)" : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: isDark ? "1px solid rgb(0 0 0 / 28%)" : "1px solid rgba(255,255,255,0.28)",
            boxShadow: isDark
              ? "inset 0 1px 0 rgb(0 0 0 / 35%), 0px 10px 30px rgb(0 0 0 / 10%)"
              : "inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 30px rgba(0,0,0,0.10)",
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