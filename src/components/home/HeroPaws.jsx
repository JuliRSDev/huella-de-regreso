import { FaPaw } from "react-icons/fa"

// A few short walks of three prints, placed in the free areas of the hero (never on the text or
// the buttons). Each walk is rotated as a whole; the prints alternate a little to each side.
// On phones the hero is one column, so only the walks under the stats are shown.
const WALKS = [
  { top: "26%", left: "3%", angle: 75, show: "desktop" },
  { top: "30%", left: "44%", angle: -40, show: "desktop" },
  { top: "80%", left: "57%", angle: 10, show: "desktop" },
  { top: "14%", left: "86%", angle: 110, show: "desktop" },
  { top: "91%", left: "3%", angle: 6, show: "all" },
  { top: "91%", left: "62%", angle: -6, show: "mobile" },
]

const VISIBILITY = { desktop: "hidden md:block", mobile: "md:hidden", all: "" }

const STEPS = [
  { x: 0, y: -9 },
  { x: 34, y: 9 },
  { x: 68, y: -9 },
]

const HeroPaws = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    {WALKS.map((walk, w) => (
      <div
        key={`${walk.top}-${walk.left}`}
        className={`absolute ${VISIBILITY[walk.show]}`}
        style={{ top: walk.top, left: walk.left, transform: `rotate(${walk.angle}deg)` }}
      >
        {STEPS.map((step, s) => (
          <FaPaw
            key={`${step.x}`}
            className="paw-step absolute w-4 h-4 md:w-5 md:h-5 text-[#F7D047]/60"
            style={{ left: step.x, top: step.y, transform: "rotate(90deg)", animationDelay: `${w * 0.25 + s * 0.15}s` }}
          />
        ))}
      </div>
    ))}
  </div>
)

export default HeroPaws
