import "./globals.css";
import { Inter } from "next/font/google";

import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lens Next 13 with Lens SDK",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={cn(inter.className, "bg-background  text-foreground")}>
          <Navigation />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
