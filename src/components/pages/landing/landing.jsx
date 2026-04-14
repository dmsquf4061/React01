"use client"

import { useState, useEffect, useRef } from "react"
import LoadingIntro from "./loadingintro"
import MemoModal from "./modal/memo-modal"
import BookModal from "./modal/book-modal"
import Gnb from "@/components/pages/common/gnb"
import MainSection from "./section/main-section"
import ImageSection from "./section/image-section"
import ColorSection from "./section/color-section"
import MusicSection from "./section/music-section"
import BookSection from "./section/book-section"
import { supabase } from "@/lib/supabase"

// 메모 저장 키
const MEMO_KEY = "landing_memo"
// 메모 영역 크기
const MEMO_SIZE = 350
// 캘린더 박스 가로 크기
const CALENDAR_BOX_W = 380
// 캘린더 박스 세로 크기
const CALENDAR_BOX_H = 460

// 선택 테마 저장 키
const THEME_KEY = "landing_theme"
// 다크모드 저장 키
const THEME_MODE_KEY = "landing_theme_mode"
// 메인 이미지 저장 키
const MAIN_IMAGE_KEY = "landing_main_image"
// 기본 이미지 초기화 여부 저장 키
const CASTING_DEFAULTS_KEY = "landing_default_casting_initialized"
// 음악 인덱스 저장 키
const MUSIC_INDEX_KEY = "landing_music_index"

// IndexedDB 이름
const DB_NAME = "landing-image-db"
// IndexedDB 버전
const DB_VERSION = 1
// object store 이름
const STORE_NAME = "castingImages"
// 최대 이미지 개수
const MAX_CASTING_IMAGES = 8

// 기본 경로
const BASE = import.meta.env.BASE_URL
// 공통 easing 값
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

// 인트로 fade-out 지속시간
const INTRO_FADE_DURATION = 1000
// 랜딩 fade-in 지속시간
const LANDING_FADE_DURATION = 1200

// 기본 캐스팅 이미지 목록
const DEFAULT_CASTING_ITEMS = [
  { id: "default-1", src: `${BASE}img/img10.jpg`, alt: "casting 1", isDefault: true },
  { id: "default-2", src: `${BASE}img/img11.jpg`, alt: "casting 2", isDefault: true },
  { id: "default-3", src: `${BASE}img/img12.jpg`, alt: "casting 3", isDefault: true },
]

// 음악 트랙 목록
const MUSIC_TRACKS = [
  { id: "track-1", title: "Daydream", artist: "웬디(WENDY)", src: "./music/wendy-daydream.mp3" },
  { id: "track-2", title: "One Summer Day", artist: "조 히사이시", src: "./music/조히사이시-OneSummerDay.mp3" },
  { id: "track-3", title: "Cold Blue", artist: "Astron", src: "./music/cold-blue.mp3" },
]

// 테마 목록
const THEMES = [
  {
    id: "stone",
    swatch: "#363636",
    text: "text-stone-800",
    subtext: "text-stone-400",
    accent: "bg-stone-700/50",
    calendarToday: "[&>button]:bg-stone-200/60",
    calendarSelected: "[&>button]:bg-stone-900 [&>button]:text-white [&>button]:hover:bg-stone-900",
    calendarSelectedButton:
      "aria-selected:bg-stone-900 aria-selected:text-white aria-selected:hover:bg-stone-900 !transition-none",
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
    calendarSelectedButton:
      "aria-selected:bg-white aria-selected:text-stone-900 aria-selected:hover:bg-white !transition-none",
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
    text: "text-blue-900",
    subtext: "text-stone-400",
    accent: "bg-blue-800/50",
    calendarToday: "[&>button]:bg-blue-200/60",
    calendarSelected: "[&>button]:bg-blue-700 [&>button]:text-white [&>button]:hover:bg-blue-700",
    calendarSelectedButton:
      "aria-selected:bg-blue-700 aria-selected:text-white aria-selected:hover:bg-blue-700 !transition-none",
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
    text: "text-green-900",
    subtext: "text-stone-400",
    accent: "bg-green-800/50",
    calendarToday: "[&>button]:bg-green-200/60",
    calendarSelected: "[&>button]:bg-green-700 [&>button]:text-white [&>button]:hover:bg-green-700",
    calendarSelectedButton:
      "aria-selected:bg-green-700 aria-selected:text-white aria-selected:hover:bg-green-700 !transition-none",
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
    text: "text-pink-700",
    subtext: "text-stone-400",
    accent: "bg-pink-700/50",
    calendarToday: "[&>button]:bg-pink-200/60",
    calendarSelected: "[&>button]:bg-pink-700 [&>button]:text-white [&>button]:hover:bg-pink-700",
    calendarSelectedButton:
      "aria-selected:bg-pink-700 aria-selected:text-white aria-selected:hover:bg-pink-700 !transition-none",
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
    text: "text-amber-600",
    subtext: "text-stone-400",
    accent: "bg-amber-500/50",
    calendarToday: "[&>button]:bg-amber-200/60",
    calendarSelected: "[&>button]:bg-amber-700 [&>button]:text-white [&>button]:hover:bg-amber-700",
    calendarSelectedButton:
      "aria-selected:bg-amber-700 aria-selected:text-white aria-selected:hover:bg-amber-700 !transition-none",
    calendarCaption: "text-amber-900",
    calendarWeekday: "text-amber-400",
    castingTitle: "text-amber-900",
    castingSubtitle: "text-amber-500",
    gnbText: "text-amber-900",
    gnbActiveBg: "bg-amber-700",
    gnbActiveText: "text-white",
  },
]

