"use client"

import { useState, useEffect, useRef } from "react"
import LoadingIntro from "./loadingintro"
import MemoModal from "./modal/memo-modal"
import Gnb from "@/components/pages/common/gnb"
import MainSection from "./section/main-section"
import ImageSection from "./section/image-section"
import ColorSection from "./section/color-section"
import MusicSection from "./section/music-section"
import BookSection from "./section/book-section"
import { supabase } from "@/lib/supabase"

const MEMO_KEY = "landing_memo"
const MEMO_SIZE = 350
const CALENDAR_BOX_W = 380
const CALENDAR_BOX_H = 450

const THEME_KEY = "landing_theme"
const THEME_MODE_KEY = "landing_theme_mode"
const MAIN_IMAGE_KEY = "landing_main_image"
const CASTING_DEFAULTS_KEY = "landing_default_casting_initialized"
const MUSIC_INDEX_KEY = "landing_music_index"

const DB_NAME = "landing-image-db"
const DB_VERSION = 1
const STORE_NAME = "castingImages"
const MAX_CASTING_IMAGES = 8

const BASE = import.meta.env.BASE_URL

const DEFAULT_CASTING_ITEMS = [
  { id: "default-1", src: `${BASE}img/img10.jpg`, alt: "casting 1", isDefault: true },
  { id: "default-2", src: `${BASE}img/img11.jpg`, alt: "casting 2", isDefault: true },
  { id: "default-3", src: `${BASE}img/img12.jpg`, alt: "casting 3", isDefault: true },
]

const MUSIC_TRACKS = [
  { id: "track-1", title: "Daydream", artist: "웬디(WENDY)", src: "./music/wendy-daydream.mp3" },
  { id: "track-2", title: "One Summer Day", artist: "조 히사이시", src: "./music/조히사이시-OneSummerDay.mp3" },
  { id: "track-3", title: "Cold Blue", artist: "Astron", src: "./music/cold-blue.mp3" },
]

