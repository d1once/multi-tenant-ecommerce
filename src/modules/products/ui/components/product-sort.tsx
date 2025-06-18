"use client";

import { Button } from "@/components/ui/button";
import { useProductFilters } from "../../hooks/use-product-filters";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
  const [filter, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filter.sort !== "curated" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "curated" })}
      >
        Curated
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filter.sort !== "trending" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "trending" })}
      >
        Trending
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filter.sort !== "hot_and_new" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "hot_and_new" })}
      >
        Hot & New
      </Button>
    </div>
  );
};
