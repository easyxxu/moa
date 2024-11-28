import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { CartProvider } from "@/contexts/CartContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { DirectOrderProvider } from "@/contexts/DirectOrderContext";

export const defaultUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SITE_URL || `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "MoA",
  description: "귀여운 것들을 모두 모아! 모아에서 귀여운 제품들을 만나보세요!",
  openGraph: {},
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
      <DirectOrderProvider>
        <CartProvider>
          <html lang="en" className={`${pretendard.variable}`}>
            <body className="bg-background font-pretendard">
              <ToastProvider>
                <ModalProvider>
                  <div className="h-[100vh]">{children}</div>
                </ModalProvider>
              </ToastProvider>
            </body>
          </html>
        </CartProvider>
      </DirectOrderProvider>
    </UserProvider>
  );
}
