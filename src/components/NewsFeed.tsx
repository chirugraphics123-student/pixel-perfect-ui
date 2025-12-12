import { ExternalLink, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsArticle } from "@/types/market";

interface NewsFeedProps {
  articles: NewsArticle[];
}

const sentimentVariant: Record<string, "positive" | "negative" | "neutral"> = {
  positive: "positive",
  negative: "negative",
  neutral: "neutral",
};

export function NewsFeed({ articles }: NewsFeedProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Latest News</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {articles.map((article, index) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-primary">
                {article.headline}
              </h3>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={sentimentVariant[article.sentiment]} className="text-xs">
                {article.sentiment}
              </Badge>
              <span className="text-xs text-muted-foreground">{article.source}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatTime(article.timestamp)}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1 flex-1 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary/60"
                  style={{ width: `${article.relevance_score * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {Math.round(article.relevance_score * 100)}% relevant
              </span>
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
