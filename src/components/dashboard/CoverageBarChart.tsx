import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { EnrichedInventoryItem } from '../../types/inventoryTypes';

interface CoverageBarChartProps {
  data: EnrichedInventoryItem[];
}

function getBarColor(riskLevel: string) {
  switch (riskLevel) {
    case 'HIGH': return '#ef4444'; 
    case 'MEDIUM': return '#f59e0b';
    default: return '#10a37f'; // ChatGPT green
  }
}

export default function CoverageBarChart({ data }: CoverageBarChartProps) {
  const chartData = data.map((item) => ({
    name: item.productName,
    coverage: item.stockCoverage,
    leadTime: item.leadTime,
    riskLevel: item.riskLevel,
  }));

  return (
    <div className="neo-card p-6 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">Stock Coverage</h3>
        <p className="text-xs text-slate-500 mb-0">Days of stock remaining per item</p>
      </div>
      <div className="flex-1 min-h-[380px] w-full mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 40, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fontFamily: 'Inter', fontWeight: 500, fill: '#64748b' }}
              angle={-45}
              textAnchor="end"
              height={60}
              tickMargin={8}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fontFamily: 'Inter', fontWeight: 500, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 500,
                padding: '8px 12px',
                backgroundColor: '#fff'
              }}
              formatter={(value: number) => [`${value} days`, 'Coverage']}
            />
            <Bar dataKey="coverage" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.riskLevel)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
