import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModelProvider } from "@/components/ModelProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "S-Gen",
  description: "Shumon AI Content Generator Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModelProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
