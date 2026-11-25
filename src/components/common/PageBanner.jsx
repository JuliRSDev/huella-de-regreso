/**
 * Sunflower band at the top of the inner pages, in the style of the login page: the page title on the
 * left and an optional aside (counters, an illustration) on the right.
 */
const PageBanner = ({ eyebrow, title, description, children, aside }) => (
  <section className="relative overflow-hidden bg-sun print:bg-none">
    <div aria-hidden="true" className="absolute inset-0 bg-paws print:hidden" />
    <div aria-hidden="true" className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/25 print:hidden" />
    <div aria-hidden="true" className="absolute -bottom-28 right-[8%] h-80 w-80 rounded-full bg-white/20 print:hidden" />

    <div className="relative max-w-page mx-auto px-4 lg:px-8 py-10 lg:py-14 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
      <div>
        {eyebrow && (
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/70 print:hidden">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-ink">{title}</h1>
        {description && <p className="mt-4 md:text-lg text-ink/80 max-w-2xl">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>

      {aside && <div className="hidden lg:block print:hidden">{aside}</div>}
    </div>
  </section>
)

export default PageBanner
