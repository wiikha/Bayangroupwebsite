import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Bayan Group",
  description: "Bayan Group is a leading company in the Central Asian region, specializing in various sectors including technology, construction, and manufacturing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
