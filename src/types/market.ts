export type RiskProfile = "conservative" | "moderate" | "aggressive";

export type SentimentType = "positive" | "negative" | "neutral";

export interface Stock {
  symbol: string;
  name: string;
}

export interface StockPriceData {
  symbol: string;
  current_price: number;
  previous_close: number;
  change: number;
  change_percent: number;
  volume: number;
  high_52week: number;
  low_52week: number;
  market_cap?: number;
  company_name: string;
}

export interface NewsArticle {
  id: string;
  headline: string;
  source: string;
  url: string;
  timestamp: string;
  companies: string[];
  sentiment: SentimentType;
  relevance_score: number;
}

export interface MarketImpactScore {
  stock_symbol: string;
  company_name: string;
  impact_score: number;
  probability_up: number;
  probability_down: number;
  predicted_change_range: string;
  timeframe: string;
  confidence: number;
}

export interface InvestmentAdvice {
  stock_symbol: string;
  action: "BUY" | "SELL" | "HOLD" | "WATCH";
  reasoning: string;
  key_headlines: string[];
  risk_level: string;
  stop_loss?: number;
  target_price?: number;
  current_price?: number;
  timestamp: string;
}

export interface NewsAnalysisResponse {
  articles: NewsArticle[];
  impact_scores: MarketImpactScore[];
  advice: InvestmentAdvice;
}

export interface DashboardData {
  user_id: string;
  timestamp: string;
  top_movers: TopMover[];
  market_status: "open" | "closed";
  using_real_data: boolean;
}

export interface TopMover {
  symbol: string;
  name: string;
  current_price: number | null;
  change_percent: number | null;
  impact_score: number;
  probability_up: number;
  trend: "up" | "down";
}

export interface StocksResponse {
  stocks: Stock[];
  total: number;
  index: string;
}
