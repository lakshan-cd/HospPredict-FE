"use client";
import SnackbarProvider from "@/components/snackbar";
import { ThemeProvider } from "../providers/theme-provider";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SnackbarProvider>
                <div className="px-4 sm:px-4 md:px-8 lg:px-16">
                    {children}
                </div>
            </SnackbarProvider>
        </ThemeProvider>
        </>
    );
}