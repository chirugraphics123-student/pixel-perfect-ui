import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopMover } from "@/types/market";

interface TopMoversProps {
  movers: TopMover[];
  onSelect: (symbol: string) => void;
}

export function TopMovers({ movers, onSelect }: TopMoversProps) {
  const formatCurrency = (value: number | null) => {
    if (value === null) return "—";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-warning" />
          Top Movers by Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {movers.map((mover, index) => (
          <button
            key={mover.symbol}
            onClick={() => onSelect(mover.symbol)}
            className="group flex w-full items-center justify-between rounded-lg border bg-card p-3 text-left transition-all hover:border-primary/50 hover:shadow-md"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                mover.trend === "up" ? "bg-success/10" : "bg-destructive/10"
              }`}>
                {mover.trend === "up" ? (
                  <TrendingUp className="h-5 w-5 text-success" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
              </div>
              <div>
                <p className="font-mono font-semibold group-hover:text-primary">{mover.symbol}</p>
                <p className="text-xs text-muted-foreground">{mover.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(mover.current_price)}</p>
              {mover.change_percent !== null && (
                <p className={`text-sm font-medium ${
                  mover.change_percent >= 0 ? "text-success" : "text-destructive"
                }`}>
                  {mover.change_percent >= 0 ? "+" : ""}{mover.change_percent.toFixed(2)}%
                </p>
              )}
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
