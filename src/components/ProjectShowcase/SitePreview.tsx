import { ArrowUpRight, Box, PackageCheck, Search, Ship, UserRound } from 'lucide-react'

export function ShipNanyangPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative h-full min-h-44 overflow-hidden rounded-[inherit] bg-[#f4f7fb] text-[#14213a]">
      <div className="flex h-8 items-center justify-between border-b border-slate-200 bg-white px-3 text-[6px] font-bold uppercase tracking-wider">
        <span className="flex items-center gap-1 text-[#e95028]"><Ship className="size-3" /> ShipNanyang</span>
        <span className="rounded-full bg-[#e95028] px-2 py-1 text-white">Get a quote</span>
      </div>
      <div className="relative grid h-[calc(100%-2rem)] grid-cols-[1.05fr_.95fr] items-center overflow-hidden px-[8%]">
        <div className="relative z-10 py-4">
          <p className="mb-1 text-[6px] font-bold uppercase tracking-[.18em] text-[#e95028]">Global shipping solutions</p>
          <p className={`${compact ? 'text-sm' : 'text-xl'} max-w-[11ch] font-black leading-[.95] tracking-tight`}>Ship anywhere with confidence.</p>
          <p className="mt-2 max-w-[22ch] text-[6px] leading-relaxed text-slate-500">Reliable sea and air freight, from China to your doorstep.</p>
          <div className="mt-3 flex gap-1.5">
            <span className="rounded bg-[#e95028] px-2 py-1 text-[5px] font-bold text-white">Get instant quote</span>
            <span className="rounded border border-slate-200 bg-white px-2 py-1 text-[5px] font-bold">Track shipment</span>
          </div>
        </div>
        <div className="relative h-full">
          <div className="absolute -right-8 top-[18%] h-[62%] w-[125%] -skew-x-6 rounded-l-3xl bg-[linear-gradient(145deg,#25344a,#748297)]" />
          <Ship className="absolute right-[12%] top-[35%] size-[46%] text-white/85" strokeWidth={1.1} />
          <div className="absolute bottom-[18%] right-[5%] flex gap-1">
            {[Box, PackageCheck, UserRound].map((Icon, index) => <span className="flex size-5 items-center justify-center rounded-full bg-white shadow" key={index}><Icon className="size-2.5 text-[#e95028]" /></span>)}
          </div>
        </div>
      </div>
      <Search className="absolute right-3 top-2.5 size-2 text-slate-400" />
    </div>
  )
}

export function DashboardPreview() {
  return (
    <div className="h-full min-h-44 rounded-[inherit] bg-[#07111e] p-4 text-white">
      <div className="mb-4 flex items-center justify-between"><span className="text-[7px] font-bold">Operations</span><ArrowUpRight className="size-3 text-cyan-300" /></div>
      <div className="grid grid-cols-3 gap-2">{['Shipments', 'In transit', 'Delivered'].map((item, i) => <div className="rounded border border-white/8 bg-white/5 p-2" key={item}><p className="text-[5px] text-slate-400">{item}</p><p className="mt-1 text-sm font-bold">{[128, 42, 86][i]}</p></div>)}</div>
      <div className="mt-3 flex h-16 items-end gap-1 rounded border border-white/8 bg-white/[.03] px-3 pb-2">{[35, 60, 45, 80, 52, 72, 95, 68].map((height, i) => <span className="flex-1 rounded-t-sm bg-blue-500/70" key={i} style={{ height: `${height}%` }} />)}</div>
    </div>
  )
}
