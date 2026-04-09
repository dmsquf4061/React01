"use client"

import { Button } from "@/components/ui/button"
import { PenLine, Image, Sun, Moon } from "lucide-react"

function IconButton({ children, active = false, theme, isDark }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={[
        "group relative h-11 w-11 overflow-hidden rounded-full cursor-pointer select-none",
        "[transform:translateZ(0)] [backface-visibility:hidden]",
        "[isolation:isolate] [contain:paint]",
        "!transition-none !duration-0",
        "!bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent",
        "shadow-none",
        active
          ? [theme.gnbActiveBg, theme.gnbActiveText].join(" ")
          : [theme.gnbText].join(" "),
      ].join(" ")}
      style={
        active
          ? {
              WebkitTapHighlightColor: "transparent",
            }
          : {
              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.16)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.10)"
                : "1px solid rgba(255,255,255,0.20)",
              boxShadow: isDark
                ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.14)"
                : "inset 0 1px 0 rgba(255,255,255,0.28), 0 4px 12px rgba(0,0,0,0.08)",
              WebkitTapHighlightColor: "transparent",
            }
      }
    >
      {!active && (
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-150",
            isDark ? "bg-white/10 group-hover:opacity-100" : "bg-white/25 group-hover:opacity-100",
          ].join(" ")}
        />
      )}

      <span className="relative z-10 flex items-center justify-center [transform:translateZ(0)]">
        {children}
      </span>
    </Button>
  )
}

function ToggleButton({ isDark, onToggle }) {
  const mobileThumbTransform = isDark ? "translateX(32px)" : "translateX(0px)"
  const desktopThumbTransform = isDark ? "translateY(32px)" : "translateY(0px)"

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="toggle theme"
      className={[
        "relative flex items-center justify-center rounded-full cursor-pointer overflow-hidden select-none",
        "[transform:translateZ(0)] [backface-visibility:hidden]",
        "[isolation:isolate] [contain:paint]",
      ].join(" ")}
      style={{
        background: "rgba(255,255,255,0.16)",
        border: "1px solid rgba(255,255,255,0.30)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.18)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div className="relative h-10 w-[80px] overflow-hidden rounded-full border border-black/10 lg:hidden">
        <div className="absolute left-[14px] top-1/2 flex -translate-y-1/2 items-center justify-center">
          <Sun size={16} className="text-white [transform:translateZ(0)]" />
        </div>

        <div className="absolute right-[14px] top-1/2 flex -translate-y-1/2 items-center justify-center">
          <Moon size={16} className="text-stone-800 [transform:translateZ(0)]" />
        </div>

        <div
          className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.22)]"
          style={{
            transform: mobileThumbTransform,
            transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {isDark ? (
            <Moon size={16} className="text-stone-800 [transform:translateZ(0)]" />
          ) : (
            <Sun size={16} className="text-stone-800 [transform:translateZ(0)]" />
          )}
        </div>
      </div>

      <div className="relative hidden h-[80px] w-10 overflow-hidden rounded-full border border-black/10 lg:block">
        <div className="absolute left-1/2 top-[14px] flex -translate-x-1/2 items-center justify-center">
          <Sun size={16} className="text-white [transform:translateZ(0)]" />
        </div>

        <div className="absolute bottom-[14px] left-1/2 flex -translate-x-1/2 items-center justify-center">
          <Moon size={16} className="text-stone-800 [transform:translateZ(0)]" />
        </div>

        <div
          className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.22)]"
          style={{
            transform: desktopThumbTransform,
            transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {isDark ? (
            <Moon size={16} className="text-stone-800 [transform:translateZ(0)]" />
          ) : (
            <Sun size={16} className="text-stone-800 [transform:translateZ(0)]" />
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
        <nav className="flex min-w-0 flex-row items-center gap-2 sm:gap-3 lg:flex-col">
          <IconButton theme={theme} isDark={isDark}>
            <Image size={20} strokeWidth={2.2} />
          </IconButton>

          <IconButton active theme={theme} isDark={isDark}>
            <PenLine size={20} strokeWidth={2.2} />
          </IconButton>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 lg:flex-col">
          <div className="flex">
            <ToggleButton isDark={isDark} onToggle={onToggleLightDark} />
          </div>

          <div className="h-[54px] w-[54px] flex-shrink-0 overflow-hidden rounded-full border border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.12)] lg:h-auto lg:w-full lg:aspect-square">
            <img src="./img/img8.jpg" alt="profile" className="h-full w-full object-cover object-center" />
          </div>
        </div>
      </div>
    </aside>
  )
}