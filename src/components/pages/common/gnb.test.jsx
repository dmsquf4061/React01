import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import Gnb from "@/components/pages/common/gnb"

describe("Gnb", () => {
  const theme = {
    text: "text-stone-800",
    subtext: "text-stone-400",
    gnbText: "text-stone-900",
    gnbActiveBg: "bg-stone-900",
    gnbActiveText: "text-white",
  }

  it("다크모드 토글 클릭 시 콜백이 실행된다", async () => {
    const user = userEvent.setup()
    const onToggleLightDark = vi.fn()

    render(
      <Gnb
        theme={theme}
        isDark={false}
        onToggleLightDark={onToggleLightDark}
      />
    )

    await user.click(screen.getByRole("button", { name: /toggle theme/i }))
    expect(onToggleLightDark).toHaveBeenCalledTimes(1)
  })
})