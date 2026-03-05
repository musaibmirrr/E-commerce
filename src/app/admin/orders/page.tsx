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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container px-4 py-12 mx-auto space-y-10">
      <div className="space-y-1">
        <Link href="/admin" className="text-sm flex items-center text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold font-heading tracking-tight">Orders Management</h1>
        <p className="text-muted-foreground">Manage and view all customer orders</p>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-48 text-muted-foreground">
                  Loading orders...
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-48 text-muted-foreground text-lg">
                  No orders placed yet.
                </TableCell>
              </TableRow>
            ) : orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs uppercase text-muted-foreground">{order.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{order.user?.name || 'Anonymous'}</span>
                    <span className="text-xs text-muted-foreground">{order.user?.email}</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">${Number(order.totalAmount).toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={order.status === "PAID" ? "default" : "secondary"}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.orderItems?.length || 0} items</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
