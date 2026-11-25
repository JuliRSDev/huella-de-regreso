import { useState } from 'react'
import { cloudinaryImage } from '../../utils/cloudinaryImage'
import { CARD_IMAGE_WIDTH, DETAIL_IMAGE_WIDTH } from '../../utils/preloadImage'

/**
 * Shows the card-size photo, which the browser already has from the list, at once, and fades in the
 * sharper detail-size photo as soon as it arrives. The whole pet stays visible (object-contain).
 * className must give the box a position and a size (e.g. 'absolute inset-0' or 'relative h-80').
 */
const ProgressiveImage = ({ url, alt, className = 'relative h-full w-full' }) => {
  const sharpSrc = cloudinaryImage(url, DETAIL_IMAGE_WIDTH)
  const [loadedSrc, setLoadedSrc] = useState(null)
  const sharpReady = loadedSrc === sharpSrc

  return (
    <div className={className}>
      <img
        src={cloudinaryImage(url, CARD_IMAGE_WIDTH)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain"
      />
      <img
        src={sharpSrc}
        alt={alt}
        decoding="async"
        onLoad={() => setLoadedSrc(sharpSrc)}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${sharpReady ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

export default ProgressiveImage
