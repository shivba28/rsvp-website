import { Geist, Geist_Mono, Delius, Lavishly_Yours } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Lavishly = Lavishly_Yours({
  subsets: ["latin"],
  weight:"400"
});

const Deliu = Delius({
  subsets: ["latin"],
  weight:"400"
});

export const metadata = {
  title: "RSVP",
  description: "60th Birthday Party",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
