import { FaPaw } from "react-icons/fa"

// Two short walks of three prints around the hero picture: one coming down onto the cat's body
// and one under the cushion. Positions are percentages of the picture's own box, so the prints
// move and scale with it at any screen width.
const WALKS = [
  { top: "11%", left: "67%", angle: 190 },
  { top: "88.6%", left: "8%", angle: 10 },
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
        className="absolute"
        style={{ top: walk.top, left: walk.left, transform: `rotate(${walk.angle}deg)` }}
      >
        {STEPS.map((step, s) => (
          <FaPaw
            key={`${step.x}`}
            className="paw-step absolute w-5 h-5 text-[#F7D047]/60"
            style={{ left: step.x, top: step.y, transform: "rotate(90deg)", animationDelay: `${w * 0.25 + s * 0.15}s` }}
          />
        ))}
      </div>
    ))}
  </div>
)

export default HeroPaws
