import { profile } from "@/lib/data";

export default function GamertagBar() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/80 px-3 py-2 shadow-tile">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-xbox-green to-xbox-deep font-display text-lg font-bold text-white shadow-glow">
        TB
      </div>
      <div className="leading-tight">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold text-neutral-800">
            {profile.gamertag}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-xbox-deep">
            <span className="h-2 w-2 rounded-full bg-xbox-green shadow-glow" />
            {profile.status}
          </span>
        </div>
        <div className="text-[11px] text-neutral-500">
          {profile.gamerscore.toLocaleString()} G • {profile.location}
        </div>
      </div>
    </div>
  );
}
