import { useEffect, useMemo, useRef, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight } from "lucide-react"

// 공통 transition easing 값
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

// 전달받은 날짜의 해당 월 1일 반환
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

// 두 날짜가 같은 연/월인지 확인
function isSameMonth(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth()
  )
}

// 캘린더 섹션 컴포넌트
export default function CalendarSection({ date, onDateChange, theme, isDark }) {
  // 오늘 날짜와 오늘이 속한 월
  const today = useMemo(() => new Date(), [])
  const todayMonth = useMemo(() => startOfMonth(today), [today])

  // 현재 캘린더에 보여줄 월 상태
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(date || today))

  // 캘린더 래퍼 ref
  const calendarWrapRef = useRef(null)

  // 선택 날짜가 바뀌면 표시 월도 같이 맞춤
  useEffect(() => {
    if (date) {
      setCurrentMonth(startOfMonth(date))
    }
  }, [date])

  // 모바일에서 날짜 선택 후 포커스가 남아서 스크롤을 막는 현상 방지
  useEffect(() => {
    const wrap = calendarWrapRef.current
    if (!wrap) return

    let startY = 0
    let moved = false

    const blurIfCalendarButtonFocused = () => {
      const active = document.activeElement
      if (!(active instanceof HTMLElement)) return
      if (!wrap.contains(active)) return

      // 캘린더 내부 button에 포커스가 남아 있으면 해제
      if (active.tagName === "BUTTON") {
        active.blur()
      }
    }

    const handleTouchStart = (e) => {
      startY = e.touches[0]?.clientY ?? 0
      moved = false
    }

    const handleTouchMove = (e) => {
      const currentY = e.touches[0]?.clientY ?? 0

      // 스크롤 의도로 보일 정도로 움직이면 포커스 해제
      if (Math.abs(currentY - startY) > 6) {
        moved = true
        blurIfCalendarButtonFocused()
      }
    }

    const handleTouchEnd = () => {
      // 드래그가 끝난 뒤에도 포커스가 남아 있으면 한 번 더 정리
      if (moved) {
        blurIfCalendarButtonFocused()
      }
    }

    wrap.addEventListener("touchstart", handleTouchStart, { passive: true })
    wrap.addEventListener("touchmove", handleTouchMove, { passive: true })
    wrap.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      wrap.removeEventListener("touchstart", handleTouchStart)
      wrap.removeEventListener("touchmove", handleTouchMove)
      wrap.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  // theme 값이 없을 때를 대비한 기본 테마값
  const safeTheme = useMemo(
    () => ({
      text: theme?.text ?? (isDark ? "text-white" : "text-stone-900"),
      calendarCaption: theme?.calendarCaption ?? (isDark ? "text-white" : "text-stone-700"),
      calendarWeekday: theme?.calendarWeekday ?? (isDark ? "text-white/50" : "text-stone-400"),
      calendarToday:
        theme?.calendarToday ?? (isDark ? "[&>button]:bg-white/15" : "[&>button]:bg-stone-200/70"),
      calendarSelected:
        theme?.calendarSelected ??
        (isDark
          ? "[&>button]:bg-white [&>button]:text-stone-900 [&>button]:hover:bg-white"
          : "[&>button]:bg-stone-900 [&>button]:text-white [&>button]:hover:bg-stone-900"),
      calendarSelectedButton:
        theme?.calendarSelectedButton ??
        (isDark
          ? "aria-selected:bg-white aria-selected:text-stone-900 aria-selected:hover:bg-white"
          : "aria-selected:bg-stone-900 aria-selected:text-white aria-selected:hover:bg-stone-900"),
    }),
    [theme, isDark]
  )

  // 현재 보고 있는 월이 이번 달인지 체크
  const isCurrentMonthView = isSameMonth(currentMonth, todayMonth)

  // 상단에 표시할 연/월 텍스트
  const monthLabel = currentMonth.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  })

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    )
  }

  // 다음 달로 이동
  const handleNextMonth = () => {
    if (isCurrentMonthView) return

    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    )

    // 오늘 월보다 뒤로는 이동하지 않음
    if (nextMonth > todayMonth) {
      setCurrentMonth(todayMonth)
      return
    }

    setCurrentMonth(nextMonth)
  }

  // 오늘 날짜로 이동
  const handleGoToday = () => {
    const now = new Date()
    setCurrentMonth(startOfMonth(now))
    onDateChange(now)

    // 오늘 버튼 클릭 후 포커스 제거
    requestAnimationFrame(() => {
      const active = document.activeElement
      if (active instanceof HTMLElement) active.blur()
    })
  }

  return (
    <section
      className="
        h-full w-full rounded-[8px] p-5 text-white shadow-sm
        lg:rounded-[16px] xl:rounded-[32px]
        transition-[background,border-color,box-shadow,color] duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
      "
      style={{
        background: isDark
          ? "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: isDark
          ? "1px solid rgba(0,0,0,0.28)"
          : "1px solid rgba(255,255,255,0.28)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.10)"
          : "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.10)",
        transition: `background 500ms ${EASE}, border-color 500ms ${EASE}, box-shadow 500ms ${EASE}, color 320ms ${EASE}`,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* 상단 헤더 */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <p
            className={`
              shrink-0 text-base font-semibold lg:text-lg
              transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${safeTheme.text}
            `}
          >
            {monthLabel}
          </p>

          {!isCurrentMonthView && (
            <button
              type="button"
              onClick={handleGoToday}
              className={`
                inline-flex h-9 items-center justify-center rounded-full px-3 text-sm font-medium cursor-pointer
                relative overflow-hidden whitespace-nowrap
                [transform:translateZ(0)] [backface-visibility:hidden]
                [isolation:isolate] [contain:paint]
                transition-[background,border-color,box-shadow,color] duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${safeTheme.text}
                ${
                  isDark
                    ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.06)_100%)] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_6px_rgba(0,0,0,0.18)]"
                    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.10)_100%)] border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_6px_rgba(0,0,0,0.10)]"
                }
              `}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span className="relative z-10">오늘</span>
            </button>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="이전 달"
            className={`
              inline-flex h-9 w-9 items-center justify-center rounded-full cursor-pointer
              relative overflow-hidden
              [transform:translateZ(0)] [backface-visibility:hidden]
              [isolation:isolate] [contain:paint]
              transition-[background,border-color,box-shadow] duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                isDark
                  ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.06)_100%)] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_6px_rgba(0,0,0,0.18)]"
                  : "bg-[linear-gradient(180deg,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.10)_100%)] border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_6px_rgba(0,0,0,0.10)]"
              }
            `}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <ChevronLeft
              className={`
                relative z-10 h-5 w-5
                transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isDark ? "text-white/80" : "text-stone-600"}
                ${safeTheme.calendarCaption}
              `}
            />
          </button>

          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="다음 달"
            disabled={isCurrentMonthView}
            className={`
              inline-flex h-9 w-9 items-center justify-center rounded-full
              relative overflow-hidden
              [transform:translateZ(0)] [backface-visibility:hidden]
              [isolation:isolate] [contain:paint]
              transition-[background,border-color,box-shadow,opacity] duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                isDark
                  ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.06)_100%)] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_6px_rgba(0,0,0,0.18)]"
                  : "bg-[linear-gradient(180deg,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.10)_100%)] border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_6px_rgba(0,0,0,0.10)]"
              }
              ${isCurrentMonthView ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
            `}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <ChevronRight
              className={`
                relative z-10 h-5 w-5
                transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isDark ? "text-white/80" : "text-stone-600"}
                ${safeTheme.calendarCaption}
              `}
            />
          </button>
        </div>
      </div>

      {/* 캘린더 본문 */}
      <div
        ref={calendarWrapRef}
        className="h-[calc(100%-55px)] w-full"
        style={{
          touchAction: "pan-y",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <Calendar
          mode="single"
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          selected={date}
          onSelect={(d) => {
            onDateChange(d || date)

            // 날짜 선택 직후 버튼 포커스 해제
            requestAnimationFrame(() => {
              const active = document.activeElement
              if (
                active instanceof HTMLElement &&
                calendarWrapRef.current?.contains(active)
              ) {
                active.blur()
              }
            })
          }}
          endMonth={todayMonth}
          hideNavigation
          required
          className={`
            h-full w-full bg-white/0 p-0
            transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isDark ? "dark-calendar" : ""}
          `}
          components={{
            Chevron: ({ orientation, className }) =>
              orientation === "left" ? (
                <ChevronLeft className={className} />
              ) : (
                <ChevronRight className={className} />
              ),
          }}
          classNames={{
            months: "flex h-full w-full flex-col gap-3",
            month: "flex h-full w-full flex-col gap-3 justify-center",
            month_caption: "hidden",
            caption_label: `
              mt-0 text-base font-semibold
              transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${safeTheme.text}
            `,
            nav: "hidden",
            month_grid: "w-full table-fixed border-collapse",
            weekdays: "w-full",
            weekday: `
              pb-1 text-center text-[12px] font-medium
              transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${safeTheme.calendarWeekday}
            `,
            weeks: "w-full",
            week: "w-full",
            today: `${safeTheme.calendarToday}`,
            outside: "opacity-30",
            disabled: "opacity-30",
            selected: isDark ? "" : `${safeTheme.calendarSelected}`,
            day: `
              p-0 text-center align-middle
              h-[2.75rem] w-[2.75rem] md:h-[3rem] md:w-[3rem]
            `,
            day_button: isDark
              ? `
                mx-auto inline-flex items-center justify-center rounded-full
                h-[2.35rem] w-[2.35rem] md:h-[2.6rem] md:w-[2.6rem]
                cursor-pointer text-white outline-none border-none ring-0
                select-none [touch-action:pan-y] [webkit-tap-highlight-color:transparent]
                transition-[background,color,opacity] duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${safeTheme.calendarSelectedButton}
              `
              : `
                mx-auto inline-flex items-center justify-center rounded-full
                h-[2.35rem] w-[2.35rem] md:h-[2.6rem] md:w-[2.6rem]
                cursor-pointer text-stone-900 outline-none border-none ring-0
                select-none [touch-action:pan-y] [webkit-tap-highlight-color:transparent]
                transition-[background,color,opacity] duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${safeTheme.calendarSelectedButton}
              `,
          }}
        />
      </div>
    </section>
  )
}