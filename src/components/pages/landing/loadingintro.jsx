import { useEffect, useState } from "react"

export default function LoadingIntro({ onComplete }) {
  const [count, setCount] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setReady(true)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-black text-white"
      style={{ cursor: ready ? "pointer" : "default" }}
      onClick={() => {
        if (ready) onComplete?.()
      }}
    >
      <p className="text-8xl font-black tabular-nums">{count}</p>
      {ready ? (
        <p className="mt-4 animate-pulse text-sm tracking-widest text-white/60">
          CLICK TO ENTER
        </p>
      ) : (
        <p className="mt-4 text-sm text-white/60">Please wait...</p>
      )}
    </div>
  )
}