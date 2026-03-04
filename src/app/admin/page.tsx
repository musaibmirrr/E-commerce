"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, LayoutDashboard, ShoppingCart, Users, Package } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, orders] = await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/orders")
        ]);

        const totalRevenue = orders.data.reduce((acc: number, order: any) =>
          order.status === "PAID" ? acc + Number(order.totalAmount) : acc, 0);

        setStats({
          products: products.data.length,
          orders: orders.data.length,
          users: 0, // Mock for now
          revenue: totalRevenue
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container px-4 py-12 mx-auto space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.revenue.toFixed(2)}`}
          icon={<LayoutDashboard className="w-6 h-6 text-blue-600" />}
        />
        <StatsCard
          title="Orders"
          value={stats.orders.toString()}
          icon={<ShoppingCart className="w-6 h-6 text-green-600" />}
        />
        <StatsCard
          title="Products"
          value={stats.products.toString()}
          icon={<Package className="w-6 h-6 text-purple-600" />}
        />
        <StatsCard
          title="Customers"
          value="-- "
          icon={<Users className="w-6 h-6 text-orange-600" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="outline" asChild>
              <Link href="/admin/products">Manage Products</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/orders">View Orders</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/categories">Manage Categories</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
