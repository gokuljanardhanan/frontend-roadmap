"use client";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/ui/Header";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/md-editor.css";
import { useEffect } from "react";
// import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("Home component mounted");
    if ("serviceWorker" in navigator) {
      console.log("Service Worker is supported");
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark`}
      >
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
