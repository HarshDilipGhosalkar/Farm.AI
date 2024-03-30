import { Inter } from "next/font/google";
import "./globals.css";
import BottomNavbar from "@/components/navbar";
import LanguageSideBar from "@/components/language";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IPD Project",
  description: "agriculture project",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} pb-[110px]`}>
        {children}
        <LanguageSideBar />
      </body>
    </html>
  );
}
