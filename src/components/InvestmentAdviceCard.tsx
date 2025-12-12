import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Eye, 
  AlertTriangle,
  Target,
  ShieldAlert,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { InvestmentAdvice } from "@/types/market";

interface InvestmentAdviceCardProps {
  advice: InvestmentAdvice;
}

const actionConfig = {
  BUY: {
    icon: TrendingUp,
    color: "bg-success text-success-foreground",
    borderColor: "border-success/30",
  },
  SELL: {
    icon: TrendingDown,
    color: "bg-destructive text-destructive-foreground",
    borderColor: "border-destructive/30",
  },
  HOLD: {
    icon: Minus,
    color: "bg-warning text-warning-foreground",
    borderColor: "border-warning/30",
  },
  WATCH: {
    icon: Eye,
    color: "bg-info text-info-foreground",
    borderColor: "border-info/30",
  },
};

export function InvestmentAdviceCard({ advice }: InvestmentAdviceCardProps) {
  const config = actionConfig[advice.action];
  const Icon = config.icon;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card className={`glass-card animate-slide-up border-2 ${config.borderColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">AI Recommendation</CardTitle>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            {new Date(advice.timestamp).toLocaleTimeString()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${config.color}`}>
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Recommended Action</p>
            <p className="text-3xl font-bold">{advice.action}</p>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm leading-relaxed text-foreground/90">{advice.reasoning}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {advice.current_price && (
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-4 w-4" />
                <span className="text-xs">Current Price</span>
              </div>
              <p className="mt-1 font-semibold">{formatCurrency(advice.current_price)}</p>
            </div>
          )}
          {advice.target_price && (
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2 text-success">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">Target Price</span>
              </div>
              <p className="mt-1 font-semibold text-success">{formatCurrency(advice.target_price)}</p>
            </div>
          )}
          {advice.stop_loss && (
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2 text-destructive">
                <ShieldAlert className="h-4 w-4" />
                <span className="text-xs">Stop Loss</span>
              </div>
              <p className="mt-1 font-semibold text-destructive">{formatCurrency(advice.stop_loss)}</p>
            </div>
          )}
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs">Risk Level</span>
            </div>
            <p className="mt-1 font-semibold">{advice.risk_level}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Key Headlines</p>
          <ul className="space-y-1">
            {advice.key_headlines.map((headline, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-foreground/80">{headline}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
