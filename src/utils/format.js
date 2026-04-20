// 초 단위 시간을 mm:ss 형식으로 변환
export function formatTime(time) {
  if (!Number.isFinite(time)) return "0:00"

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes}:${String(seconds).padStart(2, "0")}`
}