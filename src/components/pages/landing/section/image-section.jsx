import { X, Plus } from "lucide-react"

const MAX_CASTING_IMAGES = 8

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
  const safeCastingItems = (castingItems ?? []).slice(0, MAX_CASTING_IMAGES)
  const canAddMore = safeCastingItems.length < MAX_CASTING_IMAGES

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
    e.target.value = ""
  }

  return (
    <section
      className={`
        w-full rounded-[10px] p-4 lg:p-6
        lg:rounded-[20px] xl:rounded-[40px] flex flex-col
        ${sectionBg}
      `}
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
          ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 10px rgba(0,0,0,0.10)"
          : "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.10)",
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className={`text-left text-xl lg:mb-1 ${theme.text}`}>IMAGE EXAMPLES</p>

        <p className={`shrink-0 pt-[2px] text-[11px] ${theme.subtext}`}>
          {safeCastingItems.length}/{MAX_CASTING_IMAGES}
        </p>
      </div>

      <div className="flex h-auto items-center md:h-[calc(100%-46px)] lg:h-full lg:items-end">
        <div className="grid grid-cols-4 gap-2 w-full">
          {Array.from({ length: MAX_CASTING_IMAGES }).map((_, index) => {
            const item = safeCastingItems[index]
            const isAddCell = !item && index === safeCastingItems.length && canAddMore

            if (item) {
              const isActive = mainImage === item.src

              return (
                <div key={item.id} className="relative aspect-square">
                  <button
                    type="button"
                    onClick={() => onSelectMain(item.src)}
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
                    <span
                      aria-hidden="true"
                      className={`
                        pointer-events-none absolute inset-0 z-10 rounded-[12px]
                        opacity-0 transition-opacity duration-150
                        ${isDark ? "bg-white/8 group-hover:opacity-100" : "bg-white/20 group-hover:opacity-100"}
                      `}
                    />
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="relative z-0 h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden]"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
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
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full bg-white/0 opacity-0 transition-opacity duration-150 hover:opacity-100"
                    />
                    <X size={10} strokeWidth={2.5} className="relative z-10" />
                  </button>
                </div>
              )
            }

            if (isAddCell) {
              return (
                <button
                  key={`add-${index}`}
                  type="button"
                  onClick={onOpenFilePicker}
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
                  <span
                    aria-hidden="true"
                    className={`
                      pointer-events-none absolute inset-0 rounded-[12px]
                      opacity-0 transition-opacity duration-150
                      ${isDark ? "bg-white/10 group-hover:opacity-100" : "bg-white/25 group-hover:opacity-100"}
                    `}
                  />
                  <Plus
                    size={24}
                    strokeWidth={1.8}
                    className={`relative z-10 ${isDark ? "text-white/70" : "text-stone-600"}`}
                  />
                </button>
              )
            }

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