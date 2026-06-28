import GlowBackground from "@/components/ui/GlowBackground";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <GlowBackground />
      <DashboardShell />
    </main>
  );
}
