import CalendarSection from "./calendar-section"
import MemoSection from "./memo-section"
import ClockSection from "./clock-section"

// 캘린더 영역 크기
const CALENDAR_BOX_W = 380
const CALENDAR_BOX_H = 460

// 메인 비주얼 + 캘린더 + 메모 섹션
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
      {/* 전체 메인 섹션 */}
      <section
        className="
          flex h-full w-full lg:min-h-[780px] flex-col gap-4 overflow-visible
          rounded-[8px]
          lg:relative lg:rounded-[16px]
          xl:rounded-[32px]
        "
      >
        {/* 메인 이미지 영역 */}
        <div
          ref={clipRef}
          className="
            relative inset-0 overflow-hidden rounded-[8px] shadow-md
            lg:absolute lg:rounded-[16px]
            xl:rounded-[32px]
          "
          style={{
            // lg 이상일 때만 clipPath 적용
            clipPath: isLg ? clip : undefined,
            WebkitClipPath: isLg ? clip : undefined,
            // 모바일/태블릿에서는 높이 고정
            height: isLg ? "100%" : "500px",
          }}
        >
          {/* 시계 오버레이 */}
          <ClockSection isDark={isDark} />

          {/* 메인 이미지 */}
          <img
            src={mainImage}
            alt="main visual"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* lg 이상 레이아웃 */}
        {isLg ? (
          <>
            {/* 캘린더 고정 영역 */}
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

            {/* 메모 섹션 */}
            <MemoSection
              isLg={true}
              isDark={isDark}
              theme={theme}
              memoDate={memoDate}
              onMemoOpen={onMemoOpen}
            />
          </>
        ) : (
          // lg 미만 레이아웃
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {/* 캘린더 영역 */}
            <div className="min-w-0">
              <CalendarSection
                date={date}
                onDateChange={onDateChange}
                theme={theme}
                isDark={isDark}
              />
            </div>

            {/* 메모 영역 */}
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