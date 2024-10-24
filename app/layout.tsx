import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProviders from "@/providers/query-provider";
import SheetProvider from "@/providers/sheet-provider";
import { Toaster } from "sonner";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bloger_Crud",
  description: "Crud App for an intermship exercise`",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl='/sign-in'>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProviders>
          <SheetProvider/>
          <Toaster/>
        {children}
        </QueryProviders>
      </body>
    </html>
    </ClerkProvider>
  );
}
