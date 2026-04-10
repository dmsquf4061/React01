import CalendarSection from "./calendar-section"
import MemoSection from "./memo-section"
import ClockSection from "./clock-section"

const CALENDAR_BOX_W = 380
const CALENDAR_BOX_H = 460

export default function MainSection({
  mainImage,
  clip,
  isLg,
  isDark,
  theme,
  clipRef,
  memoDate,
  onMemoOpen,
  date,
  onDateChange,
}) {
  return (
    <main className="min-w-0 flex-1">
      <section
        className="
          flex h-full w-full min-h-[420px] flex-col gap-4 overflow-visible
          rounded-[10px]
          lg:relative lg:min-h-[820px] lg:rounded-[20px]
          xl:rounded-[40px]
        "
      >
        <div
          ref={clipRef}
          className="
            relative inset-0 overflow-hidden rounded-[10px] shadow-md
            lg:absolute lg:rounded-[30px]
            xl:rounded-[50px]
          "
          style={{
            clipPath: isLg ? clip : undefined,
            WebkitClipPath: isLg ? clip : undefined,
            height: isLg ? "100%" : "500px",
          }}
        >
          <ClockSection isDark={isDark} />
          <img
            src={mainImage}
            alt="main visual"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {isLg ? (
          <>
            <div
              className="absolute bottom-0 left-0 z-20 pr-4 pt-4"
              style={{
                width: `${CALENDAR_BOX_W}px`,
                height: `${CALENDAR_BOX_H}px`,
              }}
            >
              <CalendarSection
                date={date}
                onDateChange={onDateChange}
                theme={theme}
                isDark={isDark}
              />
            </div>

            <MemoSection
              isLg={true}
              isDark={isDark}
              theme={theme}
              memoDate={memoDate}
              onMemoOpen={onMemoOpen}
            />
          </>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <div className="min-w-0">
              <CalendarSection
                date={date}
                onDateChange={onDateChange}
                theme={theme}
                isDark={isDark}
              />
            </div>

            <div className="min-w-0">
              <MemoSection
                isLg={false}
                isDark={isDark}
                theme={theme}
                memoDate={memoDate}
                onMemoOpen={onMemoOpen}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  )
}