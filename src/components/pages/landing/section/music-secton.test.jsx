import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import MusicSection from "./music-section"

describe("MusicSection", () => {
  const mockTrack = {
    title: "테스트 곡",
    artist: "테스트 아티스트",
    src: "/test.mp3",
  }

  const theme = {
    text: "text-black",
    subtext: "text-gray-400",
    swatch: "#000",
  }

  it("재생 버튼 클릭 시 onTogglePlay 호출", async () => {
    const user = userEvent.setup()
    const onTogglePlay = vi.fn()

    render(
      <MusicSection
        currentTrack={mockTrack}
        currentTrackIndex={0}
        totalTracks={3}
        isPlaying={false}
        currentTime={0}
        duration={100}
        volume={1}
        theme={theme}
        panelBg=""
        onPrev={vi.fn()}
        onNext={vi.fn()}
        onTogglePlay={onTogglePlay}
        onSeek={vi.fn()}
        onVolumeChange={vi.fn()}
        audioRef={{ current: null }}
        onLoadedMetadata={vi.fn()}
        onTimeUpdate={vi.fn()}
        onPlay={vi.fn()}
        onPause={vi.fn()}
        onTrackEnd={vi.fn()}
        isDark={false}
      />
    )

    await user.click(screen.getByRole("button", { name: /play/i }))

    expect(onTogglePlay).toHaveBeenCalledTimes(1)
  })
})