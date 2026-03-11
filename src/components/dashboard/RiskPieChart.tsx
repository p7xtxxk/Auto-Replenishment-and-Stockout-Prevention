import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { EnrichedInventoryItem } from '../../types/inventoryTypes';

interface RiskPieChartProps {
  data: EnrichedInventoryItem[];
}

const COLORS = {
  Safe: '#10a37f', // ChatGPT primary green
  'Medium Risk': '#fbbf24', // Amber
  'High Risk': '#ef4444', // Red
};

export default function RiskPieChart({ data }: RiskPieChartProps) {
  const chartData = [
    { name: 'Safe', value: data.filter((d) => d.riskLevel === 'SAFE').length },
    { name: 'Medium Risk', value: data.filter((d) => d.riskLevel === 'MEDIUM').length },
    { name: 'High Risk', value: data.filter((d) => d.riskLevel === 'HIGH').length },
  ].filter((d) => d.value > 0);

  return (
    <div className="neo-card p-6 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">Risk Distribution</h3>
        <p className="text-xs text-slate-500 mb-0">Current inventory health overview</p>
      </div>
      <div className="flex-1 min-h-[380px] w-full mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontFamily: 'Inter',
                fontSize: '13px',
                padding: '8px 12px',
                backgroundColor: '#fff'
              }}
              itemStyle={{ fontWeight: 500, color: '#1f2937' }}
            />
            <Legend
              wrapperStyle={{ fontFamily: 'Inter', fontSize: '12px', paddingTop: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