const THEMES = [
  {
    id: "stone",
    swatch: "#363636",
    text: "text-stone-900",
    subtext: "text-stone-400",
    accent: "bg-stone-900/50",
    calendarToday: "[&>button]:bg-stone-200/60",
    calendarSelected: "[&>button]:bg-stone-900 [&>button]:text-white [&>button]:hover:bg-stone-900",
    calendarSelectedButton: "aria-selected:bg-stone-900 aria-selected:text-white aria-selected:hover:bg-stone-900 !transition-none",
    calendarCaption: "text-stone-900",
    calendarWeekday: "text-stone-400",
    castingTitle: "text-stone-700",
    castingSubtitle: "text-stone-400",
    gnbText: "text-stone-900",
    gnbActiveBg: "bg-stone-900",
    gnbActiveText: "text-white",
  },
  {
    id: "white",
    swatch: "#ffffff",
    swatchBorder: true,
    text: "text-white",
    subtext: "text-white/70",
    accent: "bg-white/50",
    calendarToday: "[&>button]:bg-white/20",
    calendarSelected: "[&>button]:bg-white [&>button]:text-stone-900 [&>button]:hover:bg-white",
    calendarSelectedButton: "aria-selected:bg-white aria-selected:text-stone-900 aria-selected:hover:bg-white !transition-none",
    calendarCaption: "text-white",
    calendarWeekday: "text-white/60",
    castingTitle: "text-white",
    castingSubtitle: "text-white/70",
    gnbText: "text-white",
    gnbActiveBg: "bg-white",
    gnbActiveText: "text-stone-900",
  },
  {
    id: "blue",
    swatch: "#1885f1",
    text: "text-blue-800",
    subtext: "text-stone-400",
    accent: "bg-blue-400/50",
    calendarToday: "[&>button]:bg-blue-200/60",
    calendarSelected: "[&>button]:bg-blue-700 [&>button]:text-white [&>button]:hover:bg-blue-700",
    calendarSelectedButton: "aria-selected:bg-blue-700 aria-selected:text-white aria-selected:hover:bg-blue-700 !transition-none",
    calendarCaption: "text-blue-900",
    calendarWeekday: "text-blue-400",
    castingTitle: "text-blue-900",
    castingSubtitle: "text-blue-500",
    gnbText: "text-blue-900",
    gnbActiveBg: "bg-blue-700",
    gnbActiveText: "text-white",
  },
  {
    id: "green",
    swatch: "#3b6d10",
    text: "text-green-800",
    subtext: "text-stone-400",
    accent: "bg-green-400/50",
    calendarToday: "[&>button]:bg-green-200/60",
    calendarSelected: "[&>button]:bg-green-700 [&>button]:text-white [&>button]:hover:bg-green-700",
    calendarSelectedButton: "aria-selected:bg-green-700 aria-selected:text-white aria-selected:hover:bg-green-700 !transition-none",
    calendarCaption: "text-green-900",
    calendarWeekday: "text-green-400",
    castingTitle: "text-green-900",
    castingSubtitle: "text-green-500",
    gnbText: "text-green-900",
    gnbActiveBg: "bg-green-700",
    gnbActiveText: "text-white",
  },
  {
    id: "pink",
    swatch: "#ee6891",
    text: "text-pink-800",
    subtext: "text-stone-400",
    accent: "bg-pink-300/50",
    calendarToday: "[&>button]:bg-pink-200/60",
    calendarSelected: "[&>button]:bg-pink-700 [&>button]:text-white [&>button]:hover:bg-pink-700",
    calendarSelectedButton: "aria-selected:bg-pink-700 aria-selected:text-white aria-selected:hover:bg-pink-700 !transition-none",
    calendarCaption: "text-pink-900",
    calendarWeekday: "text-pink-400",
    castingTitle: "text-pink-900",
    castingSubtitle: "text-pink-500",
    gnbText: "text-pink-900",
    gnbActiveBg: "bg-pink-700",
    gnbActiveText: "text-white",
  },
  {
    id: "amber",
    swatch: "#ff8e00",
    text: "text-amber-800",
    subtext: "text-stone-400",
    accent: "bg-amber-400/50",
    calendarToday: "[&>button]:bg-amber-200/60",
    calendarSelected: "[&>button]:bg-amber-700 [&>button]:text-white [&>button]:hover:bg-amber-700",
    calendarSelectedButton: "aria-selected:bg-amber-700 aria-selected:text-white aria-selected:hover:bg-amber-700 !transition-none",
    calendarCaption: "text-amber-900",
    calendarWeekday: "text-amber-400",
    castingTitle: "text-amber-900",
    castingSubtitle: "text-amber-500",
    gnbText: "text-amber-900",
    gnbActiveBg: "bg-amber-700",
    gnbActiveText: "text-white",
  },
]

const COLOR_THEMES = THEMES.filter((t) => t.id !== "white")
const DARK_THEME = THEMES.find((t) => t.id === "white") || THEMES[0]
const DEFAULT_COLOR_THEME = COLOR_THEMES[0]

function openImageDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function getAllCastingImagesFromDB() {
  const db = await openImageDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly")
    const request = tx.objectStore(STORE_NAME).getAll()
    request.onsuccess = () => resolve(request.result || [])
    request.onerror = () => reject(request.error)
  })
}

async function saveCastingImageToDB(item) {
  const db = await openImageDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    const request = tx.objectStore(STORE_NAME).put(item)
    request.onsuccess = () => resolve(item)
    request.onerror = () => reject(request.error)
  })
}

