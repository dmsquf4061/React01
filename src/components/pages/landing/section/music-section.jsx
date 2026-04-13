import { memo } from "react"

// 초 단위 시간을 mm:ss 형식으로 변환
function formatTime(time) {
  if (!Number.isFinite(time)) return "0:00"
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

// 음악 플레이어 섹션
const MusicSection = memo(function MusicSection({
  currentTrack,
  currentTrackIndex,
  totalTracks,
  currentTime,
  duration,
  theme,
  panelBg,
  onPrev,
  onNext,
  audioRef,
  onLoadedMetadata,
  onTimeUpdate,
  onPlay,
  onPause,
  onTrackEnd,
  isDark,
}) {
  return (
    <section
      className={`flex h-full flex-col justify-between gap-4 rounded-[8px] p-4 md:self-start lg:rounded-[16px] lg:p-6 xl:rounded-[32px] ${panelBg}`}
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
      }}
    >
      {/* 상단: 곡 정보 */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 text-left">
          <p className={`truncate text-xl lg:mb-1 ${theme.text}`}>
            {currentTrack.title}
          </p>
          <p className={`mt-2 text-sm ${theme.subtext}`}>
            {currentTrack.artist}
          </p>
        </div>

        {/* 현재 곡 번호 / 전체 곡 수 */}
        <p className={`shrink-0 text-[12px] font-medium leading-none ${theme.subtext}`}>
          {currentTrackIndex + 1}/{totalTracks}
        </p>
      </div>

      {/* 중간: 시간 정보 */}
      <div className="flex flex-col gap-3">
        <div className="flex w-full justify-end">
          <p className={`shrink-0 text-sm ${theme.subtext}`}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>

        {/* 브라우저 기본 오디오 컨트롤 */}
        <div className="w-full">
          <audio
            ref={audioRef}
            controls
            preload="auto"
            className="w-full"
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onTrackEnd}
            style={{
              width: "100%",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <source src={currentTrack.src} type="audio/mpeg" />
          </audio>
        </div>
      </div>

      {/* 하단: 이전 / 다음 곡 버튼 */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          className={`
            rounded-full px-4 py-2 text-sm transition cursor-pointer
            ${isDark
              ? "bg-white/10 text-white hover:bg-white/15"
              : "bg-white/40 text-stone-700 hover:bg-white/60"}
          `}
          style={{
            WebkitTapHighlightColor: "transparent",
            border: isDark
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(255,255,255,0.28)",
          }}
        >
          이전 곡
        </button>

        <button
          type="button"
          onClick={onNext}
          className={`
            rounded-full px-4 py-2 text-sm transition cursor-pointer
            ${isDark
              ? "bg-white/10 text-white hover:bg-white/15"
              : "bg-white/40 text-stone-700 hover:bg-white/60"}
          `}
          style={{
            WebkitTapHighlightColor: "transparent",
            border: isDark
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(255,255,255,0.28)",
          }}
        >
          다음 곡
        </button>
      </div>
    </section>
  )
})

export default MusicSection