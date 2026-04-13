import { X, Plus } from "lucide-react"

// 최대 이미지 개수 제한
const MAX_CASTING_IMAGES = 8

// 이미지 업로드/선택 섹션
export default function ImageSection({
  castingItems = [],
  mainImage,
  theme,
  sectionBg,
  onSelectMain,
  onDelete,
  onOpenFilePicker,
  fileInputRef,
  onAddImages,
  isDark,
}) {
  // 최대 개수까지만 자르기
  const safeCastingItems = (castingItems ?? []).slice(0, MAX_CASTING_IMAGES)
  // 추가 가능 여부
  const canAddMore = safeCastingItems.length < MAX_CASTING_IMAGES

  // 파일 선택 시 최대 개수 제한 적용
  const handleAddImages = (e) => {
    const remaining = MAX_CASTING_IMAGES - safeCastingItems.length
    if (remaining <= 0) return

    const limitedFiles = Array.from(e.target.files).slice(0, remaining)
    const limited = {
      ...e,
      target: {
        ...e.target,
        files: limitedFiles,
      },
    }
    onAddImages(limited)
    e.target.value = "" // 같은 파일 다시 선택 가능하게 초기화
  }

  return (
    // 전체 섹션 컨테이너
    <section
      className={`
        w-full rounded-[8px] p-4 lg:p-6
        lg:rounded-[16px] xl:rounded-[32px] flex flex-col
        ${sectionBg}
      `}
      style={{
        // 다크/라이트 배경
        background: isDark
          ? "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: isDark
          ? "1px solid rgba(0,0,0,0.28)"
          : "1px solid rgba(255,255,255,0.28)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 10px rgba(0,0,0,0.10)"
          : "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.10)",
      }}
    >
      {/* 상단 제목 + 개수 표시 */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className={`text-left text-xl lg:mb-1 ${theme.text}`}>
          IMAGE EXAMPLES
        </p>

        {/* 현재 개수 / 최대 개수 */}
        <p className={`shrink-0 pt-[2px] text-[11px] ${theme.subtext}`}>
          {safeCastingItems.length}/{MAX_CASTING_IMAGES}
        </p>
      </div>

      {/* 그리드 영역 */}
      <div className="flex h-auto items-center md:h-[calc(100%-46px)] lg:h-full lg:items-end">
        <div className="grid grid-cols-4 gap-2 w-full">
          {Array.from({ length: MAX_CASTING_IMAGES }).map((_, index) => {
            const item = safeCastingItems[index]
            // 추가 버튼 위치 판단
            const isAddCell = !item && index === safeCastingItems.length && canAddMore

            // 이미지가 있는 경우
            if (item) {
              // 현재 선택된 이미지인지 체크
              const isActive = mainImage === item.src

              return (
                <div key={item.id} className="relative aspect-square">
                  {/* 이미지 선택 버튼 */}
                  <button
                    type="button"
                    onClick={() => onSelectMain(item.src)} // 메인 이미지 변경
                    className={`
                      group relative flex h-full w-full flex-1 aspect-square cursor-pointer overflow-hidden rounded-[12px]
                      [transform:translateZ(0)] [backface-visibility:hidden]
                      [isolation:isolate] [contain:paint]
                      outline-none
                    `}
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.28)",
                      // 선택 상태에 따라 테두리 변경
                      border: isActive
                        ? `2px solid ${theme.swatch}`
                        : isDark
                          ? "1px solid rgba(255,255,255,0.10)"
                          : "1px solid rgba(255,255,255,0.40)",
                      boxShadow: isActive
                        ? `0 0 0 2px rgba(255,255,255,0.35)`
                        : "none",
                      WebkitTapHighlightColor: "transparent",
                    }}
                    aria-label={`select ${item.alt}`}
                  >
                    {/* hover 오버레이 */}
                    <span
                      aria-hidden="true"
                      className={`
                        pointer-events-none absolute inset-0 z-10 rounded-[12px]
                        opacity-0 transition-opacity duration-150
                        ${isDark ? "bg-white/8 group-hover:opacity-100" : "bg-white/20 group-hover:opacity-100"}
                      `}
                    />
                    {/* 이미지 */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="relative z-0 h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden]"
                    />
                  </button>

                  {/* 삭제 버튼 */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation() // 부모 클릭 방지
                      onDelete(item.id)
                    }}
                    className={`
                      absolute -right-2 -top-2 z-20 flex h-5 w-5 items-center justify-center rounded-full
                      text-white shadow-md
                      [transform:translateZ(0)] [backface-visibility:hidden]
                      [isolation:isolate] [contain:paint]
                    `}
                    style={{
                      background: "rgb(0 0 0 / 41%)",
                      WebkitTapHighlightColor: "transparent",
                    }}
                    aria-label={`delete ${item.alt}`}
                  >
                    {/* hover 효과 */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full bg-white/0 opacity-0 transition-opacity duration-150 hover:opacity-100"
                    />
                    <X size={10} strokeWidth={2.5} className="relative z-10" />
                  </button>
                </div>
              )
            }

            // 이미지 추가 버튼 셀
            if (isAddCell) {
              return (
                <button
                  key={`add-${index}`}
                  type="button"
                  onClick={onOpenFilePicker} // 파일 선택 열기
                  className={`
                    group relative flex h-full w-full flex-1 aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-[12px]
                    [transform:translateZ(0)] [backface-visibility:hidden]
                    [isolation:isolate] [contain:paint]
                    outline-none
                  `}
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.45)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.10)"
                      : "1px solid rgba(255,255,255,0.35)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  aria-label="add casting images"
                >
                  {/* hover 오버레이 */}
                  <span
                    aria-hidden="true"
                    className={`
                      pointer-events-none absolute inset-0 rounded-[12px]
                      opacity-0 transition-opacity duration-150
                      ${isDark ? "bg-white/10 group-hover:opacity-100" : "bg-white/25 group-hover:opacity-100"}
                    `}
                  />
                  {/* + 아이콘 */}
                  <Plus
                    size={24}
                    strokeWidth={1.8}
                    className={`relative z-10 ${isDark ? "text-white/70" : "text-stone-600"}`}
                  />
                </button>
              )
            }

            // 빈 셀 (placeholder)
            return (
              <div
                key={`empty-${index}`}
                className="aspect-square h-full w-full rounded-[12px]"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.18)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid rgba(255,255,255,0.15)",
                }}
              />
            )
          })}
        </div>
      </div>

      {/* 숨겨진 파일 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleAddImages}
      />
    </section>
  )
}