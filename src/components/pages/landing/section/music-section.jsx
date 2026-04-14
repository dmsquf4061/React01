import { memo } from "react"
import { SkipBack, SkipForward, Play, Pause, Volume2, VolumeX } from "lucide-react"

// 초 단위 시간을 mm:ss 형식으로 변환
function formatTime(time) {
  if (!Number.isFinite(time)) return "0:00"
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

// 공통 원형 플레이어 버튼
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

// 음악 플레이어 섹션
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
  // 재생 진행률
  const progressPercent = duration ? (currentTime / duration) * 100 : 0
  // 볼륨 퍼센트
  const volumePercent = Math.max(0, Math.min(100, volume * 100))

  // 다크모드일 때 남은 트랙 색상
  const trackRestColor = isDark ? "rgba(255,255,255,0.25)" : "#ffffff"

  // 재생 위치 변경
  const handleSeekChange = (e) => {
    onSeek?.(e)
  }

  // 볼륨 변경
  const handleVolumeInput = (e) => {
    onVolumeChange?.(e)
  }

  // 음소거 / 해제
  const handleMuteToggle = () => {
    const nextVolume = volume > 0 ? 0 : 1

    onVolumeChange?.({
      target: { value: String(nextVolume) },
    })
  }

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

        <p className={`shrink-0 text-[12px] font-medium leading-none ${theme.subtext}`}>
          {currentTrackIndex + 1}/{totalTracks}
        </p>
      </div>

      {/* 중간: 시간, 진행바, 컨트롤 */}
      <div className="flex flex-col items-start gap-3">
        {/* 현재 시간 / 전체 시간 */}
        <div className="flex w-full justify-end">
          <p className={`shrink-0 text-sm ${theme.subtext}`}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>

        {/* 재생 진행 바 */}
        <div className="w-full">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeekChange}
            onInput={handleSeekChange}
            className="music-range h-2 w-full cursor-pointer appearance-none rounded-full"
            style={{
              WebkitTapHighlightColor: "transparent",
              touchAction: "pan-x",
              ["--range-progress-percent"]: `${progressPercent}%`,
              ["--range-progress-color"]: theme.swatch,
              ["--range-rest-color"]: trackRestColor,
              ["--range-thumb-color"]: "#ffffff",
            }}
            aria-label="track progress"
          />
        </div>

        {/* 하단 컨트롤 */}
        <div className="flex w-full items-center justify-between gap-3">
          {/* 이전 / 재생 / 다음 버튼 */}
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

          {/* 볼륨 컨트롤 */}
          <div className="flex min-w-0 items-center justify-end gap-2">
            <PlayerRoundButton
              onClick={handleMuteToggle}
              ariaLabel={volume > 0 ? "mute" : "unmute"}
              isDark={isDark}
            >
              {volume > 0 ? (
                <Volume2 size={16} strokeWidth={2} />
              ) : (
                <VolumeX size={16} strokeWidth={2} />
              )}
            </PlayerRoundButton>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeInput}
              onInput={handleVolumeInput}
              className="music-range h-2 w-20 cursor-pointer appearance-none rounded-full sm:w-24 md:w-28"
              style={{
                WebkitTapHighlightColor: "transparent",
                touchAction: "pan-x",
                ["--range-progress-percent"]: `${volumePercent}%`,
                ["--range-progress-color"]: theme.swatch,
                ["--range-rest-color"]: trackRestColor,
                ["--range-thumb-color"]: "#ffffff",
              }}
              aria-label="volume"
            />
          </div>
        </div>
      </div>

      {/* 실제 오디오 요소 */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onTrackEnd}
        playsInline
      >
        <source src={currentTrack.src} type="audio/mpeg" />
      </audio>
    </section>
  )
}