import { FeatureProvider } from "@/context/feature.context";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://huylien-wedding.vercel.app'),
  title: "Huy & Liên - Thiệp Cưới Online",
  description: "Chào mừng bạn đến với thiệp cưới của Huy và Liên. Sự hiện diện của bạn là niềm hạnh phúc của chúng mình!",

  // 1. Thêm fb:app_id vào đây để hết báo lỗi thiếu tài sản
  other: {
    'fb:app_id': '966242223397117', // Bạn có thể giữ ID mẫu này hoặc thay bằng ID của bạn nếu có
  },

  openGraph: {
    title: "Huy & Liên - Thiệp Cưới Online",
    description: "Chào mừng bạn đến với thiệp cưới của Huy và Liên. Sự hiện diện của bạn là niềm hạnh phúc của chúng mình!",
    url: 'https://huylien-wedding.vercel.app',
    siteName: 'Huy & Liên Wedding',
    images: [
      {
        url: "https://huylien-wedding.vercel.app/1.jpg",
        width: 1200,
        height: 630,
        alt: "Huy & Liên Wedding Card",
      },
    ],
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huy & Liên - Thiệp Cưới Online",
    description: "Chào mừng bạn đến với thiệp cưới của Huy và Liên. Sự hiện diện của bạn là niềm hạnh phúc của chúng mình!",
    images: ["/1.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <FeatureProvider>
          {children}
        </FeatureProvider>
        <ToastContainer />
      </body>
    </html>
  );
}