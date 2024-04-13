import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider>
          <div className="sticky top-0 z-50 bg-black lg:container px-0 lg:px-0">
            <Header />
          </div>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
