import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import type { Stock } from "@/types/market";

interface StockSelectorProps {
  stocks: Stock[];
  selectedStock: Stock | null;
  onSelect: (stock: Stock) => void;
}

export function StockSelector({ stocks, selectedStock, onSelect }: StockSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between md:w-[300px]"
        >
          {selectedStock ? (
            <span className="flex items-center gap-2">
              <span className="font-mono font-semibold">{selectedStock.symbol}</span>
              <span className="hidden text-muted-foreground sm:inline">
                {selectedStock.name}
              </span>
            </span>
          ) : (
            "Select a stock..."
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search stocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto p-1">
          {filteredStocks.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No stocks found.
            </p>
          ) : (
            filteredStocks.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => {
                  onSelect(stock);
                  setOpen(false);
                  setSearch("");
                }}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
                  selectedStock?.symbol === stock.symbol ? "bg-accent" : ""
                }`}
              >
                <span className="font-mono font-semibold text-primary">
                  {stock.symbol}
                </span>
                <span className="truncate text-muted-foreground">{stock.name}</span>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
