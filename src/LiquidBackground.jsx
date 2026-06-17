import { useEffect, useRef } from 'react'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function LiquidBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      return undefined
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return undefined
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
    let width = 0
    let height = 0
    let animationFrameId = 0
    let lastFrameTime = 0
    let isPointerActive = false
    let pointerX = 0
    let pointerY = 0
    let targetPointerX = 0
    let targetPointerY = 0
    let interactiveBoost = 0
    let pointerVelocityX = 0
    let pointerVelocityY = 0
    const pulses = []

    const blobs = [
      {
        xFactor: 0.2,
        yFactor: 0.28,
        radius: 360,
        color: '214, 94, 17',
        alpha: 0.15,
        speed: 0.00026,
        sway: 46,
      },
      {
        xFactor: 0.72,
        yFactor: 0.24,
        radius: 340,
        color: '130, 71, 154',
        alpha: 0.13,
        speed: 0.00031,
        sway: 58,
      },
      {
        xFactor: 0.78,
        yFactor: 0.65,
        radius: 320,
        color: '214, 176, 113',
        alpha: 0.11,
        speed: 0.00022,
        sway: 40,
      },
      {
        xFactor: 0.44,
        yFactor: 0.82,
        radius: 300,
        color: '255, 255, 255',
        alpha: 0.05,
        speed: 0.00018,
        sway: 34,
      },
    ]

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      targetPointerX = width * 0.65
      targetPointerY = height * 0.35
      if (!pointerX && !pointerY) {
        pointerX = targetPointerX
        pointerY = targetPointerY
      }
    }

    const drawBlob = (x, y, radius, color, alpha) => {
      const gradient = context.createRadialGradient(x, y, radius * 0.12, x, y, radius)
      gradient.addColorStop(0, `rgba(${color}, ${alpha})`)
      gradient.addColorStop(0.55, `rgba(${color}, ${alpha * 0.45})`)
      gradient.addColorStop(1, `rgba(${color}, 0)`)
      context.fillStyle = gradient
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
    }

    const render = (time) => {
      if (time - lastFrameTime < 33) {
        animationFrameId = window.requestAnimationFrame(render)
        return
      }
      lastFrameTime = time

      pointerX += (targetPointerX - pointerX) * 0.07
      pointerY += (targetPointerY - pointerY) * 0.07
      interactiveBoost *= 0.96
      pointerVelocityX *= 0.92
      pointerVelocityY *= 0.92

      context.clearRect(0, 0, width, height)

      const baseOverlay = context.createLinearGradient(0, 0, width, height)
      baseOverlay.addColorStop(0, 'rgba(13, 10, 13, 0.08)')
      baseOverlay.addColorStop(1, 'rgba(22, 17, 20, 0.18)')
      context.fillStyle = baseOverlay
      context.fillRect(0, 0, width, height)

      context.save()
      context.globalAlpha = 0.05
      context.strokeStyle = 'rgba(255, 255, 255, 0.28)'
      context.lineWidth = 1
      for (let row = 0; row < 7; row += 1) {
        const baseY = height * (0.08 + row * 0.095)
        context.beginPath()
        for (let x = -40; x <= width + 40; x += 28) {
          const y =
            baseY +
            Math.sin(x * 0.008 + time * 0.0012 + row * 0.4) * 8 +
            Math.cos(x * 0.004 + time * 0.0017) * 4
          if (x === -40) {
            context.moveTo(x, y)
          } else {
            context.lineTo(x, y)
          }
        }
        context.stroke()
      }
      context.restore()

      for (const blob of blobs) {
        const phase = time * blob.speed
        const x =
          width * blob.xFactor +
          Math.sin(phase * 2.4) * blob.sway +
          Math.cos(phase * 1.8) * blob.sway * 0.45
        const y =
          height * blob.yFactor +
          Math.cos(phase * 2.2) * blob.sway +
          Math.sin(phase * 1.7) * blob.sway * 0.35

        drawBlob(x, y, blob.radius, blob.color, blob.alpha)
      }

      if (isPointerActive || interactiveBoost > 0.02) {
        const pointerRadius = 240 + interactiveBoost * 46
        const pointerAlpha = clamp(0.1 + interactiveBoost * 0.1, 0.06, 0.22)
        drawBlob(pointerX, pointerY, pointerRadius, '214, 176, 113', pointerAlpha)
        drawBlob(pointerX + 44, pointerY - 28, pointerRadius * 0.72, '130, 71, 154', pointerAlpha * 0.7)
        drawBlob(
          pointerX - pointerVelocityX * 18,
          pointerY - pointerVelocityY * 18,
          pointerRadius * 0.68,
          '255, 255, 255',
          pointerAlpha * 0.24,
        )
      }

      for (let index = pulses.length - 1; index >= 0; index -= 1) {
        const pulse = pulses[index]
        pulse.life += 0.018
        if (pulse.life >= 1) {
          pulses.splice(index, 1)
          continue
        }

        const pulseRadius = 24 + pulse.life * (170 + pulse.force * 40)
        const pulseAlpha = (1 - pulse.life) * (0.24 + pulse.force * 0.04)
        context.save()
        context.globalCompositeOperation = 'screen'
        context.strokeStyle = `rgba(214, 176, 113, ${pulseAlpha})`
        context.lineWidth = 1.5 + pulse.force * 0.6
        context.beginPath()
        context.ellipse(
          pulse.x,
          pulse.y,
          pulseRadius,
          pulseRadius * 0.46,
          pulse.angle,
          0,
          Math.PI * 2,
        )
        context.stroke()
        context.restore()
      }

      if (isPointerActive || interactiveBoost > 0.03) {
        const pointerRadius = 240 + interactiveBoost * 46
        context.save()
        context.globalCompositeOperation = 'lighter'
        context.globalAlpha = 0.06 + interactiveBoost * 0.06
        context.strokeStyle = 'rgba(255, 245, 220, 0.24)'
        for (let ring = 0; ring < 3; ring += 1) {
          context.beginPath()
          context.ellipse(
            pointerX + ring * 12 - pointerVelocityX * (6 + ring * 3),
            pointerY - ring * 8 - pointerVelocityY * (6 + ring * 3),
            pointerRadius * (0.52 + ring * 0.16),
            pointerRadius * (0.22 + ring * 0.07),
            Math.sin(time * 0.00035 + ring) * 0.24 + pointerVelocityX * 0.06,
            0,
            Math.PI * 2,
          )
          context.stroke()
        }
        context.restore()
      }

      context.fillStyle = 'rgba(255, 255, 255, 0.02)'
      for (let index = 0; index < 22; index += 1) {
        const px = ((index * 97.3 + time * 0.015) % width)
        const py = ((index * 151.7 + time * 0.01) % height)
        context.beginPath()
        context.arc(px, py, 1.1, 0, Math.PI * 2)
        context.fill()
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event) => {
      isPointerActive = true
      const nextX = event.clientX
      const nextY = event.clientY
      pointerVelocityX = clamp((nextX - targetPointerX) / 18, -2.4, 2.4)
      pointerVelocityY = clamp((nextY - targetPointerY) / 18, -2.4, 2.4)
      targetPointerX = nextX
      targetPointerY = nextY
      interactiveBoost = clamp(interactiveBoost + 0.22, 0, 1.8)
      pulses.push({
        x: nextX,
        y: nextY,
        angle: Math.atan2(pointerVelocityY, pointerVelocityX || 0.001),
        force: Math.abs(pointerVelocityX) + Math.abs(pointerVelocityY),
        life: 0,
      })
      if (pulses.length > 10) {
        pulses.shift()
      }
    }

    const handlePointerLeave = () => {
      isPointerActive = false
    }

    resize()
    animationFrameId = window.requestAnimationFrame(render)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return <canvas aria-hidden="true" className="liquid-background" ref={canvasRef} />
}
