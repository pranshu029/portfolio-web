export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#050816] text-white">
      <div className="flex flex-col items-center gap-5">
        <div className="h-16 w-16 rounded-full border border-white/10 border-t-cyan-300 shadow-[0_0_50px_rgba(34,211,238,0.3)] animate-spin" />
        <p className="text-xs uppercase tracking-[0.32em] text-white/45">Loading portfolio</p>
      </div>
    </div>
  );
}
