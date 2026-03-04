"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/store/use-cart";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container px-4 py-24 mx-auto text-center space-y-8">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full text-green-600 mb-4">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-bold italic text-green-700">Thank You for Your Purchase!</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Your order has been placed successfully. We'll send you an email confirmation with your order details and tracking information soon.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Button asChild size="lg" className="rounded-full px-8 gap-2">
          <Link href="/profile">
            <ShoppingBag className="w-5 h-5" /> View Orders
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-8 gap-2">
          <Link href="/products">
            Continue Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
