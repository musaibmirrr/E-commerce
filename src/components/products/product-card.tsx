"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product & { category: { name: string } };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const cart = useCart();

  const onAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cart.addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.images[0] || "/placeholder.png",
      quantity: 1,
    });
    toast.success("Added to cart");
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0] || "https://placehold.co/600x600?text=Product"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category.name}
          </p>
          <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-xl font-bold text-primary mt-2">
            ${Number(product.price).toFixed(2)}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={onAddToCart}
            className="w-full gap-2 rounded-full"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
