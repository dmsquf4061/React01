import { useEffect, useRef, useState } from "react"

// 인트로 사라지는 시간
const EXIT_DURATION = 1000
// 공통 easing 값
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

// 로딩 인트로 컴포넌트
export default function LoadingIntro({ onComplete }) {
  // 카운트 숫자 상태
  const [count, setCount] = useState(0)
  // 100 도달 여부
  const [ready, setReady] = useState(false)
  // 종료 애니메이션 상태
  const [isExiting, setIsExiting] = useState(false)

  // interval 저장용 ref
  const intervalRef = useRef(null)
  // 중복 완료 방지용 ref
  const completeRef = useRef(false)

  useEffect(() => {
    // 카운트 증가 인터벌 시작
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          // 100 도달 시 인터벌 정리
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setReady(true)
          return 100
        }
        return prev + 1
      })
    }, 20)

    // 언마운트 시 인터벌 정리
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // 클릭 시 인트로 종료
  const handleEnter = () => {
    if (!ready || completeRef.current) return
    completeRef.current = true

    // 인트로 종료 + 부모에 완료 알림
    setIsExiting(true)
    onComplete?.()
  }

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        // 클릭 가능 상태일 때만 포인터 표시
        cursor: ready && !isExiting ? "pointer" : "default",
        // 종료 시 페이드아웃
        opacity: isExiting ? 0 : 1,
        visibility: isExiting ? "hidden" : "visible",
        transition: `opacity ${EXIT_DURATION}ms ${EASE}, visibility ${EXIT_DURATION}ms ${EASE}`,
        willChange: "opacity",
        background: "black",
      }}
      onClick={handleEnter}
    >
      {/* 배경 글로우 효과 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      {/* 중앙 컨텐츠 */}
      <div
        className="relative flex h-full w-full flex-col items-center justify-center px-6 text-white"
        style={{
          // 종료 시 살짝 확대 + 페이드아웃
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "scale(1.015)" : "scale(1)",
          transition: `
            opacity ${EXIT_DURATION}ms ${EASE},
            transform ${EXIT_DURATION}ms ${EASE}
          `,
          willChange: "opacity, transform",
        }}
      >
        <div className="flex flex-col items-center">
          {/* 숫자 카운트 표시 */}
          <p
            className="text-8xl font-black md:text-[120px]"
          >
            {String(count).padStart(3, "0")}
          </p>

          {/* 하단 안내 문구 */}
          <div className="mt-4 flex h-6 items-center justify-center">
            <p
              className="text-sm text-white/60"
              style={{
                // 준비 완료 후 문구 노출
                opacity: ready && !isExiting ? 1 : 0,
                transform: ready && !isExiting ? "translateY(0)" : "translateY(6px)",
                transition: `
                  opacity 300ms ${EASE},
                  transform 300ms ${EASE}
                `,
              }}
            >
              CLICK TO ENTER
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}