// 컬러 테마 목록
const COLOR_THEMES = THEMES.filter((t) => t.id !== "white")
// 다크모드용 테마
const DARK_THEME = THEMES.find((t) => t.id === "white") || THEMES[0]
// 기본 컬러 테마
const DEFAULT_COLOR_THEME = COLOR_THEMES[0]

// IndexedDB 열기
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

// DB에서 캐스팅 이미지 전체 조회
async function getAllCastingImagesFromDB() {
  const db = await openImageDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly")
    const request = tx.objectStore(STORE_NAME).getAll()
    request.onsuccess = () => resolve(request.result || [])
    request.onerror = () => reject(request.error)
  })
}

// DB에 캐스팅 이미지 저장
async function saveCastingImageToDB(item) {
  const db = await openImageDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    const request = tx.objectStore(STORE_NAME).put(item)
    request.onsuccess = () => resolve(item)
    request.onerror = () => reject(request.error)
  })
}

// DB에서 캐스팅 이미지 삭제
async function deleteCastingImageFromDB(id) {
  const db = await openImageDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite")
    const request = tx.objectStore(STORE_NAME).delete(id)
    request.onsuccess = () => resolve(true)
    request.onerror = () => reject(request.error)
  })
}

// 파일을 dataURL로 변환
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

