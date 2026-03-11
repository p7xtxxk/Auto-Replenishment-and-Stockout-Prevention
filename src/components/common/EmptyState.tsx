import { Package } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  description?: string;
}

export default function EmptyState({
  message = 'No data available',
  description = 'There are no items to display at this time.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-black/10 flex items-center justify-center mb-4">
        <Package className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-1">{message}</h3>
      <p className="text-sm text-slate-400 max-w-sm">{description}</p>
    </div>
  );
}
