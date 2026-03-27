import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Liquid Pool | Soroban Optimizer",
  description: "Maximize your yield on Stellar with our automated liquidity pool optimizer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${outfit.variable} font-outfit antialiased bg-[#050608] text-gray-100 min-h-screen selection:bg-blue-500/30 selection:text-blue-200`}>
        <Providers>
          <div className="relative overflow-hidden min-h-screen">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,_#1a1d23_0%,_transparent_50%)] op-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] -z-10 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[30vw] h-[30vw] -z-10 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
            
            <header className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Liquid Pool</span>
                </div>

                <div className="hidden sm:flex items-center gap-8">
                  <nav className="flex items-center gap-6 text-sm font-medium text-gray-400">
                    <a href="#" className="hover:text-blue-400 transition-colors">Dashboard</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Strategies</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Governance</a>
                  </nav>
                  
                  <div id="wallet-button-container">
                    {/* Connect Wallet button will go here */}
                  </div>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