async function deleteCastingImageFromDB(id) {
  const db = await openImageDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    const request = tx.objectStore(STORE_NAME).delete(id)
    request.onsuccess = () => resolve(true)
    request.onerror = () => reject(request.error)
  })
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function lerp(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

function dist(a, b) {
  return Math.hypot(b[0] - a[0], b[1] - a[1])
}

function roundedClipPath(w, h, r = 80, memoW, memoBottom, clip) {
  const { calendarW, calendarTop } = clip
  const pts = [
    [0, 0],
    [w - memoW * w, 0],
    [w - memoW * w, memoBottom * h],
    [w, memoBottom * h],
    [w, h],
    [calendarW * w, h],
    [calendarW * w, calendarTop * h],
    [0, calendarTop * h],
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

export default function Landing() {
  const [loadingDone, setLoadingDone] = useState(false)
  const [date, setDate] = useState(new Date())
  const [memo, setMemo] = useState("여기에 메모를 남겨보세요.")
  const [memoDate, setMemoDate] = useState("")
  const [memoOpen, setMemoOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_COLOR_THEME)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [clip, setClip] = useState("")
  const [isLg, setIsLg] = useState(false)
  const [castingItems, setCastingItems] = useState(DEFAULT_CASTING_ITEMS)
  const [mainImage, setMainImage] = useState(`${BASE}img/img10.jpg`)
  const [isCastingReady, setIsCastingReady] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  const clipRef = useRef(null)
  const fileInputRef = useRef(null)
  const audioRef = useRef(null)

  const theme = isDarkMode ? DARK_THEME : selectedTheme
  const isDark = isDarkMode

  useEffect(() => {
    const savedMemo = localStorage.getItem(MEMO_KEY)
    const savedDate = localStorage.getItem(MEMO_KEY + "_date")
    const savedTheme = localStorage.getItem(THEME_KEY)
    const savedThemeMode = localStorage.getItem(THEME_MODE_KEY)
    const savedMusicIndex = localStorage.getItem(MUSIC_INDEX_KEY)

    if (savedMemo) setMemo(savedMemo)
    if (savedDate) setMemoDate(savedDate)

    if (savedTheme) {
      const found = COLOR_THEMES.find((t) => t.id === savedTheme)
      if (found) setSelectedTheme(found)
    }

    if (savedThemeMode === "dark") setIsDarkMode(true)

    if (savedMusicIndex !== null) {
      const parsed = Number(savedMusicIndex)
      if (!Number.isNaN(parsed) && parsed >= 0 && parsed < MUSIC_TRACKS.length) {
        setCurrentTrackIndex(parsed)
      }
    }

    const fetchMemo = async () => {
      const { data, error } = await supabase
        .from("memo")
        .select("content")
        .eq("id", 1)
        .maybeSingle()
      if (error) {
        console.warn("memo fetch warning:", error.message)
        return
      }
      if (data?.content) {
        setMemo(data.content)
        localStorage.setItem(MEMO_KEY, data.content)
      }
    }

    fetchMemo()
  }, [])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, selectedTheme.id)
  }, [selectedTheme])

  useEffect(() => {
    localStorage.setItem(THEME_MODE_KEY, isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  useEffect(() => {
    const initCastingImages = async () => {
      try {
        const alreadyInitialized = localStorage.getItem(CASTING_DEFAULTS_KEY)
        if (!alreadyInitialized) {
          for (const item of DEFAULT_CASTING_ITEMS) {
            await saveCastingImageToDB(item)
          }
          localStorage.setItem(CASTING_DEFAULTS_KEY, "true")
        }
        const savedItems = await getAllCastingImagesFromDB()
        const normalizedItems = savedItems.length ? savedItems : DEFAULT_CASTING_ITEMS
        setCastingItems(normalizedItems)
        const savedMainImage = localStorage.getItem(MAIN_IMAGE_KEY)
        const exists = normalizedItems.some((item) => item.src === savedMainImage)
        if (savedMainImage && exists) {
          setMainImage(savedMainImage)
        } else {
          const fallback = normalizedItems[0]?.src || `${BASE}img/img10.jpg`
          setMainImage(fallback)
          localStorage.setItem(MAIN_IMAGE_KEY, fallback)
        }
      } catch (error) {
        console.warn("casting image init warning:", error)
        setCastingItems(DEFAULT_CASTING_ITEMS)
        setMainImage(`${BASE}img/img10.jpg`)
      } finally {
        setIsCastingReady(true)
      }
    }
    initCastingImages()
  }, [])

  useEffect(() => {
    const el = clipRef.current
    if (!el) return
    const update = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      const vw = window.innerWidth
      const lg = vw >= 1024
      setIsLg(lg)
      if (!lg) {
        setClip("")
        return
      }
      const r = vw >= 1536 ? 60 : vw >= 1280 ? 50 : 38
      const memoW = MEMO_SIZE / w
      const memoBottom = MEMO_SIZE / h
      const calendarW = CALENDAR_BOX_W / w
      const calendarTop = 1 - CALENDAR_BOX_H / h
      setClip(roundedClipPath(w, h, r, memoW, memoBottom, { calendarW, calendarTop }))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(clipRef.current)
    return () => ro.disconnect()
  }, [loadingDone, castingItems.length, mainImage])

  useEffect(() => {
    localStorage.setItem(MUSIC_INDEX_KEY, String(currentTrackIndex))
  }, [currentTrackIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.load()
    setCurrentTime(0)
    setDuration(0)
    setIsPlaying(false)
  }, [currentTrackIndex])

  const handleMemoSave = async (nextMemo) => {
    const now = new Date().toLocaleDateString("ko-KR")
    setMemo(nextMemo)
    setMemoDate(now)
    localStorage.setItem(MEMO_KEY, nextMemo)
    localStorage.setItem(MEMO_KEY + "_date", now)
    const { error } = await supabase
      .from("memo")
      .upsert({ id: 1, content: nextMemo }, { onConflict: "id" })
    if (error) console.warn("memo save warning:", error.message)
  }

  const handleThemeChange = (nextTheme) => {
    if (nextTheme.id !== "white") setSelectedTheme(nextTheme)
  }

  const handleToggleLightDark = () => {
    setIsDarkMode((prev) => !prev)
  }

  const handleOpenFilePicker = () => {
    if (castingItems.length >= MAX_CASTING_IMAGES) {
      alert(`이미지는 최대 ${MAX_CASTING_IMAGES}개까지 추가할 수 있어요.`)
      return
    }
    fileInputRef.current?.click()
  }

  const handleSelectMainImage = (src) => {
    setMainImage(src)
    localStorage.setItem(MAIN_IMAGE_KEY, src)
  }

  const handleAddCastingImages = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    if (!imageFiles.length) {
      e.target.value = ""
      return
    }
    const remainingSlots = MAX_CASTING_IMAGES - castingItems.length
    if (remainingSlots <= 0) {
      alert(`이미지는 최대 ${MAX_CASTING_IMAGES}개까지 추가할 수 있어요.`)
      e.target.value = ""
      return
    }
    const limitedFiles = imageFiles.slice(0, remainingSlots)
    if (imageFiles.length > remainingSlots) {
      alert(`최대 ${MAX_CASTING_IMAGES}개까지 가능해서 ${remainingSlots}개만 추가했어요.`)
    }
    try {
      const newItems = await Promise.all(
        limitedFiles.map(async (file, index) => {
          const dataUrl = await fileToDataURL(file)
          return {
            id: `user-${Date.now()}-${index}`,
            src: dataUrl,
            alt: file.name || `casting ${Date.now()}-${index}`,
            isDefault: false,
          }
        })
      )
      for (const item of newItems) {
        await saveCastingImageToDB(item)
      }
      setCastingItems((prev) => [...prev, ...newItems])
      if (newItems[0]) {
        handleSelectMainImage(newItems[0].src)
      }
    } catch (error) {
      console.warn("image add warning:", error)
    } finally {
      e.target.value = ""
    }
  }

  const handleDeleteCastingImage = async (id) => {
    const target = castingItems.find((item) => item.id === id)
    if (!target) return
    const nextItems = castingItems.filter((item) => item.id !== id)
    if (!nextItems.length) return
    try {
      await deleteCastingImageFromDB(id)
      setCastingItems(nextItems)
      if (mainImage === target.src) {
        handleSelectMainImage(nextItems[0].src)
      }
    } catch (error) {
      console.warn("image delete warning:", error)
    }
  }

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length)
  }

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_TRACKS.length)
  }

  const handleTogglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (audio.paused) {
        await audio.play()
      } else {
        audio.pause()
      }
    } catch (error) {
      console.warn("audio play warning:", error)
    }
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    const nextTime = Number(e.target.value)
    if (!audio) return
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value))
  }

  const panelBg = isDark ? "bg-black/30" : "bg-white/30"
  const sectionBg = isDark ? "bg-black/20" : "bg-white/0"

  return (
    <>
      {!loadingDone ? (
        <LoadingIntro onComplete={() => setLoadingDone(true)} />
      ) : (
        <>
          <div
            className="min-h-screen bg-cover bg-center lg:p-0 xl:p-6"
            style={{
              backgroundImage: isDark
                ? `linear-gradient(to right bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('${mainImage}')`
                : `linear-gradient(to right bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.3)), url('${mainImage}')`,
            }}
          >
            <div
              className="flex h-full w-full flex-col gap-4 overflow-y-auto p-4 lg:min-h-[820px] lg:flex-row lg:gap-4 lg:rounded-[0px] lg:p-4 xl:rounded-[60px]"
              style={{
                background: isDark ? "rgba(10,10,10,0.6)" : "rgba(255,255,255,0.14)",
                backdropFilter: "blur(32px) saturate(160%)",
                WebkitBackdropFilter: "blur(32px) saturate(160%)",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.28)",
                boxShadow: isDark
                  ? "inset 0 1px 0 rgb(0 0 0 / 8%), inset 0 -1px 0 rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6)"
                  : "inset 0 1px 0 rgb(255 255 255 / 8%), inset 0 -1px 0 rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.12)",
              }}
            >
              <Gnb
                theme={theme}
                isDark={isDark}
                onToggleLightDark={handleToggleLightDark}
              />

              <MainSection
                mainImage={mainImage}
                clip={clip}
                isLg={isLg}
                isDark={isDark}
                theme={theme}
                clipRef={clipRef}
                memoDate={memoDate}
                onMemoOpen={() => setMemoOpen(true)}
                date={date}
                onDateChange={(d) => { if (d) setDate(d) }}
              />

              <aside className="w-full lg:w-[400px] lg:shrink-0">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
                  <ImageSection
                    castingItems={castingItems}
                    mainImage={mainImage}
                    isCastingReady={isCastingReady}
                    theme={theme}
                    sectionBg={sectionBg}
                    onSelectMain={handleSelectMainImage}
                    onDelete={handleDeleteCastingImage}
                    onOpenFilePicker={handleOpenFilePicker}
                    fileInputRef={fileInputRef}
                    onAddImages={handleAddCastingImages}
                    isDark={isDark}
                  />

                  <BookSection
                    theme={theme}
                    panelBg={panelBg}
                    isDark={isDark}
                  />

                  <ColorSection
                    colorThemes={COLOR_THEMES}
                    selectedTheme={selectedTheme}
                    isDark={isDark}
                    theme={theme}
                    panelBg={panelBg}
                    onThemeChange={handleThemeChange}
                  />

                  <MusicSection
                    currentTrack={MUSIC_TRACKS[currentTrackIndex]}
                    currentTrackIndex={currentTrackIndex}
                    totalTracks={MUSIC_TRACKS.length}
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                    duration={duration}
                    volume={volume}
                    theme={theme}
                    panelBg={panelBg}
                    onPrev={handlePrevTrack}
                    onNext={handleNextTrack}
                    onTogglePlay={handleTogglePlay}
                    onSeek={handleSeek}
                    onVolumeChange={handleVolumeChange}
                    audioRef={audioRef}
                    onLoadedMetadata={(e) => {
                      setDuration(e.currentTarget.duration || 0)
                      setCurrentTime(0)
                      if (loadingDone) {
                        e.currentTarget.play().catch((err) => console.warn("autoplay warning:", err))
                      }
                    }}
                    onTimeUpdate={(e) => {
                      setCurrentTime(e.currentTarget.currentTime || 0)
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTrackEnd={() => {
                      setIsPlaying(false)
                      setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_TRACKS.length)
                    }}
                    isDark={isDark}
                  />
                </div>
              </aside>
            </div>
          </div>

          {memoOpen && (
            <MemoModal
              memo={memo}
              onSave={handleMemoSave}
              onClose={() => setMemoOpen(false)}
            />
          )}
        </>
      )}
    </>
  )
}