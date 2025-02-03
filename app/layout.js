import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/NavBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Yaya AI",
  description:
    "Genera recetas de cocina con ingredientes disponible a la mano con AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-y-scroll scrollbar-thin">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased `}
      >
        <header className=" bg-cyan-700 flex justify-between items-center p-4">
          <NavBar />
        </header>

        {children}
      </body>
    </html>
  );
}
