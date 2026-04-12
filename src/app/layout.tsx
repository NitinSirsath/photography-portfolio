import type { Metadata } from "next";
import { PlatformNavbar } from "@/components/layout/PlatformNavbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import "@/index.css";

export const metadata: Metadata = {
  title: "Photography Portfolio",
  description: "Monokai themed photography portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 font-sans" suppressHydrationWarning>
        <PlatformNavbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
