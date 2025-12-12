import { Search, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card className="glass-card">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="relative mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <TrendingUp className="h-10 w-10 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <h3 className="mb-2 text-lg font-semibold">Select a Stock to Analyze</h3>
        <p className="max-w-sm text-center text-sm text-muted-foreground">
          Choose a stock from the dropdown above to get AI-powered insights, news analysis, and investment recommendations.
        </p>
      </CardContent>
    </Card>
  );
}
