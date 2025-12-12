import { Shield, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RiskProfile } from "@/types/market";

interface RiskProfileSelectorProps {
  value: RiskProfile;
  onChange: (profile: RiskProfile) => void;
}

const profiles: { value: RiskProfile; label: string; icon: typeof Shield; description: string }[] = [
  {
    value: "conservative",
    label: "Conservative",
    icon: Shield,
    description: "Lower risk, stable returns",
  },
  {
    value: "moderate",
    label: "Moderate",
    icon: Target,
    description: "Balanced risk-reward",
  },
  {
    value: "aggressive",
    label: "Aggressive",
    icon: Flame,
    description: "Higher risk, higher potential",
  },
];

export function RiskProfileSelector({ value, onChange }: RiskProfileSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-muted-foreground">Risk Profile</label>
      <div className="grid grid-cols-3 gap-2">
        {profiles.map((profile) => {
          const Icon = profile.icon;
          const isSelected = value === profile.value;
          
          return (
            <button
              key={profile.value}
              onClick={() => onChange(profile.value)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all",
                isSelected
                  ? "border-primary bg-primary/5 text-primary shadow-sm"
                  : "border-border hover:border-primary/50 hover:bg-accent"
              )}
            >
              <Icon className={cn("h-5 w-5", isSelected ? "text-primary" : "text-muted-foreground")} />
              <span className="text-xs font-medium">{profile.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
