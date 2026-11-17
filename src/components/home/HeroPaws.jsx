import { FaPaw } from "react-icons/fa"

// Two short walks of three prints framing the picture, one above and one below it.
// The picture is hidden on phones, so the prints are too.
const WALKS = [
  { top: "18%", left: "57%", angle: 10 },
  { top: "80%", left: "57%", angle: 10 },
]

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
        className="absolute hidden md:block"
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