// 선형 보간
function lerp(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

// 두 점 사이 거리 계산
function dist(a, b) {
  return Math.hypot(b[0] - a[0], b[1] - a[1])
}

// 메인 영역 clip-path 생성
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

// 랜딩 메인 컴포넌트
export default function Landing() {
  // 랜딩 표시 상태
  const [landingVisible, setLandingVisible] = useState(false)
  // 인트로 제거 상태
  const [introGone, setIntroGone] = useState(false)

  // 날짜 상태
  const [date, setDate] = useState(new Date())
  // 메모 내용
  const [memo, setMemo] = useState("여기에 메모를 남겨보세요.")
  // 메모 저장 날짜
  const [memoDate, setMemoDate] = useState("")
  // 메모 모달 열림 상태
  const [memoOpen, setMemoOpen] = useState(false)
  // 북 모달용 선택 데이터
  const [selectedBook, setSelectedBook] = useState(null)
  // 선택된 테마
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_COLOR_THEME)
  // 다크모드 여부
  const [isDarkMode, setIsDarkMode] = useState(false)
  // clip-path 문자열
  const [clip, setClip] = useState("")
  // lg 이상 여부
  const [isLg, setIsLg] = useState(false)
  // 캐스팅 이미지 목록
  const [castingItems, setCastingItems] = useState(DEFAULT_CASTING_ITEMS)
  // 현재 메인 이미지
  const [mainImage, setMainImage] = useState(`${BASE}img/img10.jpg`)
  // 캐스팅 이미지 로딩 완료 여부
  const [isCastingReady, setIsCastingReady] = useState(false)
  // 현재 음악 인덱스
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  // 재생 상태
  const [isPlaying, setIsPlaying] = useState(false)
  // 현재 재생 시간
  const [currentTime, setCurrentTime] = useState(0)
  // 총 재생 시간
  const [duration, setDuration] = useState(0)
  // 볼륨
  const [volume, setVolume] = useState(1)

  // clip 대상 ref
  const clipRef = useRef(null)
  // 파일 input ref
  const fileInputRef = useRef(null)
  // audio ref
  const audioRef = useRef(null)
  // 다음곡/이전곡 눌렀을 때 이전 재생 상태 기억
  const shouldResumeAfterLoadRef = useRef(false)

  // 현재 적용할 테마
  const theme = isDarkMode ? DARK_THEME : selectedTheme
  // 다크모드 별칭
  const isDark = isDarkMode
  // 패널 배경 클래스
  const panelBg = isDark ? "bg-black/30" : "bg-white/0"
  // 섹션 배경 클래스
  const sectionBg = isDark ? "bg-black/20" : "bg-white/0"

  // 인트로 완료 시 실행
  const handleIntroComplete = () => {
    setLandingVisible(true)

    requestAnimationFrame(async () => {
      if (audioRef.current) {
        try {
          audioRef.current.currentTime = 0
          await audioRef.current.play()
        } catch (error) {
          console.warn("intro click autoplay warning:", error)
        }
      }
    })

    setTimeout(() => {
      setIntroGone(true)
    }, INTRO_FADE_DURATION)
  }

  // 초기 로컬스토리지, 메모 데이터 불러오기
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

  // 테마 변경 시 저장
  useEffect(() => {
    localStorage.setItem(THEME_KEY, selectedTheme.id)
  }, [selectedTheme])

  // 다크모드 변경 시 저장
  useEffect(() => {
    localStorage.setItem(THEME_MODE_KEY, isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  // 캐스팅 이미지 초기화 및 불러오기
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

  // 메인 영역 clip-path 계산
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

      const r = vw >= 1280 ? 40 : vw >= 1024 ? 24 : 8
      const memoW = MEMO_SIZE / w
      const memoBottom = MEMO_SIZE / h
      const calendarW = CALENDAR_BOX_W / w
      const calendarTop = 1 - CALENDAR_BOX_H / h

      setClip(
        roundedClipPath(w, h, r, memoW, memoBottom, {
          calendarW,
          calendarTop,
        })
      )
    }

    update()

    const ro = new ResizeObserver(update)
    ro.observe(clipRef.current)

    return () => ro.disconnect()
  }, [introGone, castingItems.length, mainImage])

  // 음악 인덱스 저장
  useEffect(() => {
    localStorage.setItem(MUSIC_INDEX_KEY, String(currentTrackIndex))
  }, [currentTrackIndex])

  // 볼륨 변경 시 audio 반영
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = volume <= 0
    }
  }, [volume])

  // 트랙 변경 시 audio 초기화
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    audio.load()
    setCurrentTime(0)
    setDuration(0)
    setIsPlaying(false)
  }, [currentTrackIndex])

  // 메모 저장
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

  // 북 모달 열기
  const handleBookOpen = (book) => {
    setSelectedBook(book)
  }

  // 북 모달 닫기
  const handleBookClose = () => {
    setSelectedBook(null)
  }

  // 테마 변경
  const handleThemeChange = (nextTheme) => {
    if (!nextTheme || nextTheme.id === "white") return
    setSelectedTheme(nextTheme)
  }

  // 다크모드 토글
  const handleToggleLightDark = () => {
    setIsDarkMode((prev) => !prev)
  }

  // 파일 선택창 열기
  const handleOpenFilePicker = () => {
    if (castingItems.length >= MAX_CASTING_IMAGES) {
      alert(`이미지는 최대 ${MAX_CASTING_IMAGES}개까지 추가할 수 있어요.`)
      return
    }
    fileInputRef.current?.click()
  }

  // 메인 이미지 선택
  const handleSelectMainImage = (src) => {
    setMainImage(src)
    localStorage.setItem(MAIN_IMAGE_KEY, src)
  }

  // 캐스팅 이미지 추가
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

  // 캐스팅 이미지 삭제
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

  // 이전 곡 이동
  const handlePrevTrack = () => {
    const audio = audioRef.current
    const wasPlaying = audio && !audio.paused

    // 곡 바꾸기 전에 이전 재생 상태 저장
    shouldResumeAfterLoadRef.current = wasPlaying

    setCurrentTrackIndex((prev) => (prev - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length)
  }

  // 다음 곡 이동
  const handleNextTrack = () => {
    const audio = audioRef.current
    const wasPlaying = audio && !audio.paused

    // 곡 바꾸기 전에 이전 재생 상태 저장
    shouldResumeAfterLoadRef.current = wasPlaying

    setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_TRACKS.length)
  }

  // 재생/일시정지 토글
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

  // 재생 위치 이동
  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio) return

    const nextTime = Number(e.target.value)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  // 볼륨 변경
  const handleVolumeChange = (e) => {
    const nextVolume = Number(e.target.value)
    setVolume(nextVolume)

    if (audioRef.current) {
      try {
        audioRef.current.volume = nextVolume
        audioRef.current.muted = nextVolume <= 0
      } catch (error) {
        console.warn("volume change warning:", error)
      }
    }
  }

  return (
    <>
      <div
        style={{
          opacity: landingVisible ? 1 : 0,
          transition: `opacity ${LANDING_FADE_DURATION}ms ${EASE}`,
          pointerEvents: landingVisible ? "auto" : "none",
        }}
      >
        <div
          className="h-screen bg-cover bg-center lg:p-0 xl:p-6"
          style={{
            transitionTimingFunction: EASE,
            backgroundImage: isDark
              ? `linear-gradient(to right bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('${mainImage}')`
              : `linear-gradient(to right bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.3)), url('${mainImage}')`,
            boxShadow: isDark
              ? "inset 0 1px 0 rgb(0 0 0 / 35%), 0px 10px 30px rgb(0 0 0 / 10%)"
              : "inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 30px rgba(0,0,0,0.10)",
          }}
        >
          <div
            className="flex h-full w-full flex-col gap-4 overflow-y-auto p-4 lg:min-h-[868px] lg:min-w-[1290px] lg:flex-row lg:gap-4 lg:overflow-hidden lg:rounded-[0px] lg:p-4 xl:rounded-[40px] transition-[background,border-color,box-shadow] duration-500"
            style={{
              transitionTimingFunction: EASE,
              background: isDark ? "rgba(10,10,10,0.6)" : "rgba(255,255,255,0.14)",
              backdropFilter: "blur(32px) saturate(160%)",
              WebkitBackdropFilter: "blur(32px) saturate(160%)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(255,255,255,0.28)",
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
              onDateChange={(d) => {
                if (d) setDate(d)
              }}
            />

            <aside className="w-full lg:w-[400px] lg:min-h-[820px] lg:shrink-0 lg:overflow-y-auto no-scrollbar">
              <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
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
                  onBookOpen={handleBookOpen}
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
                  onLoadedMetadata={async (e) => {
                    // 새 곡 길이 설정
                    setDuration(e.currentTarget.duration || 0)
                    // 진행 시간 초기화
                    setCurrentTime(0)

                    // 이전 곡이 재생 중이었다면 새 곡도 자동 재생
                    if (shouldResumeAfterLoadRef.current) {
                      // 한 번 재생 후 즉시 초기화해서 중복 재생 방지
                      shouldResumeAfterLoadRef.current = false

                      try {
                        await e.currentTarget.play()
                      } catch (error) {
                        console.warn("track auto play warning:", error)
                      }
                    }
                  }}
                  onTimeUpdate={(e) => {
                    setCurrentTime(e.currentTarget.currentTime || 0)
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTrackEnd={() => {
                    setIsPlaying(false)
                    // 곡이 자연스럽게 끝났을 때는 다음 곡 자동 재생
                    shouldResumeAfterLoadRef.current = true
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
            theme={theme}
            isDark={isDark}
          />
        )}

        {selectedBook && (
          <BookModal
            item={selectedBook}
            onClose={handleBookClose}
            theme={theme}
            isDark={isDark}
          />
        )}
      </div>

      {!introGone && (
        <LoadingIntro onComplete={handleIntroComplete} />
      )}
    </>
  )
}