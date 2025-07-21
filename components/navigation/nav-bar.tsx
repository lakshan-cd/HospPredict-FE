"use client"

import * as React from "react";
import { Sun, Moon, Bell, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const [activeTab, setActiveTab] = React.useState("Home");

  // Dummy user data
  const user = {
    name: "Allen Thomson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with your avatar
    badge: "Free",
  };

  return (
    <div className="flex justify-center ">
      <nav className="
        w-[90%]
        flex items-center justify-between
        px-6 py-2
        border border-primary/20
        rounded-full mt-4
        bg-primary/5
      ">      
      {/* Left: Logo + Search + Menu */}
      <div className="flex items-center gap-4">
        {/* Logo/Icon */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-background/60 border border-border">
          {/* Placeholder for logo icon */}
          <span className="text-xl">⚙️</span>
        </div>
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search here ..."
            className="pl-10 pr-4 py-2 rounded-full bg-background/60 text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 w-48 md:w-64"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-2-2"/></svg>
          </span>
        </div>
        {/* Menu Items */}
        <ul className="flex items-center gap-2 ml-2">
          <Link href="/" onClick={() => setActiveTab("Home")}><NavItem active={activeTab === "Home"}>Home</NavItem></Link>
          <Link href="/financials" onClick={() => setActiveTab("Financials")}><NavItem active={activeTab === "Financials"}>Financials</NavItem></Link>
          <Link href="/economics" onClick={() => setActiveTab("Economics")}><NavItem active={activeTab === "Economics"}>Economics</NavItem></Link>
          <Link href="/news" onClick={() => setActiveTab("News")}><NavItem active={activeTab === "News"}>News</NavItem></Link>
        </ul>
      </div>
      {/* Right: Theme toggle, notifications, profile */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        {mounted && (
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background/60 text-foreground hover:bg-primary/20 transition cursor-pointer"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        )}
        {/* Notification Bell */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background/60 text-foreground hover:bg-primary/20 transition relative cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        {/* Notifications label */}
        <span className="text-sm text-muted-foreground">10+<span className="hidden md:inline"> notification</span></span>
        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-primary object-cover cursor-pointer"
          />
          <div className="flex flex-col items-start">
            <span className="text-sm text-secondary-foreground font-medium leading-tight">{user.name}</span>
            <span className="text-xs text-secondary-foreground/70 bg-primary/20 px-2 py-0.5 rounded-full mt-0.5">{user.badge}</span>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
}

function NavItem({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <li>
      <button
        className={`px-4 py-2 rounded-full transition-colors duration-200 text-sm font-medium border cursor-pointer
          ${active
            ? "bg-primary text-primary-foreground shadow border-primary"
            : "text-primary hover:bg-primary/10 hover:text-primary-foreground border-transparent"
          }
        `}
      >
        {children}
      </button>
    </li>
  );
}
