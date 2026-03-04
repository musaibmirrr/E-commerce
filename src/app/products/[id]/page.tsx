"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const cart = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container px-4 py-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20">Product not found</div>;

  const onAddToCart = () => {
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
    <div className="container px-4 py-12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-50 border">
            <Image
              src={product.images[0] || "https://placehold.co/800x800?text=Product"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-2">
            <Badge variant="secondary" className="px-3 py-1">
              {product.category.name}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-muted-foreground">(4.8 / 5.0 - 124 reviews)</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-primary">
            ${Number(product.price).toFixed(2)}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button onClick={onAddToCart} size="lg" className="flex-1 gap-3 h-14 text-lg rounded-full">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1 h-14 text-lg rounded-full">
              Add to Wishlist
            </Button>
          </div>

          {/* Features/Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t">
            <div className="flex items-center gap-3 text-sm font-medium">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>2-Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
