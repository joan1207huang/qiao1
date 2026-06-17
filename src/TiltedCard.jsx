import { useRef, useState } from 'react'
import './TiltedCard.css'

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.08,
  rotateAmplitude = 12,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) {
  const ref = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [cardStyle, setCardStyle] = useState({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
  })
  const [captionStyle, setCaptionStyle] = useState({
    left: 0,
    top: 0,
    opacity: 0,
    transform: 'translate3d(0, 0, 0) rotate(0deg)',
  })
  const lastYRef = useRef(0)

  function handleMouse(event) {
    if (!ref.current) {
      return
    }

    const rect = ref.current.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude

    setCardStyle({
      transform: `perspective(1200px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scaleOnHover})`,
    })

    const velocityY = offsetY - lastYRef.current
    lastYRef.current = offsetY
    setCaptionStyle({
      left: event.clientX - rect.left,
      top: event.clientY - rect.top,
      opacity: 1,
      transform: `translate3d(18px, -18px, 0) rotate(${-velocityY * 0.35}deg)`,
    })
  }

  function handleMouseEnter() {
    setIsHovering(true)
  }

  function handleMouseLeave() {
    setIsHovering(false)
    setCardStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
    })
    setCaptionStyle((current) => ({
      ...current,
      opacity: 0,
      transform: 'translate3d(0, 0, 0) rotate(0deg)',
    }))
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          ...cardStyle,
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {displayOverlayContent && overlayContent ? (
          <div className="tilted-card-overlay">{overlayContent}</div>
        ) : null}
      </div>

      {showTooltip && captionText ? (
        <figcaption
          className="tilted-card-caption"
          style={{
            left: `${captionStyle.left}px`,
            top: `${captionStyle.top}px`,
            opacity: captionStyle.opacity,
            transform: captionStyle.transform,
          }}
        >
          {captionText}
        </figcaption>
      ) : null}
    </figure>
  )
}
