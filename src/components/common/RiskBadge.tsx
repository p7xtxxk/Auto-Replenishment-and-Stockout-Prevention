import type { RiskLevel } from '../../types/inventoryTypes';

interface RiskBadgeProps {
  level: RiskLevel;
}

const config: Record<RiskLevel, { label: string; bg: string; text: string; border: string }> = {
  SAFE: {
    label: 'Safe',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-300',
  },
  MEDIUM: {
    label: 'Medium Risk',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-300',
  },
  HIGH: {
    label: 'High Risk',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-300',
  },
};

export default function RiskBadge({ level }: RiskBadgeProps) {
  const c = config[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          level === 'SAFE' ? 'bg-emerald-500' : level === 'MEDIUM' ? 'bg-orange-500' : 'bg-red-500'
        }`}
      />
      {c.label}
    </span>
  );
}
