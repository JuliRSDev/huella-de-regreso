/**
 * PetCardSkeleton.jsx
 * Placeholder animado mientras cargan las tarjetas, con la misma forma de PetCard.
 */

const Shimmer = ({ className }) => (
  <div className={`animate-pulse bg-black/5 rounded ${className}`} />
)

const PetCardSkeleton = () => (
  <div className='overflow-hidden rounded-3xl bg-white ring-1 ring-black/5'>
    <Shimmer className='aspect-4/3 w-full rounded-none' />
    <div className='space-y-3 p-5'>
      <Shimmer className='h-3 w-full' />
      <Shimmer className='h-3 w-5/6' />
      <div className='flex items-center justify-between border-t border-black/5 pt-4'>
        <Shimmer className='h-5 w-1/2 rounded-full' />
        <Shimmer className='h-9 w-9 rounded-full' />
      </div>
    </div>
  </div>
)

/**
 * Genera N skeletons en un grid
 */
export const SkeletonGrid = ({ count = 9 }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
    {Array.from({ length: count }, (_, i) => (
      <PetCardSkeleton key={i} />
    ))}
  </div>
)

export default PetCardSkeleton
