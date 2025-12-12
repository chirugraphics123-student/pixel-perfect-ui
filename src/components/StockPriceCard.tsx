import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StockPriceData } from "@/types/market";

interface StockPriceCardProps {
  data: StockPriceData;
}

export function StockPriceCard({ data }: StockPriceCardProps) {
  const isPositive = data.change >= 0;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatLargeNumber = (value: number) => {
    if (value >= 10000000000000) return `₹${(value / 10000000000000).toFixed(2)}L Cr`;
    if (value >= 1000000000000) return `₹${(value / 1000000000000).toFixed(2)} Cr`;
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    return formatCurrency(value);
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{data.company_name}</p>
            <CardTitle className="text-2xl font-bold">{data.symbol}</CardTitle>
          </div>
          <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium ${
            isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          }`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {isPositive ? "+" : ""}{data.change_percent.toFixed(2)}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{formatCurrency(data.current_price)}</span>
          <span className={`text-sm font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
            {isPositive ? "+" : ""}{formatCurrency(data.change)}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Previous Close</p>
            <p className="font-medium">{formatCurrency(data.previous_close)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Volume</p>
            <p className="font-medium">{data.volume.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">52W High</p>
            <p className="font-medium text-success">{formatCurrency(data.high_52week)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">52W Low</p>
            <p className="font-medium text-destructive">{formatCurrency(data.low_52week)}</p>
          </div>
        </div>
        
        {data.market_cap && (
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Market Cap</p>
              <p className="font-semibold">{formatLargeNumber(data.market_cap)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
