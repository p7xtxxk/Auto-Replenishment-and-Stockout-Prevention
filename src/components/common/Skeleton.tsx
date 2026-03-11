interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton ${className}`} />;
}

export function KPICardSkeleton() {
  return (
    <div className="bg-white border-2 border-black/10 rounded-xl p-6 space-y-3">
      <Skeleton className="w-10 h-10" />
      <Skeleton className="w-20 h-8" />
      <Skeleton className="w-32 h-4" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white border-2 border-black rounded-xl p-6 space-y-3">
      <Skeleton className="w-full h-10" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="w-full h-12" />
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white border-2 border-black rounded-xl p-6">
      <Skeleton className="w-40 h-6 mb-4" />
      <Skeleton className="w-full h-64" />
    </div>
  );
}
