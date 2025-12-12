import type {
  StocksResponse,
  StockPriceData,
  NewsAnalysisResponse,
  DashboardData,
  RiskProfile,
  NewsArticle,
  MarketImpactScore,
} from "@/types/market";

// Backend API URL - update this to match your backend server
const BASE_URL = "https://marketpullse-ai-15.onrender.com";

// Mock data for demonstration
const MOCK_STOCKS = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd" },
  { symbol: "TCS", name: "Tata Consultancy Services" },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd" },
  { symbol: "INFY", name: "Infosys Ltd" },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd" },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd" },
  { symbol: "ITC", name: "ITC Ltd" },
  { symbol: "SBIN", name: "State Bank of India" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank" },
];

const generateMockPrice = (symbol: string): StockPriceData => {
  const basePrice = Math.random() * 3000 + 500;
  const change = (Math.random() - 0.5) * 100;
  const changePercent = (change / basePrice) * 100;
  
  return {
    symbol,
    current_price: Math.round(basePrice * 100) / 100,
    previous_close: Math.round((basePrice - change) * 100) / 100,
    change: Math.round(change * 100) / 100,
    change_percent: Math.round(changePercent * 100) / 100,
    volume: Math.floor(Math.random() * 10000000),
    high_52week: Math.round((basePrice * 1.3) * 100) / 100,
    low_52week: Math.round((basePrice * 0.7) * 100) / 100,
    market_cap: Math.floor(Math.random() * 10000000000000),
    company_name: MOCK_STOCKS.find(s => s.symbol === symbol)?.name || symbol,
  };
};

const generateMockNews = (symbol: string): NewsArticle[] => {
  const sentiments: Array<"positive" | "negative" | "neutral"> = ["positive", "negative", "neutral"];
  const headlines = [
    `${symbol} announces record quarterly profits, beats analyst estimates`,
    `${symbol} faces regulatory scrutiny over market practices`,
    `${symbol} plans major expansion into renewable energy sector`,
    `${symbol} reports decline in profit margins amid rising costs`,
    `${symbol} launches innovative product line targeting millennials`,
  ];
  
  return headlines.map((headline, i) => ({
    id: `${symbol}-${i}`,
    headline,
    source: ["Economic Times", "Moneycontrol", "Bloomberg", "Reuters", "LiveMint"][i % 5],
    url: `https://example.com/news/${symbol}/${i}`,
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 2).toISOString(),
    companies: [symbol],
    sentiment: sentiments[i % 3],
    relevance_score: Math.round((0.6 + Math.random() * 0.4) * 100) / 100,
  }));
};

const generateMockImpact = (symbol: string): MarketImpactScore => {
  const probUp = Math.random();
  return {
    stock_symbol: symbol,
    company_name: MOCK_STOCKS.find(s => s.symbol === symbol)?.name || symbol,
    impact_score: Math.round(Math.random() * 100 * 100) / 100,
    probability_up: Math.round(probUp * 100) / 100,
    probability_down: Math.round((1 - probUp) * 100) / 100,
    predicted_change_range: `${Math.round(probUp * 3 * 10) / 10}-${Math.round(probUp * 7 * 10) / 10}%`,
    timeframe: "48 hours",
    confidence: Math.round((0.6 + Math.random() * 0.35) * 100) / 100,
  };
};

export const api = {
  async getStocks(): Promise<StocksResponse> {
    // Mock response
    return {
      stocks: MOCK_STOCKS,
      total: MOCK_STOCKS.length,
      index: "NIFTY 50",
    };
  },

  async getStockPrice(symbol: string): Promise<StockPriceData> {
    // Mock response
    return generateMockPrice(symbol);
  },

  async analyzeStock(symbol: string, riskProfile: RiskProfile = "moderate"): Promise<NewsAnalysisResponse> {
    const articles = generateMockNews(symbol);
    const impact = generateMockImpact(symbol);
    const price = generateMockPrice(symbol);
    
    const actions: Array<"BUY" | "SELL" | "HOLD" | "WATCH"> = ["BUY", "SELL", "HOLD", "WATCH"];
    const action = impact.probability_up > 0.7 ? "BUY" : 
                   impact.probability_up > 0.6 ? (riskProfile === "conservative" ? "WATCH" : "BUY") :
                   impact.probability_down > 0.7 ? "SELL" : "HOLD";
    
    return {
      articles,
      impact_scores: [impact],
      advice: {
        stock_symbol: symbol,
        action,
        reasoning: `Based on sentiment analysis with ${Math.round(impact.probability_up * 100)}% probability of upward movement. ${action === "BUY" ? "Favorable market conditions detected." : action === "SELL" ? "Consider reducing exposure." : "Monitor closely."}`,
        key_headlines: articles.slice(0, 3).map(a => a.headline),
        risk_level: riskProfile === "conservative" ? "Low" : riskProfile === "moderate" ? "Medium" : "High",
        stop_loss: action === "BUY" ? Math.round(price.current_price * 0.95 * 100) / 100 : undefined,
        target_price: action === "BUY" ? Math.round(price.current_price * 1.1 * 100) / 100 : price.current_price,
        current_price: price.current_price,
        timestamp: new Date().toISOString(),
      },
    };
  },

  async getDashboard(): Promise<DashboardData> {
    const topMovers = MOCK_STOCKS.slice(0, 5).map(stock => {
      const price = generateMockPrice(stock.symbol);
      const impact = generateMockImpact(stock.symbol);
      return {
        symbol: stock.symbol,
        name: stock.name,
        current_price: price.current_price,
        change_percent: price.change_percent,
        impact_score: impact.impact_score,
        probability_up: impact.probability_up,
        trend: impact.probability_up > 0.5 ? "up" as const : "down" as const,
      };
    }).sort((a, b) => b.impact_score - a.impact_score);

    return {
      user_id: "default_user",
      timestamp: new Date().toISOString(),
      top_movers: topMovers,
      market_status: new Date().getHours() < 15 ? "open" : "closed",
      using_real_data: false,
    };
  },

  async getStockNews(symbol: string): Promise<{ articles: NewsArticle[]; company_name: string }> {
    return {
      articles: generateMockNews(symbol),
      company_name: MOCK_STOCKS.find(s => s.symbol === symbol)?.name || symbol,
    };
  },

  async getImpactScore(symbol: string): Promise<MarketImpactScore> {
    return generateMockImpact(symbol);
  },
};
