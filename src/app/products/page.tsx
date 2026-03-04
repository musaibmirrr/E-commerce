import { Suspense } from "react";
import ProductList from "./content/product-list";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    }>
      <ProductList />
    </Suspense>
  );
}
