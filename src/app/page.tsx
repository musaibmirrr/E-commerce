import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-white blur-[120px] rounded-full rotate-12" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-blue-400 blur-[120px] rounded-full -rotate-12" />
        </div>

        <div className="container relative z-10 px-4 text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Shop Smarter with <span className="text-blue-200">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
            Experience personalized recommendations, instant AI support, and a seamless checkout process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6 rounded-full" asChild>
              <Link href="/products">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6 rounded-full">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose AIStore?</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We combine cutting-edge technology with premium products to give you the best shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-blue-600" />}
            title="AI Powered"
            description="Our AI assistant helps you find exactly what you're looking for in seconds."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-blue-600" />}
            title="Lightning Fast"
            description="Enjoy instant search results and a smooth, responsive interface."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8 text-blue-600" />}
            title="Secure Payments"
            description="Shop with confidence using our world-class encrypted payment systems."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 mx-auto">
        <div className="bg-gray-100 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to start shopping?</h2>
            <p className="text-gray-600">Join thousands of happy customers today.</p>
          </div>
          <Button size="lg" className="px-10 py-6 rounded-full text-lg" asChild>
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 border rounded-2xl hover:shadow-lg transition-shadow bg-white space-y-4">
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
