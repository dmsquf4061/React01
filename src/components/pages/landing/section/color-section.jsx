export default function ColorSection({
  colorThemes,
  selectedTheme,
  isDark,
  theme,
  panelBg,
  onThemeChange,
}) {
  return (
    <section
      className={`rounded-[8px] p-4 lg:p-6 md:self-start lg:rounded-[16px] xl:rounded-[32px] ${panelBg} flex flex-col gap-4 h-full justify-between`}
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
      <p className={`text-left text-xl lg:mb-1 ${theme.text}`}>CHANGE COLOR</p>

      <div className="flex flex-wrap gap-2 h-full lg:h-auto items-center justify-center lg:justify-start">
        {colorThemes.map((t) => (
          <button
  key={t.id}
  type="button"
  onClick={() => !isDark && onThemeChange(t)}
  aria-label={t.id}
  className={`h-8 w-8 shrink-0 rounded-full transition-transform ${isDark ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:scale-110"}`}
  style={{
    background: t.swatch,
    border: t.swatchBorder ? "0.5px solid #ccc" : "none",
    outline:
      selectedTheme.id === t.id
        ? `2px solid ${isDark ? "#fff" : "#5b5b5b"}`
        : "1px solid rgba(255, 255, 255, 0.2)",
    outlineOffset:
      selectedTheme.id === t.id
        ? '2px'
        : '0px',
  }}
/>
        ))}
      </div>
    </section>
  )
}