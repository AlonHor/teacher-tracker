import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

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
const alefBold = localFont({
  src: "./fonts/Alef-Bold.ttf",
  variable: "--font-alef-bold",
  weight: "700",
});
const alefRegular = localFont({
  src: "./fonts/Alef-Regular.ttf",
  variable: "--font-alef-regular",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Teacher Tracker",
  description: "Find a teacher.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${alefRegular.variable} ${alefBold.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
