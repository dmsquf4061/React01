// 두 점 사이를 t 비율만큼 선형 보간
export function lerp(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
  ]
}

// 두 점 사이 거리 계산
export function dist(a, b) {
  return Math.hypot(b[0] - a[0], b[1] - a[1])
}