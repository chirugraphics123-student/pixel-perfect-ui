import { Activity, TrendingUp, TrendingDown, Clock, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { MarketImpactScore } from "@/types/market";

interface MarketImpactCardProps {
  impact: MarketImpactScore;
}

export function MarketImpactCard({ impact }: MarketImpactCardProps) {
  const probUpPercent = Math.round(impact.probability_up * 100);
  const probDownPercent = Math.round(impact.probability_down * 100);
  const confidencePercent = Math.round(impact.confidence * 100);

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-primary" />
          Market Impact Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
          <div>
            <p className="text-sm text-muted-foreground">Impact Score</p>
            <p className="text-3xl font-bold">{impact.impact_score.toFixed(1)}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Gauge className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-success">
                <TrendingUp className="h-4 w-4" />
                Probability Up
              </span>
              <span className="font-semibold">{probUpPercent}%</span>
            </div>
            <Progress value={probUpPercent} className="h-2 bg-muted [&>div]:bg-success" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-destructive">
                <TrendingDown className="h-4 w-4" />
                Probability Down
              </span>
              <span className="font-semibold">{probDownPercent}%</span>
            </div>
            <Progress value={probDownPercent} className="h-2 bg-muted [&>div]:bg-destructive" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border bg-card p-3">
            <p className="text-xs text-muted-foreground">Predicted Range</p>
            <p className="mt-1 font-mono font-semibold">{impact.predicted_change_range}</p>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Timeframe</p>
            </div>
            <p className="mt-1 font-semibold">{impact.timeframe}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Confidence Level</span>
            <span className="font-semibold">{confidencePercent}%</span>
          </div>
          <Progress value={confidencePercent} className="h-2 bg-muted [&>div]:bg-info" />
        </div>
      </CardContent>
    </Card>
  );
}
