import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import type { EnrichedInventoryItem } from '../../types/inventoryTypes';
import RiskBadge from '../common/RiskBadge';

interface InventoryTableProps {
  data: EnrichedInventoryItem[];
  globalFilter?: string;
}

export default function InventoryTable({ data, globalFilter = '' }: InventoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<EnrichedInventoryItem>[]>(
    () => [
      {
        accessorKey: 'sku',
        header: ({ column }) => (
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider" onClick={() => column.toggleSorting()}>
            SKU <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => (
          <span className="font-mono text-[14px] font-medium text-slate-700">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'productName',
        header: ({ column }) => (
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider" onClick={() => column.toggleSorting()}>
            Product Name <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => <span className="font-medium text-slate-900 text-[15px]">{info.getValue<string>()}</span>,
      },
      {
        accessorKey: 'dailySales',
        header: ({ column }) => (
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider" onClick={() => column.toggleSorting()}>
            Daily Sales <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => <span className="text-slate-600 font-medium tabular-nums text-[15px]">{info.getValue<number>()} <span className="text-slate-400 text-[13px] ml-1">avg</span></span>,
      },
      {
        accessorKey: 'currentStock',
        header: ({ column }) => (
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider" onClick={() => column.toggleSorting()}>
            Current Stock <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => <span className="text-slate-800 font-bold tabular-nums text-[15px]">{info.getValue<number>()}</span>,
      },
      {
        accessorKey: 'leadTime',
        header: ({ column }) => (
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider" onClick={() => column.toggleSorting()}>
            Lead Time <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => <span className="text-slate-600 font-medium tabular-nums text-[15px]">{info.getValue<number>()} <span className="text-slate-400 text-[13px] ml-1">days</span></span>,
      },
      {
        accessorKey: 'stockCoverage',
        header: ({ column }) => (
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider" onClick={() => column.toggleSorting()}>
            Coverage <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => <span className="font-semibold text-slate-900 tabular-nums text-[15px]">{info.getValue<number>()} <span className="text-slate-400 text-[13px] ml-1">days</span></span>,
      },
      {
        accessorKey: 'riskLevel',
        header: ({ column }) => (
          <div className="flex justify-end w-full">
            <button className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider" onClick={() => column.toggleSorting()}>
              Risk Level <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        ),
        cell: (info) => (
          <div className="flex justify-end w-full">
            <RiskBadge level={info.getValue<EnrichedInventoryItem['riskLevel']>()} />
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 12 } },
  });

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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#f9fafb] transition-colors group"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-5 align-middle group-first:pt-6 border-b border-transparent group-hover:border-slate-100">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modern, minimalist pagination footer */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
        <p className="text-[13px] text-slate-500 font-medium">
          Showing {table.getRowModel().rows.length} of {data.length} results
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
