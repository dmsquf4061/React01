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

        // 블러 효과
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",

        // 테두리
        border: isDark
          ? "1px solid rgb(0 0 0 / 28%)"
          : "1px solid rgba(255,255,255,0.28)",

        // 그림자
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
      <div className="flex flex-wrap gap-3 h-full lg:h-auto items-center justify-center lg:justify-start">
        {colorThemes.map((t) => {
          const isSelected = selectedTheme?.id === t.id

          // 다크모드일 때 stone/black 계열은 흰색으로 보여서 가시성 확보
          const buttonBg =
            isDark && (t.id === "stone" || t.id === "black" || t.swatch === "#363636")
              ? "#ffffff"
              : t.swatch

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onThemeChange?.(t)}
              aria-label={t.id}
              aria-pressed={isSelected}
              className="
                h-8 w-8 shrink-0 rounded-full cursor-pointer transition-transform
                hover:scale-110
              "
              style={{
                background: buttonBg,
                border:
                  t.swatchBorder || (isDark && buttonBg === "#ffffff")
                    ? "0.5px solid rgba(255,255,255,0.35)"
                    : "none",

                outline: isSelected
                  ? `2px solid ${isDark ? "#fff" : "#5b5b5b"}`
                  : isDark
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid rgba(255,255,255,0.2)",

                outlineOffset: isSelected ? "2px" : "0px",
                WebkitTapHighlightColor: "transparent",
              }}
            />
          )
        })}
      </div>
    </section>
  )
}