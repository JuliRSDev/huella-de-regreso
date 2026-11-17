import { FaPaw } from "react-icons/fa"

const STEPS = 16

// A walking trail along the bottom of the hero that turns upwards past the picture.
// Left and right prints alternate a little to each side of the path, like real footprints.
const TRAIL = Array.from({ length: STEPS }, (_, i) => {
  const t = i / (STEPS - 1)
  const climb = Math.max(0, (t - 0.78) / 0.22) ** 2
  const side = i % 2 === 0 ? -1.6 : 1.6
  return {
    left: 2 + t * 94,
    top: 88 - 6 * t - 34 * climb + 3 * Math.sin(t * Math.PI * 2) + side,
    rotate: 90 - 45 * climb,
    delay: i * 0.12,
    // On phones the hero is one column, so the right half of the trail would cross the cards
    desktopOnly: t > 0.6,
  }
})

const SCATTERED = [
  { top: "14%", left: "46%", size: "w-10 h-10", rotate: -20 },
  { top: "58%", left: "44%", size: "w-8 h-8", rotate: 25 },
  { top: "22%", left: "93%", size: "w-12 h-12", rotate: 15 },
  { top: "8%", left: "70%", size: "w-7 h-7", rotate: -35 },
]

const PawTrail = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    {TRAIL.map((paw) => (
      <FaPaw
        key={`trail-${paw.left}`}
        className={`paw-step absolute w-5 h-5 md:w-6 md:h-6 text-white/80 drop-shadow-sm ${paw.desktopOnly ? 'hidden md:block' : ''}`}
        style={{ top: `${paw.top}%`, left: `${paw.left}%`, transform: `rotate(${paw.rotate}deg)`, animationDelay: `${paw.delay}s` }}
      />
    ))}
    {SCATTERED.map((paw) => (
      <FaPaw
        key={`scattered-${paw.top}-${paw.left}`}
        className={`hidden md:block absolute ${paw.size} text-[#F7D047]/35`}
        style={{ top: paw.top, left: paw.left, transform: `rotate(${paw.rotate}deg)` }}
      />
    ))}
  </div>
)

export default PawTrail
