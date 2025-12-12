import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { StockSelector } from "@/components/StockSelector";
import { RiskProfileSelector } from "@/components/RiskProfileSelector";
import { StockPriceCard } from "@/components/StockPriceCard";
import { InvestmentAdviceCard } from "@/components/InvestmentAdviceCard";
import { MarketImpactCard } from "@/components/MarketImpactCard";
import { NewsFeed } from "@/components/NewsFeed";
import { TopMovers } from "@/components/TopMovers";
import { LoadingState, LoadingSkeleton } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import type { Stock, RiskProfile } from "@/types/market";

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [riskProfile, setRiskProfile] = useState<RiskProfile>("moderate");

  // Fetch available stocks
  const { data: stocksData, isLoading: stocksLoading } = useQuery({
    queryKey: ["stocks"],
    queryFn: api.getStocks,
  });

  // Fetch dashboard data
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: api.getDashboard,
    refetchInterval: 60000, // Refresh every minute
  });

  // Fetch stock price
  const { data: priceData, isLoading: priceLoading } = useQuery({
    queryKey: ["stockPrice", selectedStock?.symbol],
    queryFn: () => api.getStockPrice(selectedStock!.symbol),
    enabled: !!selectedStock,
  });

  // Fetch analysis
  const { 
    data: analysisData, 
    isLoading: analysisLoading,
    refetch: refetchAnalysis 
  } = useQuery({
    queryKey: ["analysis", selectedStock?.symbol, riskProfile],
    queryFn: () => api.analyzeStock(selectedStock!.symbol, riskProfile),
    enabled: !!selectedStock,
  });

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const handleMoverSelect = (symbol: string) => {
    const stock = stocksData?.stocks.find(s => s.symbol === symbol);
    if (stock) {
      setSelectedStock(stock);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-6 md:px-6">
        {/* Controls Section */}
        <section className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Select Stock</label>
                {stocksLoading ? (
                  <div className="h-10 w-[300px] animate-pulse rounded-lg bg-muted" />
                ) : (
                  <StockSelector
                    stocks={stocksData?.stocks || []}
                    selectedStock={selectedStock}
                    onSelect={handleStockSelect}
                  />
                )}
              </div>
              <RiskProfileSelector value={riskProfile} onChange={setRiskProfile} />
            </div>
            {selectedStock && (
              <Button
                onClick={() => refetchAnalysis()}
                disabled={analysisLoading}
                className="gap-2"
              >
                <Zap className="h-4 w-4" />
                Analyze Now
              </Button>
            )}
          </div>
        </section>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Analysis */}
          <div className="space-y-6 lg:col-span-2">
            {!selectedStock ? (
              <EmptyState />
            ) : priceLoading || analysisLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {/* Price and Advice Row */}
                <div className="grid gap-6 md:grid-cols-2">
                  {priceData && <StockPriceCard data={priceData} />}
                  {analysisData?.advice && (
                    <InvestmentAdviceCard advice={analysisData.advice} />
                  )}
                </div>

                {/* Impact and News Row */}
                <div className="grid gap-6 md:grid-cols-2">
                  {analysisData?.impact_scores[0] && (
                    <MarketImpactCard impact={analysisData.impact_scores[0]} />
                  )}
                  {analysisData?.articles && (
                    <NewsFeed articles={analysisData.articles} />
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Column - Dashboard */}
          <div className="space-y-6">
            {dashboardLoading ? (
              <LoadingState message="Loading market data..." />
            ) : dashboardData?.top_movers ? (
              <TopMovers 
                movers={dashboardData.top_movers} 
                onSelect={handleMoverSelect}
              />
            ) : null}

            {/* Market Status */}
            {dashboardData && (
              <div className="flex items-center justify-center gap-2 rounded-lg border bg-card p-4">
                <div className={`h-2 w-2 rounded-full ${
                  dashboardData.market_status === "open" 
                    ? "bg-success animate-pulse-subtle" 
                    : "bg-muted-foreground"
                }`} />
                <span className="text-sm font-medium">
                  Market {dashboardData.market_status === "open" ? "Open" : "Closed"}
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground md:px-6">
          <p>MarketPulse AI — AI-powered financial analysis for NIFTY 50 stocks.</p>
          <p className="mt-1 text-xs">
            Demo mode: Using simulated data. Connect to a backend for real-time analysis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
