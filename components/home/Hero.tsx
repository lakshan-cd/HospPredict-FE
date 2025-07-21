"use client"
import * as React from "react";
import { cn } from "@/lib/utils";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Button } from "../ui/button";
import  heroImage  from "@/public/hero-image.jpg";
// If you have a Button component, import it. Otherwise, use a styled button below.
// import { Button } from "@/components/ui/button";

const data = [
  { name: 'Mon', value: 70 },
  { name: 'Tue', value: 132 },
  { name: 'Wed', value: 101 },
  { name: 'Thu', value: 134 },
  { name: 'Fri', value: 90 },
  { name: 'Sat', value: 230 },
  { name: 'Sun', value: 210 },
];
const data2 = [
  { name: 'Mon', value: 52 },
  { name: 'Tue', value: 132 },
  { name: 'Wed', value: 60 },
  { name: 'Thu', value: 180 },
  { name: 'Fri', value: 100 },
  { name: 'Sat', value: 160 },
  { name: 'Sun', value: 100 },
];

const backgroundImage = "url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80')";

const Hero = () => {
  return (
    <section
      className={cn(
        "relative w-full min-h-[420px] flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-lg my-8 bg-primary",
      )}
    >
      {/* Left: Text and Button */}
      <div className="relative z-20 flex flex-col items-start justify-center flex-1 w-full h-full px-8 py-12 text-left text-white md:max-w-xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-primary-foreground drop-shadow-lg">
          Smarter Stock Market Decisions
        </h1>
        <p className="mb-6 text-lg md:text-xl text-secondary-foreground/90 max-w-md">
          Empower your hospitality industry trading with AI-driven insights, real-time analytics, and decision support tools designed for the modern investor.
        </p>
        {/* Use your Button component if available */}
        {/* <Button size="lg" className="bg-primary text-primary-foreground">Learn More</Button> */}
        <Button className="px-6 py-3 rounded-full  font-semibold shadow transition border border-secondary text-secondary hover:bg-secondary hover:text-primary cursor-pointer">
          Learn More
        </Button>
      </div>
      {/* Right: Image and Graph */}
      <div className="relative flex-1 w-full h-[320px] md:h-[420px] flex items-center justify-center">
        {/* Background image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage.src})`, filter: 'brightness(0.7)' }}
        />
        {/* Overlay for darkening */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Graph line (centered, in front of image) */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 z-10 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <Line type="monotone" dataKey="value" stroke="oklch(0.646 0.222 41.116)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 z-10 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data2} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <Line type="monotone" dataKey="value" stroke="oklch(0.6 0.118 184.704)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Hero; 