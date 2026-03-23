import { useState, useEffect, useRef } from "react"
import LoadingIntro from "./loadingintro"
import {
  House,
  Star,
  Circle,
  ShoppingBag,
  Menu,
  Settings,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Ticket,
} from "lucide-react"
import { Calendar } from "./components/ui/calendar"

// ── clip-path 헬퍼 ──────────────────────────────────────────────
function lerp(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}
function dist(a, b) {
  return Math.hypot(b[0] - a[0], b[1] - a[1])
}

function roundedClipPath(w, h, r = 14) {
  const pts = [
    [0.63 * w, 0.055 * h],
    [0.65 * w, 0],
    [w, 0],
    [w, h],
    [0.4 * w, h],
    [0.4 * w, 0.62 * h],
    [0, 0.62 * h],
    [0, 0],
    [0.35 * w, 0],
    [0.37 * w, 0.055 * h],
  ]

  const n = pts.length
  let d = ""

  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n]
    const curr = pts[i]
    const next = pts[(i + 1) % n]
    const d1 = dist(prev, curr)
    const d2 = dist(curr, next)
    const rr = Math.min(r, d1 / 2, d2 / 2)
    const p1 = lerp(curr, prev, rr / d1)
    const p2 = lerp(curr, next, rr / d2)
    const f = (v) => parseFloat(v.toFixed(2))

    d += i === 0 ? `M${f(p1[0])},${f(p1[1])}` : ` L${f(p1[0])},${f(p1[1])}`
    d += ` Q${f(curr[0])},${f(curr[1])} ${f(p2[0])},${f(p2[1])}`
  }

  return `path("${d} Z")`
}
// ────────────────────────────────────────────────────────────────

function IconButton({ children, active = false, small = false }) {
  return (
    <button
      className={[
        "flex items-center justify-center rounded-full shadow-sm transition",
        small ? "h-11 w-11" : "h-11 w-11",
        active ? "bg-pink-100 text-pink-500" : "bg-slate-100 text-slate-700",
      ].join(" ")}
      type="button"
    >
      {children}
    </button>
  )
}

