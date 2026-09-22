export default function SkeletonCard() {
  return (
    <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden animate-pulse">
      <div className="aspect-square bg-[#1C1C1E]" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-[#1C1C1E] rounded w-1/3" />
        <div className="h-4 bg-[#1C1C1E] rounded w-3/4" />
        <div className="h-3 bg-[#1C1C1E] rounded w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-[#1C1C1E] rounded w-20" />
          <div className="h-8 bg-[#1C1C1E] rounded w-8" />
        </div>
      </div>
    </div>
  );
}
