"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // Only render children after component is mounted (client-side)
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Optionally, render a loading spinner or nothing
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}