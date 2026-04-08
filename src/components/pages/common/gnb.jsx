"use client"

import { Button } from "@/components/ui/button"
import { House, PenLine, Heart, Image, Sun, Moon } from "lucide-react"

function IconButton({ children, active = false, theme }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={[
        "h-11 w-11 rounded-full transition cursor-pointer",
        active
          ? [theme.gnbActiveBg, theme.gnbActiveText, "shadow-[0_8px_24px_rgba(255,255,255,0.18)]", "hover:opacity-90"].join(" ")
          : [theme.gnbText, "hover:bg-white/20"].join(" "),
      ].join(" ")}
    >
      {children}
    </Button>
  )
}

function ToggleButton({ isDark, onToggle }) {
  const mobileThumbTransform = isDark
    ? "translateX(40px)" // 오른쪽
    : "translateX(0px)"  // 왼쪽

  const desktopThumbTransform = isDark
    ? "translateY(40px)" // 아래
    : "translateY(0px)"  // 위

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="toggle theme"
      className="relative flex items-center justify-center rounded-full border border-white/30 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.16)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.18)",
      }}
    >
      {/* mobile ~ md : 가로 */}
      <div className="relative h-10 w-[80px] rounded-full border border-black/10 overflow-hidden lg:hidden">
        {/* 왼쪽 sun */}
        <div className="absolute left-[14px] top-1/2 -translate-y-1/2 flex items-center justify-center">
          <Sun size={16} className="text-white" />
        </div>

        {/* 오른쪽 moon */}
        <div className="absolute right-[14px] top-1/2 -translate-y-1/2 flex items-center justify-center">
          <Moon size={16} className="text-stone-800" />
        </div>

        {/* thumb */}
        <div
          className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.22)] transition-transform duration-300"
          style={{
            transform: mobileThumbTransform,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          {isDark ? (
            <Moon size={16} className="text-stone-800" />
          ) : (
            <Sun size={16} className="text-stone-800" />
          )}
        </div>
      </div>

      {/* lg 이상 : 세로 */}
      <div className="relative hidden w-10 h-[80px] rounded-full border border-black/10 overflow-hidden lg:block">
        {/* 상단 sun */}
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Sun size={16} className="text-white" />
        </div>

        {/* 하단 moon */}
        <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Moon size={16} className="text-stone-800" />
        </div>

        {/* thumb */}
        <div
          className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.22)] transition-transform duration-300"
          style={{
            transform: desktopThumbTransform,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          {isDark ? (
            <Moon size={16} className="text-stone-800" />
          ) : (
            <Sun size={16} className="text-stone-800" />
          )}
        </div>
      </div>
    </button>
  )
}

export default function Gnb({ theme, isDark = false, onToggleLightDark }) {
  return (
    <aside
      className="
        sticky top-0 z-50 flex h-[70px] w-full items-center gap-2 lg:gap-4
        lg:static lg:h-full lg:w-[70px] lg:flex-col xl:w-[90px]
      "
    >
      {/* 로고 */}
      <div
        className="flex h-[54px] w-[54px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold text-white lg:h-auto lg:w-full lg:aspect-square"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255,255,255,0.28)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 30px rgba(0,0,0,0.10)",
        }}
      >
        C
      </div>

      {/* 메뉴 영역 */}
      <div
        className="flex min-w-0 flex-1 flex-row items-center justify-between rounded-[999px] p-2 shadow-sm lg:w-full lg:flex-col lg:rounded-[80px]"
        style={{
          background: isDark ? "rgba(10,10,10,0.6)" : "rgba(255,255,255,0.22)",
          backdropFilter: "blur(32px) saturate(160%)",
          WebkitBackdropFilter: "blur(32px) saturate(160%)",
          border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.24)",
          boxShadow: isDark
            ? "inset 0 1px 0 rgb(0 0 0 / 8%), inset 0 -1px 0 rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)"
            : "inset 0 1px 0 rgba(255,255,255,0.30), 0 12px 40px rgba(0,0,0,0.10)",
        }}
      >
        {/* 메뉴 버튼 */}
        <nav className="flex min-w-0 flex-row items-center gap-2 sm:gap-3 lg:flex-col">
          {/* <IconButton theme={theme}>
            <House size={20} strokeWidth={2.2} />
          </IconButton> */}
          <IconButton theme={theme}>
            <Image size={20} strokeWidth={2.2} />
          </IconButton>
          <IconButton active theme={theme}>
            <PenLine size={20} strokeWidth={2.2} />
          </IconButton>
          {/* <IconButton theme={theme}>
            <Heart size={18} strokeWidth={2.2} />
          </IconButton> */}
        </nav>

        <div className="flex items-center gap-2 md:gap-4 lg:flex-col">
          {/* 토글 */}
          <div className="flex">
            <ToggleButton isDark={isDark} onToggle={onToggleLightDark} />
          </div>

          {/* 프로필 */}
          <div className="h-[54px] w-[54px] flex-shrink-0 overflow-hidden rounded-full border border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.12)] lg:h-auto lg:w-full lg:aspect-square">
            <img src="./img/img8.jpg" alt="profile" className="h-full w-full object-cover object-center" />
          </div>
        </div>
      </div>
    </aside>
  )
}