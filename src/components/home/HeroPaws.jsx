import { FaPaw } from "react-icons/fa"

// Small prints placed only in the free areas of the hero (edges, the gap between the text and the
// picture, and the bottom strip) so they never sit on the text or the buttons. On phones the hero
// is one column, so only the bottom strip stays visible.
const PAWS = [
  { top: 16, left: 4, size: "w-5 h-5", rotate: -20 },
  { top: 34, left: 7, size: "w-4 h-4", rotate: 15 },
  { top: 55, left: 3, size: "w-6 h-6", rotate: -10 },
  { top: 76, left: 6, size: "w-4 h-4", rotate: 25 },
  { top: 20, left: 47, size: "w-5 h-5", rotate: 20 },
  { top: 44, left: 49, size: "w-4 h-4", rotate: -25 },
  { top: 68, left: 46, size: "w-5 h-5", rotate: 30 },
  { top: 16, left: 66, size: "w-4 h-4", rotate: -15 },
  { top: 84, left: 70, size: "w-5 h-5", rotate: 20 },
  { top: 22, left: 91, size: "w-6 h-6", rotate: 10 },
  { top: 45, left: 95, size: "w-4 h-4", rotate: -30 },
  { top: 70, left: 92, size: "w-5 h-5", rotate: 15 },
  { top: 93, left: 10, size: "w-5 h-5", rotate: -30, mobile: true },
  { top: 95, left: 30, size: "w-4 h-4", rotate: 10, mobile: true },
  { top: 91, left: 45, size: "w-5 h-5", rotate: -15, mobile: true },
  { top: 94, left: 60, size: "w-4 h-4", rotate: 25, mobile: true },
  { top: 92, left: 80, size: "w-5 h-5", rotate: -20, mobile: true },
  { top: 95, left: 92, size: "w-4 h-4", rotate: 15, mobile: true },
]

const HeroPaws = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    {PAWS.map((paw, i) => (
      <FaPaw
        key={`${paw.top}-${paw.left}`}
        className={`paw-step absolute ${paw.size} text-[#F7D047]/45 ${paw.mobile ? "" : "hidden md:block"}`}
        style={{ top: `${paw.top}%`, left: `${paw.left}%`, transform: `rotate(${paw.rotate}deg)`, animationDelay: `${i * 0.08}s` }}
      />
    ))}
  </div>
)

export default HeroPaws
