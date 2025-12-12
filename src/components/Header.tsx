import { Activity, TrendingUp } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Activity className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight">MarketPulse AI</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Financial Analysis</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm md:flex">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="font-medium">NIFTY 50</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
