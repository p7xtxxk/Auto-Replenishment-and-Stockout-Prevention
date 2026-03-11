import { useInventory } from '../hooks/useInventory';
import ReplenishmentTable from '../components/replenishment/ReplenishmentTable';
import { TableSkeleton } from '../components/common/Skeleton';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { runReplenishmentAgent } from '../services/agentService';

export default function ReplenishmentPage() {
  const { recommendations, isLoading } = useInventory();
  const [agentStatus, setAgentStatus] = useState<string | null>(null);
  const [agentRunning, setAgentRunning] = useState(false);

  const handleRunAgent = async () => {
    setAgentRunning(true);
    setAgentStatus(null);
    try {
      const result = await runReplenishmentAgent();
      setAgentStatus(result.message);
    } catch {
      setAgentStatus('Agent execution failed. Please try again.');
    } finally {
      setAgentRunning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <TableSkeleton rows={10} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 w-full">
      {/* Page header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 py-4">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Replenishment Engine</h2>
          <p className="text-[15px] text-slate-600 mt-2 leading-relaxed">
            AI-suggested reorder quantities based on predictive demand analysis and lead-time monitoring.
          </p>
        </div>

        {/* Right-aligned action button - ChatGPT style primary */}
        <button
          onClick={handleRunAgent}
          disabled={agentRunning}
          className="neo-btn btn-primary px-5 py-2.5 shadow-sm text-sm flex items-center gap-2 shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${agentRunning ? 'animate-spin' : ''}`} />
          {agentRunning ? 'Running Agent…' : 'Generate New Run'}
        </button>
      </div>

      {/* Agent status */}
      {agentStatus && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl p-4 text-sm font-medium flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          {agentStatus}
        </div>
      )}

      {/* Recommendations table spans full width in containment */}
      <div className="w-full">
        <ReplenishmentTable data={recommendations} />
      </div>
    </div>
  );
}
