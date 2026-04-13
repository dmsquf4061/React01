// 컬러 테마 선택 섹션 컴포넌트
export default function ColorSection({
  colorThemes,
  selectedTheme,
  isDark,
  theme,
  panelBg,
  onThemeChange,
}) {
  return (
    // 전체 컨테이너 (유리 느낌 패널)
    <section
      className={`rounded-[8px] p-4 lg:p-6 md:self-start lg:rounded-[16px] xl:rounded-[32px] ${panelBg} flex flex-col gap-4 h-full justify-between`}
      style={{
        // 다크/라이트 배경
        background: isDark
          ? "linear-gradient(rgb(0 0 0 / 30%) 0%, rgb(0 0 0 / 10%) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",

        backdropFilter: "blur(32px)", // 블러 효과
        WebkitBackdropFilter: "blur(32px)",

        border: isDark
          ? "1px solid rgb(0 0 0 / 28%)"
          : "1px solid rgba(255,255,255,0.28)",

        boxShadow: isDark
          ? "inset 0 1px 0 rgb(0 0 0 / 35%), 0px 10px 30px rgb(0 0 0 / 10%)"
          : "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.10)",
      }}
    >
      {/* 섹션 타이틀 */}
      <p className={`text-left text-xl lg:mb-1 ${theme.text}`}>
        CHANGE COLOR
      </p>

      {/* 컬러 버튼 리스트 */}
      <div className="flex flex-wrap gap-2 h-full lg:h-auto items-center justify-center lg:justify-start">
        {colorThemes.map((t) => (
          <button
            key={t.id} // 고유 키
            type="button"
            onClick={() => !isDark && onThemeChange(t)} // 다크모드일 때 클릭 비활성
            aria-label={t.id}
            className={`
              h-8 w-8 shrink-0 rounded-full transition-transform
              ${isDark
                ? "opacity-40 cursor-not-allowed"
                : "cursor-pointer hover:scale-110"}
            `}
            style={{
              background: t.swatch, // 컬러 표시
              border: t.swatchBorder ? "0.5px solid #ccc" : "none",

              // 선택된 컬러 강조
              outline:
                selectedTheme.id === t.id
                  ? `2px solid ${isDark ? "#fff" : "#5b5b5b"}`
                  : "1px solid rgba(255, 255, 255, 0.2)",

              // 선택 시 외곽선 간격
              outlineOffset:
                selectedTheme.id === t.id
                  ? "2px"
                  : "0px",
            }}
          />
        ))}
      </div>
    </section>
  )
}