import GlowBackground from "@/components/ui/GlowBackground";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function Home() {
  return (
    // Wrapper is a plain div so the dashboard's <main> is the page's single
    // main landmark (was a nested <main>, which is invalid).
    <div className="relative min-h-screen">
      <a
        href="#main-content"
        className="sr-only rounded-lg bg-white px-4 py-2 font-display text-sm font-semibold text-xbox-deep shadow-tile focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>
      <GlowBackground />
      <DashboardShell />
    </div>
  );
}
