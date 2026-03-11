import { Settings, Bot, Database, Bell, Shield, ExternalLink } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-12 w-full">
      {/* Page header (slightly smaller max-width for settings typically) */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">System Settings</h2>
          <p className="text-[15px] text-slate-600 mt-2 leading-relaxed">
            Configure agent behaviors, data sources, and application preferences.
          </p>
        </div>
      </div>

      {/* Settings Sections - Vertical Layout like typical modern SaaS */}
      <div className="space-y-12">
        {/* Agent Configuration */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Agent Configuration</h3>
              <p className="text-[13px] text-slate-500 mt-0.5">Manage and monitor automated background processors.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Demand Analysis', desc: 'Analyzes historical sales data to predict future inventory needs and seasonality trends.', metrics: [{ label: 'Last Run', value: '2 mins ago' }, { label: 'Accuracy', value: '98.5%' }] },
              { name: 'Risk Detection', desc: 'Continuously monitors stock levels against lead times to identify potential stockout risks.', metrics: [{ label: 'Last Run', value: 'Just now' }, { label: 'Entities', value: '20 SKUs' }] },
              { name: 'Replenishment Engine', desc: 'Generates automated purchase order recommendations based on risk assessments.', metrics: [{ label: 'Last Run', value: '1 hr ago' }, { label: 'Generated', value: '12 Orders' }] }
            ].map((agent) => (
              <div key={agent.name} className="neo-card p-6 h-full flex flex-col justify-between group hover:border-[#10a37f] transition-colors bg-white relative">
                <div>
                  <h4 className="text-[16px] font-bold text-slate-900">{agent.name}</h4>
                  <p className="text-[14px] text-slate-500 mt-2 leading-relaxed">{agent.desc}</p>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-6 text-[13px]">
                    {agent.metrics.map(m => (
                      <div key={m.label} className="flex flex-col">
                        <span className="text-slate-400 font-medium uppercase tracking-wider text-[11px] mb-0.5">{m.label}</span>
                        <span className="text-slate-800 font-bold">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end pt-4 border-t border-slate-100 mt-2">
                    <div className="flex items-center gap-2">
                       <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-[14px] font-bold text-emerald-700 uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Integrations */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Data Integrations</h3>
              <p className="text-[13px] text-slate-500 mt-0.5">Configure live inventory monitoring sources.</p>
            </div>
          </div>
          
          <div className="neo-card divide-y divide-slate-100 bg-white shadow-sm">
            {[['Source Type', 'Mock Data (JSON)'], ['Products Loaded', '20 tracked items'], ['Last Sync', 'Real-time via local storage']].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between p-5 hover:bg-[#f9fafb] transition-colors">
                <p className="text-[14px] font-medium text-slate-600">{label}</p>
                <p className="text-[15px] text-slate-900 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Locked Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 mt-12 border-t border-slate-200">
          <div className="neo-card p-8 bg-slate-50/50 border-slate-200 border-dashed min-h-[240px] flex flex-col items-start justify-between relative">
            <div>
              <div className="flex items-center gap-3 mb-4 opacity-70">
                <Bell className="w-6 h-6 text-slate-600" />
                <h4 className="text-[18px] font-bold text-slate-800">Advanced Notifications</h4>
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-6 max-w-md">
                Configure advanced alerting rules including multi-channel routing, customizable priority thresholds, and digest scheduling. This feature will be available in the next functional release.
              </p>
              <ul className="text-[14px] text-slate-500 space-y-2.5 mb-2 list-disc list-inside font-medium">
                <li>Slack & Teams Webhooks</li>
                <li>Customizable Escalation Paths</li>
                <li>Daily/Weekly Digest Emails</li>
              </ul>
            </div>
            <span className="absolute top-8 right-8 text-[12px] font-bold px-3 py-1.5 bg-slate-200 text-slate-600 rounded-md uppercase tracking-wider">Coming Soon</span>
          </div>

          <div className="neo-card p-8 bg-slate-50/50 border-slate-200 border-dashed min-h-[240px] flex flex-col items-start justify-between relative">
            <div>
              <div className="flex items-center gap-3 mb-4 opacity-70">
                <Shield className="w-6 h-6 text-slate-600" />
                <h4 className="text-[18px] font-bold text-slate-800">Security & Access Control</h4>
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-6 max-w-md">
                Implement Role-Based Access Control (RBAC), Single Sign-On (SSO) integration via Okta or Active Directory, and comprehensive audit logging for organizational compliance.
              </p>
              <ul className="text-[14px] text-slate-500 space-y-2.5 mb-2 list-disc list-inside font-medium">
                <li>SAML 2.0 / OIDC Support</li>
                <li>Granular Role Permissions</li>
                <li>Exportable Audit Trails</li>
              </ul>
            </div>
            <span className="absolute top-8 right-8 text-[12px] font-bold px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-md uppercase tracking-wider">Enterprise</span>
          </div>
        </div>
      </div>
    </div>
  );
}
