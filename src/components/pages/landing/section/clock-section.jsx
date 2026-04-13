"use client"

import { useEffect, useState } from "react"

// 현재 시간을 표시하는 컴포넌트
export default function ClockSection({ isDark }) {
  // 시간 상태 (HH:MM:SS)
  const [time, setTime] = useState("")

  useEffect(() => {
    // 현재 시간 계산 후 상태 업데이트
    const updateTime = () => {
      const now = new Date()

      // 시/분/초 2자리로 포맷
      const h = String(now.getHours()).padStart(2, "0")
      const m = String(now.getMinutes()).padStart(2, "0")
      const s = String(now.getSeconds()).padStart(2, "0")

      setTime(`${h}:${m}:${s}`)
    }

    updateTime() // 최초 실행
    const interval = setInterval(updateTime, 1000) // 1초마다 갱신

    return () => clearInterval(interval) // 언마운트 시 정리
  }, [])

  return (
    // 시계 전체 컨테이너 (좌측 하단 고정)
    <div
      className="
        pointer-events-none
        absolute z-20
        left-4 bottom-4
        flex items-center justify-center
        px-4

        w-[220px] h-[72px] rounded-[8px]
        lg:left-4 lg:bottom-[480px] lg:rounded-[12px]
        xl:left-5 xl:bottom-[480px] lg:w-[345px] xl:w-[340px] lg:h-[100px] xl:rounded-[24px]

        text-white
      "
      style={{
        // 다크/라이트 배경
        background: isDark
          ? "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.10) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)",

        backdropFilter: "blur(32px)", // 유리 효과
        WebkitBackdropFilter: "blur(32px)",

        border: isDark
          ? "1px solid rgba(0,0,0,0.28)"
          : "1px solid rgba(255,255,255,0.28)",

        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 10px rgba(0,0,0,0.10)"
          : "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 10px rgba(0,0,0,0.10)",
      }}
    >
      {/* 시간 텍스트 영역 */}
      <div
        className="
          flex h-full w-full items-center justify-center
          font-semibold tracking-tight drop-shadow-md
          text-[34px]
          
          lg:text-[50px]
        "
      >
        {time}
      </div>
    </div>
  )
}