export default function Landing() {
  const [loadingDone, setLoadingDone] = useState(false)
  const clipRef = useRef(null)
  const [clip, setClip] = useState("")

  useEffect(() => {
    const el = clipRef.current
    if (!el) return

    const update = () => {
      setClip(roundedClipPath(el.offsetWidth, el.offsetHeight, 30))
    }

    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)

    return () => ro.disconnect()
  }, [loadingDone])

  return (
    <>
      {!loadingDone ? (
        <LoadingIntro onComplete={() => setLoadingDone(true)} />
      ) : (
        <div className="min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-sky-50 to-blue-100 p-6">
          <div className="flex h-full w-full gap-5 rounded-[30px] bg-white/60 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-md">
            {/* 왼쪽 사이드바 */}
            <aside className="flex w-[110px] flex-col items-center justify-between rounded-[32px] bg-white/80 py-6 shadow-sm">
              <div className="flex flex-col items-center gap-8">
                <div className="text-4xl font-black italic tracking-tight">4</div>

                <nav className="flex flex-col items-center gap-6">
                  <IconButton>
                    <House size={20} strokeWidth={2.2} />
                  </IconButton>

                  <div className="relative">
                    <IconButton active>
                      <Star size={20} strokeWidth={2.2} />
                    </IconButton>
                    <span className="absolute -right-3 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-pink-400" />
                  </div>

                  <IconButton>
                    <Circle size={18} strokeWidth={2.2} />
                  </IconButton>

                  <IconButton>
                    <ShoppingBag size={20} strokeWidth={2.2} />
                  </IconButton>
                </nav>

                <div className="h-px w-10 bg-slate-200" />

                <img
                  src="./public/img/img.jpg"
                  alt="profile"
                  className="h-16 w-16 rounded-full object-cover shadow-sm"
                />
              </div>

              <div className="flex flex-col items-center gap-4">
                <IconButton>
                  <Menu size={20} strokeWidth={2.2} />
                </IconButton>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-700 shadow-sm"
                >
                  Eng
                </button>

                <IconButton>
                  <Settings size={20} strokeWidth={2.2} />
                </IconButton>
              </div>
            </aside>

            {/* 가운데 */}
            <main className="flex min-w-0 flex-1">
              <section className="relative h-full w-full">
                {/* 메인 이미지 clip */}
                <div
                  ref={clipRef}
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: clip }}
                >
                  <img
                    src="./public/img/img.jpg"
                    alt="main visual"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                {/* 상단 버튼 */}
                <div className="absolute left-6 top-5 z-20">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-800 shadow"
                  >
                    <ArrowLeft size={18} strokeWidth={2.2} />
                    Back
                  </button>
                </div>

                <div className="absolute right-6 top-5 z-20">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-800 shadow"
                  >
                    Next
                    <ArrowRight size={18} strokeWidth={2.2} />
                  </button>
                </div>

                {/* 좌하단 카드 */}
                <div className="absolute bottom-6 left-0 z-20 w-[260px] rounded-[30px] bg-white p-6 shadow-xl">
                  <p className="text-sm text-gray-400">Promo</p>
                  <p className="text-4xl font-bold">24</p>
                </div>

                {/* 중앙 카드 */}
                <div className="absolute bottom-6 left-[240px] z-20 w-[500px] rounded-[30px] bg-white p-6 shadow-xl">
                  <p className="text-xs text-gray-400">Oct 2024</p>
                  <p className="text-5xl font-bold">02</p>
                  <h2 className="text-4xl font-black">
                    Dungeon Dragon<span className="text-violet-500">3</span>
                  </h2>
                </div>
              </section>
            </main>

            {/* 오른쪽 패널 */}
            <aside className="flex w-[320px] flex-col gap-5">
              <section className="rounded-[32px] bg-white/85 p-6 shadow-sm">
                <div className="mb-5 flex items-start justify-between">
                  <h3 className="text-4xl font-semibold text-slate-900">Slot</h3>

                  <div className="text-right text-sm text-slate-400">
                    <p className="flex items-center justify-end gap-1">
                      <MapPin size={14} strokeWidth={2.2} />
                      Cinema
                    </p>
                    <p>23, Augustic St.</p>
                  </div>
                </div>

                <div className="mb-6 flex gap-3">
                  <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                    18:00
                  </button>
                  <button className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700">
                    21:25
                  </button>
                  <button className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700">
                    23:50
                  </button>
                </div>

                <div className="mb-8 grid grid-cols-7 gap-3">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const active = [16, 17, 18, 23, 24, 25, 30, 31, 32, 34, 35].includes(i + 1)

                    return (
                      <div
                        key={i}
                        className={`h-7 rounded-lg ${active ? "bg-violet-200" : "bg-slate-100"}`}
                      />
                    )
                  })}
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-medium text-slate-500">Available</p>
                    <div className="mt-1 flex items-end gap-2">
                      <span className="text-6xl font-bold leading-none text-slate-900">158</span>
                      <span className="pb-2 text-sm text-slate-400">slots</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg"
                  >
                    <Ticket size={30} strokeWidth={2.2} />
                  </button>
                </div>
              </section>

              <section className="flex-1 rounded-[32px] bg-white/85 p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-4xl font-semibold text-slate-900">Casting</h3>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-full bg-slate-100 px-3 py-2 text-slate-700"
                    >
                      <ArrowLeft size={18} strokeWidth={2.2} />
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-slate-100 px-3 py-2 text-slate-700"
                    >
                      <ArrowRight size={18} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-pink-50 to-sky-50 p-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop"
                    alt="casting"
                    className="h-[260px] w-full rounded-[24px] object-cover"
                  />

                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                      alt="person1"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-slate-700">Shido</span>

                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
                      alt="person2"
                      className="ml-4 h-9 w-9 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-slate-700">James Carl</span>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </div>
      )}
    </>
  )
}