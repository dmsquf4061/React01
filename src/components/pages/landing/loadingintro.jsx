import { useEffect } from "react"

export default function LoadingIntro({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.()
    }, 1500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <p className="text-5xl font-black tracking-[0.2em]">LOADING</p>
        <p className="mt-3 text-sm text-white/60">Please wait...</p>
      </div>
    </div>
  )
}