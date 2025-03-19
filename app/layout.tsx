import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MergenBot",
  description: "Stocks Screening App",
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
