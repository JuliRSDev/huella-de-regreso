import { useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { cloudinaryImage } from '../../utils/cloudinaryImage'
import { CARD_IMAGE_WIDTH, preloadDetailImage } from '../../utils/preloadImage'
import ProgressiveImage from '../common/ProgressiveImage'

const arrowCls = 'absolute top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-ink shadow-lg backdrop-blur transition hover:bg-white hover:scale-105 cursor-pointer'

/**
 * Photo gallery of the report detail: the photo over a blurred copy of itself, arrows, swipe and
 * thumbnails. It fills its parent, so the parent decides the size.
 */
const Carousel = ({ images, index, setIndex, title = 'la mascota' }) => {
  const touchStartX = useRef(null)
  const count = images?.length ?? 0

  // The next photo starts downloading while the current one is on screen
  useEffect(() => {
    if (count > 1) preloadDetailImage(images[(index + 1) % count])
  }, [images, index, count])

  if (!count) return null

  const prev = () => setIndex(index === 0 ? count - 1 : index - 1)
  const next = () => setIndex(index === count - 1 ? 0 : index + 1)

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) (delta > 0 ? next : prev)()
    touchStartX.current = null
  }

  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-ink" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <img
        src={cloudinaryImage(images[index], CARD_IMAGE_WIDTH)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-2xl"
      />
      <ProgressiveImage key={images[index]} url={images[index]} alt={`Foto ${index + 1} de ${title}`} className="absolute inset-0" />

      {count > 1 && (
        <>
          <button type="button" aria-label="Foto anterior" onClick={prev} className={`${arrowCls} left-4`}>
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button type="button" aria-label="Foto siguiente" onClick={next} className={`${arrowCls} right-4`}>
            <FaChevronRight aria-hidden="true" />
          </button>

          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <div className="flex gap-2 rounded-2xl bg-black/35 p-2 backdrop-blur-md">
              {images.map((url, i) => (
                <button
                  key={url}
                  type="button"
                  aria-label={`Ver foto ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-12 w-12 overflow-hidden rounded-xl ring-2 transition cursor-pointer ${i === index ? 'ring-sun' : 'ring-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={cloudinaryImage(url, 120)} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Carousel
