import { FeatureProvider } from "@/context/feature.context";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://huylien-wedding.vercel.app'),
  title: "Huy & Liên - Thiệp Cưới Online",
  description: "Hành trình yêu thương của chúng mình sẽ bước sang một trang mới. Trân trọng kính mời bạn đến chứng kiến và chia sẻ khoảnh khắc hạnh phúc trong lễ cưới của Huy & Liên!",

  // Sửa fb:app_id bằng thuộc tính 'facebook' có sẵn của Next.js Metadata
  facebook: {
    appId: '100009134251421',
  },

  openGraph: {
    title: "Huy & Liên - Thiệp Cưới Online",
    description: "Hành trình yêu thương của chúng mình sẽ bước sang một trang mới. Trân trọng kính mời bạn đến chứng kiến và chia sẻ khoảnh khắc hạnh phúc trong lễ cưới của Huy & Liên!",
    url: 'https://huylien-wedding.vercel.app',
    siteName: 'Huy & Liên Wedding',
    images: [
      {
        url: "/wedding-invitation.jpg", // Đảm bảo file này có trong thư mục public
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
    images: ["/wedding-invitation.jpg"],
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