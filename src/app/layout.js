
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppProviders } from "./providers";
import AppLayout from "./app-layout";
import RouteTransitionLoader from "./RouteTransitionLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});





const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 export const metadata = {
  title: "OrthoSquare",
  description: "Healthcare Management System",
  icons: {
    icon: [
      { url: "/orthosquare-logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/orthosquare-logo.png", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
           <AppProviders>
           <AppLayout>
                    <RouteTransitionLoader />

        {children}
        <Toaster position="top-center" richColors />
        </AppLayout>
        <ReactQueryDevtools initialIsOpen={false} />
     </AppProviders>

      </body>
    </html>
  );
}
