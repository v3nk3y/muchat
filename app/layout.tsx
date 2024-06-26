import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
// ideally, Stream Video theme should be imported before your own styles
// as this would make it easier for you to override certain video-theme rules

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muchat",
  description:
    "Muchat is a Zoom clone app that can host high-quality video meetings. Experience secure video calls with screen sharing, chat functionality, and more, all within a user-friendly interface built with Next.js, React, TypeScript, Tailwind CSS and Clerk. Developed by v3nk3y - Venkatesh Nagireddy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "icons/muchat-logo1.svg",
            socialButtonsVariant: "iconButton",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#3b82f6",
            colorBackground: "#111827",
            colorInputText: "#fff",
          },
        }}
      >
        <body className={`${inter.className} bg-gray-950`}>
          <link rel="icon" href="/icons/muchat-logo1.svg" />
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
