import { ArrowUpDown, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import type { ReplenishmentRecommendation } from '../../types/inventoryTypes';
import EmptyState from '../common/EmptyState';

interface ReplenishmentTableProps {
  data: ReplenishmentRecommendation[];
}

export default function ReplenishmentTable({ data }: ReplenishmentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ReplenishmentRecommendation>[]>(
    () => [
      {
        accessorKey: 'sku',
        header: ({ column }) => (
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider" onClick={() => column.toggleSorting()}>
            SKU <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => (
          <span className="font-mono text-[14px] font-medium text-slate-600">{info.getValue<string>()}</span>
        ),
        size: 110,
      },
      {
        accessorKey: 'productName',
        header: ({ column }) => (
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider" onClick={() => column.toggleSorting()}>
            Product <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => <span className="font-medium text-slate-900 text-[15px]">{info.getValue<string>()}</span>,
      },
      {
        accessorKey: 'suggestedOrderQuantity',
        header: ({ column }) => (
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider" onClick={() => column.toggleSorting()}>
            Suggested Qty <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => (
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-md text-[15px] font-medium tabular-nums">
              +{info.getValue<number>()} <span className="ml-[4px] text-green-600/70 text-xs">units</span>
            </span>
          </div>
        ),
        size: 160,
      },
      {
        accessorKey: 'reason',
        header: 'Reason',
        cell: (info) => (
          <span className="text-[14px] text-slate-600 leading-relaxed block max-w-lg">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'confidence',
        header: ({ column }) => (
          <div className="flex justify-end w-full">
            <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider text-right" onClick={() => column.toggleSorting()}>
              AI Confidence <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        ),
        cell: (info) => {
          const val = info.getValue<number>();
          const isHigh = val >= 90;
          return (
            <div className="flex items-center justify-end gap-3 w-full">
               {isHigh ? (
                 <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
               ) : (
                 <AlertCircle className="w-4.5 h-4.5 text-amber-500" />
               )}
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden shrink-0">
                <div
                  className={`h-full rounded-full ${isHigh ? 'bg-emerald-500' : 'bg-amber-400'}`}
                  style={{ width: `${val}%` }}
                />
              </div>
              <span className="text-[14px] font-medium text-slate-700 tabular-nums w-[36px] text-right">{val}%</span>
            </div>
          );
        },
        size: 200,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  if (data.length === 0) {
    return (
      <div className="neo-card p-12">
        <EmptyState message="No recommendations" description="All stock levels are adequate." />
      </div>
    );
  }

  return (
    <div className="neo-card flex flex-col w-full bg-white overflow-hidden">
      <div className="overflow-x-auto w-full">
        {/* Table expands naturally using table-layout auto */}
        <table className="w-full text-left" style={{ tableLayout: 'auto' }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-slate-200 bg-slate-50/50">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4 align-middle">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {table.getRowModel().rows.map((row) => {
              const confidence = row.original.confidence;
              const isWarning = confidence < 85 && confidence >= 75;
              return (
                <tr
                  key={row.id}
                  className={`transition-colors duration-150 group ${
                    isWarning ? 'hover:bg-amber-50/30' : 'hover:bg-[#f9fafb]'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-5 align-middle group-first:pt-6 border-b border-transparent group-hover:border-slate-100">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modern, minimalist pagination footer */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
        <p className="text-[13px] text-slate-500 font-medium">
          Showing {data.length} recommendations
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-[13px] font-medium text-slate-700 px-2">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
