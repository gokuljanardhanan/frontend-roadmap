import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="p-4 space-y-4">
      {/* Add ThemeToggle button to test */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
