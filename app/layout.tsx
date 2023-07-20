import "./globals.css";

import { Navbar, Footer } from "@/components";

export const metadata = {
  title: "Flexibble",
  description: "Shoeccase and discover remarcable developer proyectjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
