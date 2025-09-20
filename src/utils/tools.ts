import { darken, getContrast, lighten } from "polished"

export function improveIconColorVisibility(
  color: string,
  backgroundColor: string,
  theme: string,
  contrastThreshold = 4.5
) {
  const contrast = getContrast(color, backgroundColor)

  if (contrast < contrastThreshold) {
    return theme === "dark" ? lighten(0.5, color) : darken(0.1, color)
  }

  return color
}

export function oklchToRGBA(
  input: string | { L: number; C: number; H: number },
  alpha = 1
) {
  let L: number
  let C: number
  let H: number

  if (typeof input === "string") {
    const m = input.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i)
    if (!m) throw new Error("Invalid input")
    L = Number(m[1])
    C = Number(m[2])
    H = Number(m[3])
  } else {
    ;({ L, C, H } = input)
  }

  const hr = (H * Math.PI) / 180
  const a_ = Math.cos(hr) * C
  const b_ = Math.sin(hr) * C

  const l_ = L + 0.3963377774 * a_ + 0.2158037573 * b_
  const m_ = L - 0.1055613458 * a_ - 0.0638541728 * b_
  const s_ = L - 0.0894841775 * a_ - 1.291485548 * b_

  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3

  let rLin = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  let gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  let bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s

  const clamp = (v: number) => (Number.isFinite(v) ? v : 0)

  rLin = clamp(rLin)
  gLin = clamp(gLin)
  bLin = clamp(bLin)

  const linToSrgb = (v: number) => {
    if (v <= 0) return 0
    if (v >= 1) return 1
    return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055
  }

  const r = linToSrgb(rLin)
  const g = linToSrgb(gLin)
  const b = linToSrgb(bLin)

  const to255 = (v: number) => Math.min(255, Math.max(0, Math.round(v * 255)))

  return [to255(r), to255(g), to255(b), Math.max(0, Math.min(1, alpha))]
}
