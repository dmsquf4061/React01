import { SkipBack, SkipForward, Play, Pause, Volume2 } from "lucide-react"

function formatTime(time) {
  if (!Number.isFinite(time)) return "0:00"
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

function PlayerRoundButton({ onClick, ariaLabel, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-stone-500 transition hover:bg-white"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(255,255,255,0.28)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 30px rgba(0,0,0,0.10)",
      }}
    >
      {children}
    </button>
  )
}

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
      className={`rounded-[10px] p-4 md:self-start lg:flex lg:rounded-[20px] lg:p-6 xl:rounded-[40px] flex-col gap-4 ${panelBg}`}
      style={{
        background: isDark
          ? "linear-gradient(rgb(0 0 0 / 30%) 0%, rgb(0 0 0 / 10%) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: isDark ? "1px solid rgb(0 0 0 / 28%)" : "1px solid rgba(255,255,255,0.28)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgb(0 0 0 / 35%), 0px 10px 30px rgb(0 0 0 / 10%)"
          : "inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 30px rgba(0,0,0,0.10)",
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
              background: `linear-gradient(to right, ${theme.swatch} 0%, ${theme.swatch} ${progressPercent}%, #d1d5db ${progressPercent}%, #d1d5db 100%)`,
              ["--range-thumb-color"]: theme.swatch,
            }}
          />
        </div>

        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PlayerRoundButton onClick={onPrev} ariaLabel="previous track">
              <SkipBack size={18} strokeWidth={2} />
            </PlayerRoundButton>

            <PlayerRoundButton
              onClick={onTogglePlay}
              ariaLabel={isPlaying ? "pause" : "play"}
            >
              {isPlaying ? (
                <Pause size={18} strokeWidth={2} />
              ) : (
                <Play size={18} strokeWidth={2} className="ml-[1px]" />
              )}
            </PlayerRoundButton>

            <PlayerRoundButton onClick={onNext} ariaLabel="next track">
              <SkipForward size={18} strokeWidth={2} />
            </PlayerRoundButton>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Volume2 className={`h-4 w-4 shrink-0 ${theme.subtext}`} />

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={onVolumeChange}
              className="music-range h-2 w-24 cursor-pointer appearance-none rounded-full sm:w-28"
              style={{
                background: `linear-gradient(to right, ${theme.swatch} 0%, ${theme.swatch} ${volumePercent}%, #d1d5db ${volumePercent}%, #d1d5db 100%)`,
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