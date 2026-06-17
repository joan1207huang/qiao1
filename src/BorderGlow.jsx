import { useCallback, useRef } from 'react'

function parseHSL(hslString) {
  const match = hslString.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) {
    return { h: 40, s: 80, l: 80 }
  }

  return {
    h: Number.parseFloat(match[1]),
    s: Number.parseFloat(match[2]),
    l: Number.parseFloat(match[3]),
  }
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const suffixes = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  const vars = {}

  for (let index = 0; index < opacities.length; index += 1) {
    vars[`--glow-color${suffixes[index]}`] = `hsl(${base} / ${Math.min(opacities[index] * intensity, 100)}%)`
  }

  return vars
}

const gradientPositions = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const gradientKeys = [
  '--gradient-one',
  '--gradient-two',
  '--gradient-three',
  '--gradient-four',
  '--gradient-five',
  '--gradient-six',
  '--gradient-seven',
]
const colorMap = [0, 1, 2, 0, 1, 2, 1]

function buildGradientVars(colors) {
  const vars = {}

  for (let index = 0; index < 7; index += 1) {
    const color = colors[Math.min(colorMap[index], colors.length - 1)]
    vars[gradientKeys[index]] = `radial-gradient(at ${gradientPositions[index]}, ${color} 0px, transparent 50%)`
  }

  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return vars
}

export default function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 28,
  glowColor = '40 80 80',
  backgroundColor = '#161115',
  borderRadius = 30,
  glowRadius = 36,
  glowIntensity = 0.8,
  coneSpread = 22,
  colors = ['#d7b67a', '#8a557d', '#4c84d4'],
  fillOpacity = 0.42,
}) {
  const cardRef = useRef(null)

  const getCenter = useCallback((element) => {
    const { width, height } = element.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])

  const getEdgeProximity = useCallback(
    (element, x, y) => {
      const [cx, cy] = getCenter(element)
      const dx = x - cx
      const dy = y - cy
      let kx = Number.POSITIVE_INFINITY
      let ky = Number.POSITIVE_INFINITY

      if (dx !== 0) {
        kx = cx / Math.abs(dx)
      }

      if (dy !== 0) {
        ky = cy / Math.abs(dy)
      }

      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
    },
    [getCenter],
  )

  const getCursorAngle = useCallback(
    (element, x, y) => {
      const [cx, cy] = getCenter(element)
      const dx = x - cx
      const dy = y - cy

      if (dx === 0 && dy === 0) {
        return 0
      }

      const radians = Math.atan2(dy, dx)
      let degrees = radians * (180 / Math.PI) + 90

      if (degrees < 0) {
        degrees += 360
      }

      return degrees
    },
    [getCenter],
  )

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current
      if (!card) {
        return
      }

      const rect = card.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const edge = getEdgeProximity(card, x, y)
      const angle = getCursorAngle(card, x, y)

      card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`)
      card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
    },
    [getCursorAngle, getEdgeProximity],
  )

  return (
    <div
      className={`border-glow-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      ref={cardRef}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}
