import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarSection({ date, onDateChange, theme, isDark }) {
  return (
    <section
      className="h-full w-full rounded-[10px] p-5 text-white shadow-sm lg:rounded-[20px] xl:rounded-[40px]"
      style={{
        background: isDark
          ? "linear-gradient(rgb(0 0 0 / 30%) 0%, rgb(0 0 0 / 10%) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: isDark
          ? "1px solid rgb(0 0 0 / 28%)"
          : "1px solid rgba(255,255,255,0.28)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgb(0 0 0 / 35%), 0px 10px 30px rgb(0 0 0 / 10%)"
          : "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.10)",
      }}
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={(d) => {
          onDateChange(d || date)
        }}
        required
        className={`h-full w-full bg-white/0 p-0 ${isDark ? "dark-calendar" : ""}`}
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
          month: "flex h-full w-full flex-col justify-center gap-3 space-y-4",
          month_caption: "m-0 flex items-center justify-between text-lg",
          caption_label: `mt-0 text-base font-semibold ${theme.text}`,
          nav: "flex items-center gap-2",
          button_previous: `
            inline-flex h-9 w-9 items-center justify-center rounded-full cursor-pointer
            relative overflow-hidden
            [transform:translateZ(0)] [backface-visibility:hidden]
            [isolation:isolate] [contain:paint]
            !transition-none
            bg-[linear-gradient(180deg,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.10)_100%)]
            border border-white/30
            shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_6px_rgba(0,0,0,0.10)]
            before:pointer-events-none before:absolute before:inset-0 before:rounded-full
            before:opacity-0 before:transition-opacity before:duration-150
            before:bg-white/20 hover:before:opacity-100
          `,

          button_next: `
            inline-flex h-9 w-9 items-center justify-center rounded-full cursor-pointer
            relative overflow-hidden
            [transform:translateZ(0)] [backface-visibility:hidden]
            [isolation:isolate] [contain:paint]
            !transition-none
            bg-[linear-gradient(180deg,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.10)_100%)]
            border border-white/30
            shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_6px_rgba(0,0,0,0.10)]
            before:pointer-events-none before:absolute before:inset-0 before:rounded-full
            before:opacity-0 before:transition-opacity before:duration-150
            before:bg-white/20 hover:before:opacity-100
          `,

          chevron: `relative z-10 h-3 w-3 text-stone-400`,
          chevron: `relative z-10 h-5 w-5 text-stone-600 ${theme.calendarCaption}`,
          month_grid: "w-full table-fixed border-collapse",
          weekdays: "w-full",
          weekday: `pb-0 text-center text-[12px] font-medium text-stone-400`,
          weeks: "w-full",
          week: "mt-2 w-full",
          today: `${theme.calendarToday}`,
          outside: "opacity-30",
          disabled: "opacity-30",
          selected: isDark ? "" : `${theme.calendarSelected}`,
          day: "p-0 text-center [--cell-size:2.5rem] [--cell-radius:9999px]",
          day_button: isDark
            ? `h-10 w-10 cursor-pointer rounded-full text-white outline-none border-none ring-0 !transition-none active:scale-90 active:opacity-70`
            : `text-stone-900 ${theme.calendarSelectedButton} cursor-pointer outline-none border-none ring-0 active:scale-90`,
        }}
      />
    </section>
  )
}