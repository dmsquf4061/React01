"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PenLine, Image, Sun, Moon } from "lucide-react"

// 공통 아이콘 버튼
function IconButton({
  children,
  active = false,
  theme,
  isDark,
  onClick,
  ariaLabel,
  role,
  tabIndex,
  ariaSelected,
  onKeyDown,
  id,
  controls,
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={ariaLabel}
      role={role}
      tabIndex={tabIndex}
      aria-selected={ariaSelected}
      aria-controls={controls}
      id={id}
      onKeyDown={onKeyDown}
      className={[
        "group relative h-11 w-11 overflow-hidden rounded-full cursor-pointer select-none",
        "[transform:translateZ(0)] [backface-visibility:hidden]",
        "[isolation:isolate] [contain:paint]",
        "!transition-none !duration-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        "!bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent",
        "shadow-none",
      ].join(" ")}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span
        className={`relative z-10 flex items-center justify-center [transform:translateZ(0)] transition-colors duration-150 ${
          active
            ? `${theme.text} opacity-60` 
            : `${theme.text} ${theme.gnbHoverText} group-hover:opacity-40`
        }`}
      >
        {children}
      </span>
    </Button>
  )
}

// 라이트/다크 토글 버튼
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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
      ].join(" ")}
      style={{
        background: "rgba(255,255,255,0.16)",
        border: "1px solid rgba(255,255,255,0.30)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.18)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* 모바일 토글 */}
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

      {/* 데스크탑 토글 */}
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

// GNB 컴포넌트
export default function Gnb({
  theme,
  isDark = false,
  onToggleLightDark,

  // 부모가 제어하고 싶을 때 사용
  activeTab,

  // 클릭될 때 부모에게 알려줌
  onTabChange,

  // 각 버튼 클릭 시 개별 액션
  onImageAction,
  onNoteAction,
}) {
  const tabs = ["image", "note"]

  // 부모가 activeTab을 안 넘겨도 내부에서 직접 동작하도록 기본 상태 추가
  const [innerTab, setInnerTab] = useState("note")

  // controlled / uncontrolled 둘 다 지원
  const currentTab = activeTab ?? innerTab

  const changeTab = (tab) => {
    // 부모가 activeTab을 안 주는 경우 내부 상태로 직접 변경
    if (activeTab === undefined) {
      setInnerTab(tab)
    }

    // 부모 상태 변경이 필요한 경우 같이 호출
    onTabChange?.(tab)

    // 버튼처럼 눌렀을 때마다 액션 실행
    if (tab === "image") {
      onImageAction?.()
    }

    if (tab === "note") {
      onNoteAction?.()
    }
  }

  const handleTabKeyDown = (e, currentTabName) => {
    const currentIndex = tabs.indexOf(currentTabName)

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % tabs.length
      changeTab(tabs[nextIndex])
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length
      changeTab(tabs[prevIndex])
    }

    if (e.key === "Home") {
      e.preventDefault()
      changeTab(tabs[0])
    }

    if (e.key === "End") {
      e.preventDefault()
      changeTab(tabs[tabs.length - 1])
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      changeTab(currentTabName)
    }
  }

  return (
    <aside
      className="
        sticky top-0 z-50 flex h-[50px] w-full items-center gap-2 lg:gap-4
        lg:static lg:h-full lg:min-h-[820px] lg:w-[70px] lg:flex-col xl:w-[90px]
      "
    >
      {/* 로고 영역 */}
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

      {/* 메뉴/토글/프로필 래퍼 */}
      <div
        className="flex min-w-0 flex-1 flex-row items-center justify-between rounded-[999px] p-1 shadow-sm lg:w-full lg:flex-col lg:rounded-[80px] lg:p-2"
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
        {/* 상단 아이콘 메뉴 */}
        <nav
          className="flex min-w-0 flex-row items-center gap-2 sm:gap-3 lg:flex-col"
          role="tablist"
          aria-label="main tabs"
          aria-orientation="vertical"
        >
          {/* 이미지 탭 */}
          <IconButton
            theme={theme}
            isDark={isDark}
            active={currentTab === "image"}
            onClick={() => changeTab("image")}
            ariaLabel="image tab"
            role="tab"
            tabIndex={0}
            ariaSelected={currentTab === "image"}
            id="tab-image"
            controls="panel-image"
            onKeyDown={(e) => handleTabKeyDown(e, "image")}
          >
            <Image size={20} strokeWidth={2.2} />
          </IconButton>

          {/* 메모 탭 */}
          <IconButton
            theme={theme}
            isDark={isDark}
            active={currentTab === "note"}
            onClick={() => changeTab("note")}
            ariaLabel="note tab"
            role="tab"
            tabIndex={0}
            ariaSelected={currentTab === "note"}
            id="tab-note"
            controls="panel-note"
            onKeyDown={(e) => handleTabKeyDown(e, "note")}
          >
            <PenLine size={20} strokeWidth={2.2} />
          </IconButton>
        </nav>

        {/* 하단 토글 + 프로필 */}
        <div className="flex items-center gap-2 md:gap-4 lg:flex-col">
          <div className="flex">
            <ToggleButton isDark={isDark} onToggle={onToggleLightDark} />
          </div>

          <div className="h-[45px] w-[45px] flex-shrink-0 overflow-hidden rounded-full border border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.12)] lg:h-auto lg:w-full lg:aspect-square">
            <img
              src="./img/img8.jpg"
              alt="profile"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}