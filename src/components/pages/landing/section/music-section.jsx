import { memo } from "react"
import { SkipBack, SkipForward, Play, Pause, Volume2 } from "lucide-react"

function formatTime(time) {
  if (!Number.isFinite(time)) return "0:00"
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

const PlayerRoundButton = memo(function PlayerRoundButton({
  onClick,
  ariaLabel,
  children,
  isDark,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "group relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full cursor-pointer select-none",
        "[transform:translateZ(0)] [backface-visibility:hidden]",
        "[isolation:isolate] [contain:paint]",
        "outline-none",
        isDark ? "text-white" : "text-stone-600",
      ].join(" ")}
      style={{
        background: isDark
          ? "rgba(255,255,255,0.10)"
          : "rgba(255,255,255,0.22)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.16)"
          : "1px solid rgba(255,255,255,0.28)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 16px rgba(0,0,0,0.14)"
          : "inset 0 1px 0 rgba(255,255,255,0.30), 0 6px 16px rgba(0,0,0,0.08)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 rounded-full opacity-0",
          "transition-opacity duration-150",
          isDark ? "bg-white/10 group-hover:opacity-100" : "bg-white/35 group-hover:opacity-100",
        ].join(" ")}
      />
      <span className="relative z-10 flex items-center justify-center [transform:translateZ(0)]">
        {children}
      </span>
    </button>
  )
})

export default function MusicSection({
  currentTrack,
  currentTrackIndex,
  totalTracks,
  isPlaying,
  currentTime,
  duration,
  volume,
  theme,
  panelBg,
  onPrev,
  onNext,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  audioRef,
  onLoadedMetadata,
  onTimeUpdate,
  onPlay,
  onPause,
  onTrackEnd,
  isDark,
}) {
  const progressPercent = duration ? (currentTime / duration) * 100 : 0
  const volumePercent = volume * 100

  return (
    <section
      className={`rounded-[10px] p-4 md:self-start lg:flex lg:rounded-[20px] lg:p-6 xl:rounded-[40px] flex-col gap-4 h-full ${panelBg} justify-between`}
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
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 text-left">
          <p className={`truncate text-xl lg:mb-1 ${theme.text}`}>{currentTrack.title}</p>
          <p className={`mt-2 text-sm ${theme.subtext}`}>{currentTrack.artist}</p>
        </div>

        <p className={`shrink-0 font-medium leading-none text-[12px] ${theme.subtext}`}>
          {currentTrackIndex + 1}/{totalTracks}
        </p>
      </div>

      <div className="flex flex-col items-start gap-3">
        <div className="flex w-full justify-end">
          <p className={`shrink-0 text-sm ${theme.subtext}`}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>

        <div className="w-full">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={onSeek}
            className="music-range h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, ${theme.swatch} 0%, ${theme.swatch} ${progressPercent}%, #fff ${progressPercent}%, #fff 100%)`,
              ["--range-thumb-color"]: theme.swatch,
            }}
          />
        </div>

        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PlayerRoundButton onClick={onPrev} ariaLabel="previous track" isDark={isDark}>
              <SkipBack size={18} strokeWidth={2} />
            </PlayerRoundButton>

            <PlayerRoundButton
              onClick={onTogglePlay}
              ariaLabel={isPlaying ? "pause" : "play"}
              isDark={isDark}
            >
              {isPlaying ? (
                <Pause size={18} strokeWidth={2} />
              ) : (
                <Play size={18} strokeWidth={2} className="ml-[1px]" />
              )}
            </PlayerRoundButton>

            <PlayerRoundButton onClick={onNext} ariaLabel="next track" isDark={isDark}>
              <SkipForward size={18} strokeWidth={2} />
            </PlayerRoundButton>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Volume2 className={`h-4 w-4 shrink-0 ${isDark ? "text-white/70" : theme.subtext}`} />

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={onVolumeChange}
              className="music-range h-2 w-24 cursor-pointer appearance-none rounded-full sm:w-28"
              style={{
                background: `linear-gradient(to right, ${theme.swatch} 0%, ${theme.swatch} ${volumePercent}%, #fff ${volumePercent}%, #fff 100%)`,
                ["--range-thumb-color"]: theme.swatch,
              }}
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onTrackEnd}
      >
        <source src={currentTrack.src} type="audio/mpeg" />
      </audio>
    </section>
  )
}