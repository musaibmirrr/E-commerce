"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/use-cart";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
      return;
    }

    const createCheckoutSession = async () => {
      try {
        const response = await axios.post("/api/checkout", { items });
        window.location.href = response.data.url;
      } catch (error) {
        toast.error("Failed to initiate checkout");
        setIsLoading(false);
      }
    };

    createCheckoutSession();
  }, [items, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <h1 className="text-2xl font-bold">Redirecting to Checkout...</h1>
      <p className="text-muted-foreground">Please wait while we prepare your secure payment.</p>
    </div>
  );
}
