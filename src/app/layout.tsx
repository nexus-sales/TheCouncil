import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "The Council - Anti-Complacency Decision Intelligence",
  description:
    "Stress-test decisions, apps, code, ideas, and strategy with five opposing advisor mandates and a Chairman synthesis.",
  keywords: ["decision making", "AI advisors", "strategy", "The Council"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
