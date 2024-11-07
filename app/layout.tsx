import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { CartProvider } from "@/contexts/CartContext";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const pretendard = localFont({
  src: "../styles/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <CartProvider>
        <html lang="en" className={`${pretendard.variable}`}>
          <body className="bg-background font-pretendard">
              <ModalProvider>
                <div className="h-[100vh]">{children}</div>
              </ModalProvider>
          </body>
        </html>
      </CartProvider>
    </UserProvider>
  );
}
