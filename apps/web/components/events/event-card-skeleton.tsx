const SKELETON_CARD_COUNT = 6;

type EventGridSkeletonProps = { label: string };

/** Static placeholder grid; motion is disabled for reduced-motion users. */
export function EventGridSkeleton({ label }: EventGridSkeletonProps) {
  return (
    <div role="status" aria-live="polite" data-events-loading>
      <span className="sr-only">{label}</span>
      <div
        aria-hidden="true"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-[1.35rem] border border-border-card bg-card motion-safe:animate-pulse"
          >
            <div className="grid gap-3 p-5">
              <div className="flex justify-between gap-3">
                <div className="h-7 w-20 rounded-full bg-muted" />
                <div className="h-6 w-24 rounded-full bg-muted" />
              </div>
              <div className="h-5 w-4/5 rounded bg-muted" />
              <div className="h-5 w-2/3 rounded bg-muted" />
              <div className="mt-3 h-3 w-1/2 rounded bg-muted" />
              <div className="h-3 w-2/3 rounded bg-muted" />
              <div className="mt-2 h-11 w-full rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
