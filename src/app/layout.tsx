import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/ui/Header";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/md-editor.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
