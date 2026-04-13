"use client"

import { useEffect, useState } from "react"

export default function ClockSection({ isDark }) {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      const h = String(now.getHours()).padStart(2, "0")
      const m = String(now.getMinutes()).padStart(2, "0")
      const s = String(now.getSeconds()).padStart(2, "0")

      setTime(`${h}:${m}:${s}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="
        pointer-events-none
        absolute z-20
        left-4 bottom-4
        flex items-center justify-center
        rounded-[14px]
        px-4

        w-[220px] h-[72px] rounded-[8px]
        lg:left-4 lg:bottom-[480px] lg:rounded-[16px]
        xl:left-5 xl:bottom-[480px] lg:w-[345px] xl:w-[340px] lg:h-[100px] xl:rounded-[32px]

        text-white
      "
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