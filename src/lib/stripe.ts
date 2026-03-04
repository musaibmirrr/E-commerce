import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy-key", {
  apiVersion: "2026-02-25.clover" as any,
  typescript: true,
});
