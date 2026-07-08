import type { Metadata } from "next";
import { Mona_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const MonaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "HireSense",
  description: "An AI-Powered platform for preparing Mock Interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <html
      lang="en"
      className={cn("h-full", "antialiased", "dark", "pattern", MonaSans.className, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Toaster />
      </body>
    </html>
  );
}
