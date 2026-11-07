import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/app/context/PlanContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} scroll-smooth`}>
      <body className="bg-[#0b0d10] text-white antialiased min-h-screen flex flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}